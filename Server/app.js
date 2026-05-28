const express = require('express');
const cors = require('cors');
const app = express();


const db = require('./database/db');

const alunosRoutes = require('./routes/alunosRoutes');
app.use(cors()); // 👈 ISSO AQUI RESOLVE

app.use(express.json());




app.use('/alunos', alunosRoutes);

// Rota para obter todos os alunos

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});