const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

router.get('/funcionarios', funcionarioController.getFuncionarios);
router.get('/funcionarios/:matricula', funcionarioController.getFuncionarioByMatricula);
router.post('/funcionarios', funcionarioController.createFuncionario);
router.put('/funcionarios/:matricula', funcionarioController.updateFuncionario);
router.delete('/funcionarios/:matricula', funcionarioController.deleteFuncionario);

module.exports = router;
