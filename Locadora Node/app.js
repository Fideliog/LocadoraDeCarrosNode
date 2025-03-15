// app.js
const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const veiculoRoutes = require('./routes/veiculoRoutes');
const OdSRoutes = require('./routes/OdSRoutes');

const app = express();

// Configurações
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração da sessão
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));

// Configuração das rotas
app.use('/auth', authRoutes);
app.use('/api',clienteRoutes);
app.use('/api',funcionarioRoutes); // Novas rotas para funcionários
app.use('/api',veiculoRoutes); // Novas rotas para veículos
app.use('/api',OdSRoutes);

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos (CSS e JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Rota inicial
app.get('/', (req, res) => res.render('index'));

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
const cors = require('cors');
app.use(cors());