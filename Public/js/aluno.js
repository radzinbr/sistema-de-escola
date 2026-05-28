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


carregarAlunos();