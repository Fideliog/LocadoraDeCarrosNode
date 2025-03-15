const express = require('express');
const router = express.Router();
const OdSController = require('../controllers/OdSController');

router.get('/Ordem_de_Servico', OdSController.getOdS);
router.get('/Ordem_de_Servico/:OsNum', OdSController.getOdSbyNum);
router.post('/Ordem_de_Servico', OdSController.createOdS);
router.put('/Ordem_de_Servico/:OsNum', OdSController.updateOdS);
router.delete('/Ordem_de_Servico/:OsNum', OdSController.deleteOdS);

module.exports = router;
