<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const db = require('../database/db');


//get - aluno por turma
router.get('/turma/:turmaId', (req, res) => {
    const turmaId = req.params.turmaId;
    const sql = `
    SELECT
        alunos.id,
        alunos.ra,
        alunos.nome,
        alunos.data_nascimento,
        turmas.nome AS turma

    FROM matriculas

    JOIN alunos
        ON matriculas.aluno_id = alunos.id

    JOIN turmas
        ON matriculas.turma_id = turmas.id

    WHERE turmas.id = ?
`;
    db.query(sql, [turmaId], (err, result) => {
        if (err) {
            console.error('Erro ao buscar alunos por turma: ', err);
            return res.status(500).json({
                erro: 'Erro ao buscar alunos por turma'
            });
        }
        res.json(result);
    });
});

//Get listar todos os alunos
router.get('/', (req, res) => {
    const sql = `
        SELECT 
            alunos.id,
            alunos.ra,
            alunos.nome,
            alunos.data_nascimento
        FROM alunos
    `;

    db.query(sql,(err,result) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                erro: 'Erro ao buscar alunos'
            });
        }
        res.json(result);
    });


});


// POST - criar um novo aluno
router.post('/', (req,res) => {
    const {ra,nome,data_nascimento} = req.body;
     
    //validaçao dos dados
    if(!ra || !nome || !data_nascimento){
        return res.status(400).json({
            erro: 'RA, nome e data de nascimento são obrigatórios'
        });
    }

     const sql = `
        INSERT INTO alunos (ra, nome, data_nascimento)
        VALUES (?, ?, ?)
    `;

      db.query(
        sql,
        [ra, nome, data_nascimento],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    erro: 'Erro ao cadastrar aluno'
                });
            }

            res.status(201).json({
                mensagem: 'Aluno cadastrado com sucesso',
                alunoId: result.insertId
            });

        }
    );

});

