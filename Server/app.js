const express = require('express');

const cors = require('cors');

const app = express();

const alunosRoutes =
    require('./routes/alunosRoutes');


app.use(cors());

app.use(express.json());

app.use(express.static('public'));

app.use('/alunos', alunosRoutes);


app.listen(3000, () => {

    console.log(
        'Servidor rodando na porta 3000'
    );
});