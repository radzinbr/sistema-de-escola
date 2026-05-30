const express = require('express');

const router = express.Router();

const alunosController =
    require('../controllers/alunosController');


// GET
router.get(
    '/',
    alunosController.listarAlunos
);


// GET por turma
router.get(
    '/turma/:turmaId',
    alunosController.buscarPorTurma
);


// POST
router.post(
    '/',
    alunosController.cadastrarAluno
);


// PUT
router.put(
    '/:id',
    alunosController.atualizarAluno
);

router.get(
    '/total',
    alunosController.totalAlunos
);


// DELETE
router.put(
    '/arquivar/:id',
    alunosController.arquivarAluno
);


module.exports = router;