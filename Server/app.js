const express = require('express');

const cors = require('cors');

const app = express();

const alunosRoutes =
    require('./routes/alunosRoutes');

const turmasRoutes = require('./routes/turmasRoutes');

app.use(cors());

app.use(express.json());

app.use(express.static('public'));

app.use('/alunos', alunosRoutes);
app.use('/turmas', turmasRoutes);

app.listen(3000, () => {

    console.log(
        'Servidor rodando na porta 3000'
    );
});