const db = require('../config/db');

// Cadastrar um cliente
exports.cadastrarCliente = (req, res) => {
    const { clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat } = req.body;

    if (!clienteCPF || !clienteNome) {
        return res.status(400).send('CPF e Nome são obrigatórios');
    }

    const query = `
        INSERT INTO clientes 
        (clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [clienteCPF, clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao cadastrar cliente');
        }
        res.status(201).send('Cliente cadastrado com sucesso');
    });
};

// Listar todos os clientes
exports.getClientes = (req, res) => {
    const query = 'SELECT * FROM clientes';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar clientes');
        }
        res.status(200).json(results);
    });
};

// Buscar cliente por CPF
exports.getClienteByCPF = (req, res) => {
    const { cpf } = req.params;

    const query = 'SELECT * FROM clientes WHERE clienteCPF = ?';

    db.query(query, [cpf], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar cliente');
        }

        if (results.length === 0) {
            return res.status(404).send('Cliente não encontrado');
        }

        res.status(200).json(results[0]);
    });
};

// Atualizar cliente
exports.updateCliente = (req, res) => {
    const { cpf } = req.params;
    const { clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat } = req.body;

    const query = `
        UPDATE clientes 
        SET clienteNome = ?, clienteEnde = ?, clienteTel = ?, clienteCidade = ?, clienteDataNasc = ?, clienteCNH = ?, clienteCNHCat = ? 
        WHERE clienteCPF = ?
    `;

    db.query(query, [clienteNome, clienteEnde, clienteTel, clienteCidade, clienteDataNasc, clienteCNH, clienteCNHCat, cpf], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar cliente');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Cliente não encontrado');
        }

        res.status(200).send('Cliente atualizado com sucesso');
    });
};

// Excluir cliente
exports.deleteCliente = (req, res) => {
    const { cpf } = req.params;

    const query = 'DELETE FROM clientes WHERE clienteCPF = ?';

    db.query(query, [cpf], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao excluir cliente');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Cliente não encontrado');
        }

        res.status(200).send('Cliente excluído com sucesso');
    });
};