//put - atualizar um aluno 
router.put('/:id',(req,res) =>{
    const alunoId = req.params.id;
    const {ra, nome, data_nascimento} = req.body;

    //validaçao dos dados
    if(!ra || !nome || !data_nascimento){
        return res.status(400).json({
            erro: 'RA, nome e data de nascimento são obrigatórios'
        });
        
    }

const sql = `
        UPDATE alunos
        SET
            ra = ?,
            nome = ?,
            data_nascimento = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [ra, nome, data_nascimento, alunoId],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    erro: 'Erro ao atualizar aluno'
                });
            }

            // nenhum aluno encontrado
            if (result.affectedRows === 0) {

                return res.status(404).json({
                    erro: 'Aluno não encontrado'
                });
            }

            res.json({
                mensagem: 'Aluno atualizado com sucesso'
            });

        }
    );

});
// DELETE - remover aluno
router.delete('/:id', (req, res) => {

    const alunoId = req.params.id;

    // remover dependências primeiro
    const deleteMatriculas = `
        DELETE FROM matriculas
        WHERE aluno_id = ?
    `;

    const deleteNotas = `
        DELETE FROM notas
        WHERE aluno_id = ?
    `;

    const deletePresencas = `
        DELETE FROM presencas
        WHERE aluno_id = ?
    `;

    const deleteAluno = `
        DELETE FROM alunos
        WHERE id = ?
    `;

    // remover matrículas
    db.query(deleteMatriculas, [alunoId], (err) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                erro: 'Erro ao remover matrículas'
            });
        }

        // remover notas
        db.query(deleteNotas, [alunoId], (err) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    erro: 'Erro ao remover notas'
                });
            }

            // remover presenças
            db.query(deletePresencas, [alunoId], (err) => {

                if (err) {
                    console.log(err);

                    return res.status(500).json({
                        erro: 'Erro ao remover presenças'
                    });
                }

                // remover aluno
                db.query(deleteAluno, [alunoId], (err, result) => {

                    if (err) {
                        console.log(err);

                        return res.status(500).json({
                            erro: 'Erro ao remover aluno'
                        });
                    }

                    if (result.affectedRows === 0) {

                        return res.status(404).json({
                            erro: 'Aluno não encontrado'
                        });
                    }

                    res.json({
                        mensagem: 'Aluno removido com sucesso'
                    });

                });

            });

        });

    });

});

=======
const express = require('express');
const router = express.Router();

const db = require('../database/db');


//get - aluno por turma
router.get('/turma/:turmaId', (req, res) => {
    const turmaId = req.params.turmaId;
    const sql = `
    SELECT
        alunos.id,
        alunos.ra,
        alunos.nome,
        alunos.data_nascimento,
        turmas.nome AS turma

    FROM matriculas

    JOIN alunos
        ON matriculas.aluno_id = alunos.id

    JOIN turmas
        ON matriculas.turma_id = turmas.id

    WHERE turmas.id = ?
`;
    db.query(sql, [turmaId], (err, result) => {
        if (err) {
            console.error('Erro ao buscar alunos por turma: ', err);
            return res.status(500).json({
                erro: 'Erro ao buscar alunos por turma'
            });
        }
        res.json(result);
    });
});

//Get listar todos os alunos
router.get('/', (req, res) => {
    const sql = `
        SELECT 
            alunos.id,
            alunos.ra,
            alunos.nome,
            alunos.data_nascimento
        FROM alunos
    `;

    db.query(sql,(err,result) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                erro: 'Erro ao buscar alunos'
            });
        }
        res.json(result);
    });


});


// POST - criar um novo aluno
router.post('/', (req,res) => {
    const {ra,nome,data_nascimento} = req.body;
     
    //validaçao dos dados
    if(!ra || !nome || !data_nascimento){
        return res.status(400).json({
            erro: 'RA, nome e data de nascimento são obrigatórios'
        });
    }

     const sql = `
        INSERT INTO alunos (ra, nome, data_nascimento)
        VALUES (?, ?, ?)
    `;

      db.query(
        sql,
        [ra, nome, data_nascimento],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    erro: 'Erro ao cadastrar aluno'
                });
            }

            res.status(201).json({
                mensagem: 'Aluno cadastrado com sucesso',
                alunoId: result.insertId
            });

        }
    );

});

//put - atualizar um aluno 
router.put('/:id',(req,res) =>{
    const alunoId = req.params.id;
    const {ra, nome, data_nascimento} = req.body;

    //validaçao dos dados
    if(!ra || !nome || !data_nascimento){
        return res.status(400).json({
            erro: 'RA, nome e data de nascimento são obrigatórios'
        });
        
    }

const sql = `
        UPDATE alunos
        SET
            ra = ?,
            nome = ?,
            data_nascimento = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [ra, nome, data_nascimento, alunoId],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    erro: 'Erro ao atualizar aluno'
                });
            }

            // nenhum aluno encontrado
            if (result.affectedRows === 0) {

                return res.status(404).json({
                    erro: 'Aluno não encontrado'
                });
            }

            res.json({
                mensagem: 'Aluno atualizado com sucesso'
            });

        }
    );

});
// DELETE - remover aluno
router.delete('/:id', (req, res) => {

    const alunoId = req.params.id;

    // remover dependências primeiro
    const deleteMatriculas = `
        DELETE FROM matriculas
        WHERE aluno_id = ?
    `;

    const deleteNotas = `
        DELETE FROM notas
        WHERE aluno_id = ?
    `;

    const deletePresencas = `
        DELETE FROM presencas
        WHERE aluno_id = ?
    `;

    const deleteAluno = `
        DELETE FROM alunos
        WHERE id = ?
    `;

    // remover matrículas
    db.query(deleteMatriculas, [alunoId], (err) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                erro: 'Erro ao remover matrículas'
            });
        }

        // remover notas
        db.query(deleteNotas, [alunoId], (err) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    erro: 'Erro ao remover notas'
                });
            }

            // remover presenças
            db.query(deletePresencas, [alunoId], (err) => {

                if (err) {
                    console.log(err);

                    return res.status(500).json({
                        erro: 'Erro ao remover presenças'
                    });
                }

                // remover aluno
                db.query(deleteAluno, [alunoId], (err, result) => {

                    if (err) {
                        console.log(err);

                        return res.status(500).json({
                            erro: 'Erro ao remover aluno'
                        });
                    }

                    if (result.affectedRows === 0) {

                        return res.status(404).json({
                            erro: 'Aluno não encontrado'
                        });
                    }

                    res.json({
                        mensagem: 'Aluno removido com sucesso'
                    });

                });

            });

        });

    });

});

>>>>>>> main
module.exports = router;