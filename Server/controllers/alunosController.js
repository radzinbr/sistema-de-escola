const db = require('../database/db');

const alunosController =
    require('../controllers/alunosController');

// LISTAR ALUNOS
exports.listarAlunos = (req, res) => {

    const sql = `
    SELECT 
        alunos.id,
        alunos.ra,
        alunos.nome,
        alunos.data_nascimento,
        turmas.id AS turma_id,

        CONCAT(
            turmas.nome,
            ' - ',
            turmas.ano
        ) AS turma

    FROM matriculas

    JOIN alunos
        ON matriculas.aluno_id = alunos.id

    JOIN turmas
        ON matriculas.turma_id = turmas.id

    WHERE alunos.ativo = TRUE
`;

    db.query(sql, (err, results) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                erro: 'Erro ao buscar alunos'
            });
        }

        res.json(results);
    });
};



// BUSCAR ALUNOS POR TURMA
exports.buscarPorTurma = (req, res) => {

    const turmaId = req.params.turmaId;

    const sql = `
        SELECT 
            alunos.id,
            alunos.ra,
            alunos.nome,
            alunos.data_nascimento,

            CONCAT(
                turmas.nome,
                ' - ',
                turmas.ano
            ) AS turma

        FROM matriculas

        JOIN alunos
            ON matriculas.aluno_id = alunos.id

        JOIN turmas
            ON matriculas.turma_id = turmas.id

        WHERE turmas.id = ?
    `;

    db.query(sql, [turmaId], (err, results) => {

        if (err) {

            return res.status(500).json({
                erro: 'Erro ao buscar turma'
            });
        }

        res.json(results);
    });
};



exports.cadastrarAluno = (req, res) => {

    const {
        ra,
        nome,
        data_nascimento,
        turma_id
    } = req.body;

    // ======================
    // VALIDA CAMPOS
    // ======================

    if (
        !ra ||
        !nome ||
        !data_nascimento ||
        !turma_id
    ) {

        return res.status(400).json({
            erro:
                'Preencha todos os campos'
        });
    }

    // ======================
    // VERIFICA RA
    // ======================

    const sqlVerificaRA = `
        SELECT id
        FROM alunos
        WHERE ra = ?
    `;

    db.query(
        sqlVerificaRA,
        [ra],
        (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    erro:
                        'Erro ao validar RA'
                });
            }

            // RA já existe
            if (results.length > 0) {

                return res.status(400).json({
                    erro:
                        'RA já cadastrado'
                });
            }

            // ======================
            // CADASTRA ALUNO
            // ======================

            const sqlAluno = `
                INSERT INTO alunos
                (
                    ra,
                    nome,
                    data_nascimento
                )
                VALUES (?, ?, ?)
            `;

            db.query(
                sqlAluno,
                [
                    ra,
                    nome,
                    data_nascimento
                ],
                (err, result) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json({
                            erro:
                                'Erro ao cadastrar aluno'
                        });
                    }

                    const alunoId =
                        result.insertId;

                    // ======================
                    // MATRÍCULA
                    // ======================

                    const sqlMatricula = `
                        INSERT INTO matriculas
                        (
                            aluno_id,
                            turma_id
                        )
                        VALUES (?, ?)
                    `;

                    db.query(
                        sqlMatricula,
                        [
                            alunoId,
                            turma_id
                        ],
                        (err) => {

                            if (err) {

                                console.log(err);

                                return res.status(500).json({
                                    erro:
                                        'Erro ao criar matrícula'
                                });
                            }

                            res.status(201).json({
                                mensagem:
                                    'Aluno cadastrado com sucesso'
                            });
                        }
                    );
                }
            );
        }
    );
};
// ATUALIZAR ALUNO
exports.atualizarAluno = (req, res) => {

    const alunoId = req.params.id;

    const {
        ra,
        nome,
        data_nascimento,
        turma_id
    } = req.body;

    // ======================
    // ATUALIZA ALUNO
    // ======================

    const sqlAluno = `
        UPDATE alunos
        SET
            ra = ?,
            nome = ?,
            data_nascimento = ?
        WHERE id = ?
    `;

    db.query(
        sqlAluno,
        [
            ra,
            nome,
            data_nascimento,
            alunoId
        ],
        (err) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    erro:
                        'Erro ao atualizar aluno'
                });
            }

            // ======================
            // ATUALIZA MATRÍCULA
            // ======================

            const sqlMatricula = `
                UPDATE matriculas
                SET turma_id = ?
                WHERE aluno_id = ?
            `;

            db.query(
                sqlMatricula,
                [
                    turma_id,
                    alunoId
                ],
                (err) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json({
                            erro:
                                'Erro ao atualizar turma'
                        });
                    }

                    res.json({
                        mensagem:
                            'Aluno atualizado com sucesso'
                    });

                }
            );
        }
    );
};


exports.arquivarAluno = (req, res) => {

    const alunoId = req.params.id;

    const sql = `
        UPDATE alunos
        SET ativo = FALSE
        WHERE id = ?
    `;

    db.query(
        sql,
        [alunoId],
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    erro:
                        'Erro ao arquivar aluno'
                });
            }

            res.json({
                mensagem:
                    'Aluno Removido com sucesso'
            });

        }
    );
};
