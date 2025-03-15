const db = require('../config/db');  

// Listar todas as Ordens de Serviço
exports.getOdS = (req, res) => {
    const query = 'SELECT * FROM Ordem_de_Servico';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao listar Ordens de Serviço');
        }
        res.status(200).json(results);
    });
};

// Buscar Ordem de Serviço por número
exports.getOdSbyNum = (req, res) => {
    const { OsNum } = req.params;

    const query = 'SELECT * FROM Ordem_de_Servico WHERE OsNum = ?';

    db.query(query, [OsNum], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar Ordem de Serviço');
        }

        if (results.length === 0) {
            return res.status(404).send('Ordem de serviço não encontrada');
        }

        res.status(200).json(results[0]);
    });
};

// Criar nova Ordem de Serviço
exports.createOdS = (req, res) => {
    const { OsNum, OsFuncMat, OsClienteCPF, OsVeicPlaca, OsDataRetirada, OsDataDevolucao, OsKMRetirada, OsKMDevolucao, OsStatus, OsValorPgto } = req.body;

    // Verificar se os campos obrigatórios estão presentes
    if (!OsNum || !OsFuncMat || !OsClienteCPF || !OsVeicPlaca || !OsDataRetirada || !OsDataDevolucao || !OsKMRetirada || !OsKMDevolucao || !OsStatus || !OsValorPgto) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `
        INSERT INTO Ordem_de_Servico 
        (OsNum, OsFuncMat, OsClienteCPF, OsVeicPlaca, OsDataRetirada, OsDataDevolucao, OsKMRetirada, OsKMDevolucao, OsStatus, OsValorPgto) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [OsNum, OsFuncMat, OsClienteCPF, OsVeicPlaca, OsDataRetirada, OsDataDevolucao, OsKMRetirada, OsKMDevolucao, OsStatus, OsValorPgto], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao criar Ordem de Serviço');
        }
        res.status(201).send('Ordem de serviço criada com sucesso');
    });
};

// Atualizar Ordem de Serviço
exports.updateOdS = (req, res) => {
    const { OsNum } = req.params;
    const { OsFuncMat, OsClienteCPF, OsVeicPlaca, OsDataRetirada, OsDataDevolucao, OsKMRetirada, OsKMDevolucao, OsStatus, OsValorPgto } = req.body;

    // Verificar se os campos obrigatórios estão presentes
    if (!OsFuncMat || !OsClienteCPF || !OsVeicPlaca || !OsDataRetirada || !OsDataDevolucao || !OsKMRetirada || !OsKMDevolucao || !OsStatus || !OsValorPgto) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `
        UPDATE Ordem_de_Servico 
        SET OsFuncMat = ?, OsClienteCPF = ?, OsVeicPlaca = ?, OsDataRetirada = ?, OsDataDevolucao = ?, OsKMRetirada = ?, OsKMDevolucao = ?, OsStatus = ?, OsValorPgto = ? 
        WHERE OsNum = ?
    `;

    db.query(query, [OsFuncMat, OsClienteCPF, OsVeicPlaca, OsDataRetirada, OsDataDevolucao, OsKMRetirada, OsKMDevolucao, OsStatus, OsValorPgto, OsNum], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar Ordem de Serviço');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Ordem de serviço não encontrada');
        }

        res.status(200).send('Ordem de serviço atualizada com sucesso');
    });
};

// Excluir Ordem de Serviço
exports.deleteOdS = (req, res) => {
    const { OsNum } = req.params;

    const query = 'DELETE FROM Ordem_de_Servico WHERE OsNum = ?';

    db.query(query, [OsNum], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao excluir Ordem de Serviço');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Ordem de serviço não encontrada');
        }

        res.status(200).send('Ordem de serviço excluída com sucesso');
    });
};