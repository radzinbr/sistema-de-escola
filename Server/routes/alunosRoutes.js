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


// DELETE
router.delete(
    '/:id',
    alunosController.removerAluno
);


module.exports = router;