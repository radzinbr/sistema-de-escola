<<<<<<< HEAD
async function carregarAlunos() {

    const alunos = await buscarAlunos();

    const tabela = document.getElementById('tabela-alunos');

    tabela.innerHTML = '';

    alunos.forEach(aluno => {

        tabela.innerHTML += `
            <tr>
                <td>${aluno.ra}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.data_nascimento}</td>

                <td>
                    <button class="btn btn-warning btn-sm">
                        Editar
                    </button>

                    <button class="btn btn-danger btn-sm">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

=======
const tabelaAlunos = document.getElementById('tabela-alunos');


async function carregarAlunos() {

    const alunos = await buscarAlunos();

    tabelaAlunos.innerHTML = '';

    alunos.forEach(aluno => {

        tabelaAlunos.innerHTML += `
            <tr>
                <td>${aluno.ra}</td>

                <td>${aluno.nome}</td>

                <td>
                    ${new Date(
                        aluno.data_nascimento
                    ).toLocaleDateString('pt-BR')}
                </td>
            </tr>
        `;
    });
}


>>>>>>> main
carregarAlunos();