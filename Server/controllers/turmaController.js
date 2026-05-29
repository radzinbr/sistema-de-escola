const db =
    require('../database/db');


// LISTAR TURMAS
exports.listarTurmas = (req, res) => {

    

    const sql = `
        SELECT *
        FROM turmas
        ORDER BY ano DESC, nome ASC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                erro:
                    'Erro ao buscar turmas'
            });
        }

        res.json(results);
    });
};