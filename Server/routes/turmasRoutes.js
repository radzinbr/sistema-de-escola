const express = require('express');

const router = express.Router();

const turmaController =
    require('../controllers/turmaController');


// GET TURMAS
router.get(
    '/',
    turmaController.listarTurmas
);

module.exports = router;