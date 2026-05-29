import { getAlunos } from "./api.js";

const formAluno =
    document.getElementById('form-aluno');


formAluno.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        const aluno = {

            ra:
                document.getElementById('ra').value,

            nome:
                document.getElementById('nome').value,

            data_nascimento:
                document.getElementById(
                    'data_nascimento'
                ).value,

            turma_id:
                document.getElementById(
                    'turma_id'
                ).value
        };

        const response = await fetch(
            'http://localhost:3000/alunos',
            {

                method: 'POST',

                headers: {
                    'Content-Type':
                        'application/json'
                },

                body: JSON.stringify(aluno)
            }
        );

        const data =
            await response.json();

        alert(data.mensagem);

        // atualiza tabela
        carregarAlunos();

        // limpa form
        formAluno.reset();

        // fecha modal
        const modal =
            bootstrap.Modal.getInstance(
                document.getElementById(
                    'modalAluno'
                )
            );

        modal.hide();
    }
);


async function carregarAlunos() {

    const alunos = await getAlunos();

    const tabela = document.getElementById("tabela-alunos");

    let html = "";

    alunos.forEach(aluno => {
        html += `
            <tr>
    <td>${aluno.ra}</td>
    <td>${aluno.nome}</td>
             <td>${new Date(aluno.data_nascimento).toLocaleDateString('pt-BR')}</td>
        <td>${aluno.turma}</td>

                <td>
                    <button class="btn btn-warning btn-sm">Editar</button>
                    <button class="btn btn-danger btn-sm">Excluir</button>
                </td>
            </tr>
        `;
    });

    tabela.innerHTML = html;
}

carregarAlunos();