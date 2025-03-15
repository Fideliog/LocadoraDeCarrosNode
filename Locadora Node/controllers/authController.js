const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.login = (req, res) => {
    const { usuario, senha } = req.body;
    const query = 'SELECT * FROM usuarios WHERE usuario = ?';

    db.query(query, [usuario], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const user = results[0];
            bcrypt.compare(senha, user.senha, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    req.session.user = user;
                    res.redirect('/dashboard');
                } else {
                    res.status(401).send('Usuário ou senha incorretos');
                }
            });
        } else {
            res.status(401).send('Usuário ou senha incorretos');
        }
    });
};
