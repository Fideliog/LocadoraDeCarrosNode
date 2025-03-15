const db = require('../config/db');  

// Listar todos os veículos
exports.getVeiculos = (req, res) => {
    const query = 'SELECT * FROM Veiculos';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar veículos');
        }
        res.status(200).json(results);
    });
};

// Obter veículo por placa
exports.getVeiculoByPlaca = (req, res) => {
    const { placa } = req.params;

    const query = 'SELECT * FROM Veiculos WHERE veicPlaca = ?';

    db.query(query, [placa], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar veículo');
        }

        if (results.length === 0) {
            return res.status(404).send('Veículo não encontrado');
        }

        res.status(200).json(results[0]);
    });
};

// Criar novo veículo
exports.createVeiculo = (req, res) => {
    const { veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado } = req.body;

    // Verificar se os campos obrigatórios estão presentes
    if (!veicPlaca || !veicMarca || !veicModelo || !veicCor || !veicAno || !veicComb || !veicCat || veicStatusAlocado === undefined) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `
        INSERT INTO Veiculos 
        (veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [veicPlaca, veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao criar veículo');
        }
        res.status(201).send('Veículo criado com sucesso');
    });
};

// Atualizar veículo
exports.updateVeiculo = (req, res) => {
    const { placa } = req.params;
    const { veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado } = req.body;

    // Verificar se os campos obrigatórios estão presentes
    if (!veicMarca || !veicModelo || !veicCor || !veicAno || !veicComb || !veicCat || veicStatusAlocado === undefined) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `
        UPDATE Veiculos 
        SET veicMarca = ?, veicModelo = ?, veicCor = ?, veicAno = ?, veicComb = ?, veicCat = ?, veicStatusAlocado = ? 
        WHERE veicPlaca = ?
    `;

    db.query(query, [veicMarca, veicModelo, veicCor, veicAno, veicComb, veicCat, veicStatusAlocado, placa], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar veículo');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Veículo não encontrado');
        }

        res.status(200).send('Veículo atualizado com sucesso');
    });
};

// Excluir veículo
exports.deleteVeiculo = (req, res) => {
    const { placa } = req.params;

    const query = 'DELETE FROM Veiculos WHERE veicPlaca = ?';

    db.query(query, [placa], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao excluir veículo');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Veículo não encontrado');
        }

        res.status(200).send('Veículo excluído com sucesso');
    });
};