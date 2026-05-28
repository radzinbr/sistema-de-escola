const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'escola'
})
connection.connect((err)=>{
    if(err){{
        console.error('Erro ao conectar ao banco de dados: ', err);
        return;
    }}
    console.log('Conexao bem sucedida ao banco de dados!');
})

module.exports = connection;