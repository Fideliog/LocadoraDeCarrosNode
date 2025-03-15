const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rota para cadastrar cliente
router.post('/clientes', clienteController.cadastrarCliente);

// Rota para listar todos os clientes
router.get('/clientes', clienteController.getClientes);

// Rota para buscar cliente por CPF
router.get('/clientes/:cpf', clienteController.getClienteByCPF);

// Rota para atualizar cliente por CPF
router.put('/clientes/:cpf', clienteController.updateCliente);

// Rota para excluir cliente por CPF
router.delete('/clientes/:cpf', clienteController.deleteCliente);

module.exports = router;