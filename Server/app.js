<<<<<<< HEAD
const express = require('express');
const app = express();
const db = require('./database/db');

const alunosRoutes = require('./routes/alunosRoutes');

app.use(express.json());

app.use('/alunos',alunosRoutes);

// Rota para obter todos os alunos

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});


app.listen(3000,() => {
    console.log('Servidor rodando na porta 3000');
=======
const express = require('express');
const app = express();
const db = require('./database/db');

const alunosRoutes = require('./routes/alunosRoutes');

app.use(express.json());
app.use(express.static('public'));


app.use('/alunos',alunosRoutes);

// Rota para obter todos os alunos

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});


app.listen(3000,() => {
    console.log('Servidor rodando na porta 3000');
>>>>>>> main
});