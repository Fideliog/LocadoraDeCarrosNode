const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController');

router.get('/veiculos', veiculoController.getVeiculos);
router.get('/veiculos/:placa', veiculoController.getVeiculoByPlaca);
router.post('/veiculos', veiculoController.createVeiculo);
router.put('/veiculos/:placa', veiculoController.updateVeiculo);
router.delete('/veiculos/:placa', veiculoController.deleteVeiculo);

module.exports = router;
