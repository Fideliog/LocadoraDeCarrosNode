const db = require('../config/db');  

// Listar todos os funcionários
exports.getFuncionarios = (req, res) => {
    const query = 'SELECT * FROM Funcionarios';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar funcionários');
        }
        res.status(200).json(results);
    });
};

// Obter funcionário por matrícula
exports.getFuncionarioByMatricula = (req, res) => {
    const { matricula } = req.params;

    const query = 'SELECT * FROM Funcionarios WHERE funcMatricula = ?';

    db.query(query, [matricula], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar funcionário');
        }

        if (results.length === 0) {
            return res.status(404).send('Funcionário não encontrado');
        }

        res.status(200).json(results[0]);
    });
};

// Criar novo funcionário
exports.createFuncionario = (req, res) => {
    const { funcMatricula, funcNome, funcDepto, funcSalario, funcAdimissao, funcFilho, funcSexo, funcAtivo } = req.body;

    // Verificar se os campos obrigatórios estão presentes
    if (!funcMatricula || !funcNome || !funcDepto || !funcSalario || !funcAdimissao || !funcFilho || !funcSexo || funcAtivo === undefined) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `
        INSERT INTO Funcionarios 
        (funcMatricula, funcNome, funcDepto, funcSalario, funcAdimissao, funcFilho, funcSexo, funcAtivo) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [funcMatricula, funcNome, funcDepto, funcSalario, funcAdimissao, funcFilho, funcSexo, funcAtivo], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao criar funcionário');
        }
        res.status(201).send('Funcionário criado com sucesso');
    });
};

// Atualizar funcionário
exports.updateFuncionario = (req, res) => {
    const { matricula } = req.params;
    const { funcNome, funcDepto, funcSalario, funcAdimissao, funcFilho, funcSexo, funcAtivo } = req.body;

    // Verificar se os campos obrigatórios estão presentes
    if (!funcNome || !funcDepto || !funcSalario || !funcAdimissao || !funcFilho || !funcSexo || funcAtivo === undefined) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = `
        UPDATE Funcionarios 
        SET funcNome = ?, funcDepto = ?, funcSalario = ?, funcAdimissao = ?, funcFilho = ?, funcSexo = ?, funcAtivo = ? 
        WHERE funcMatricula = ?
    `;

    db.query(query, [funcNome, funcDepto, funcSalario, funcAdimissao, funcFilho, funcSexo, funcAtivo, matricula], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar funcionário');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Funcionário não encontrado');
        }

        res.status(200).send('Funcionário atualizado com sucesso');
    });
};

// Excluir funcionário
exports.deleteFuncionario = (req, res) => {
    const { matricula } = req.params;

    const query = 'DELETE FROM Funcionarios WHERE funcMatricula = ?';

    db.query(query, [matricula], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao excluir funcionário');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Funcionário não encontrado');
        }

        res.status(200).send('Funcionário excluído com sucesso');
    });
};