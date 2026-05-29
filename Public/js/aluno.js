import { getAlunos } from "./api.js";

let alunoIdArquivar = null;

const formAluno =
    document.getElementById('form-aluno');


function abrirModalNovoAluno() {

    // limpa formulário
    formAluno.reset();

    // limpa id oculto
    document.getElementById(
        'aluno_id'
    ).value = '';

    // volta título
    document.getElementById(
        'titulo-modal-aluno'
    ).innerText = 'Novo Aluno';

    // abre modal
    const modal =
        new bootstrap.Modal(
            document.getElementById(
                'modalAluno'
            )
        );

    modal.show();
}


// =========================
// CADASTRAR ALUNO
// =========================
formAluno.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        const alunoId =
            document.getElementById(
                'aluno_id'
            ).value;

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

        // ====================
        // EDITAR
        // ====================

        if (alunoId) {

            const response = await fetch(
                `http://localhost:3000/alunos/${alunoId}`,
                {

                    method: 'PUT',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify(aluno)
                }
            );

            const data =
                await response.json();

            mostrarAlerta(
                data.mensagem,
                'warning'
            );
        }

        // ====================
        // NOVO
        // ====================

        else {

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

            mostrarAlerta(
                data.mensagem,
                'success'
            );
        }

        carregarAlunos();

        formAluno.reset();

        // limpa id
        document.getElementById(
            'aluno_id'
        ).value = '';

        // volta título
        document.getElementById(
            'titulo-modal-aluno'
        ).innerText = 'Novo Aluno';

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

// =========================
// LISTAR ALUNOS
// =========================

async function carregarAlunos() {

    const alunos = await getAlunos();

    const tabela =
        document.getElementById(
            'tabela-alunos'
        );

    let html = '';

    alunos.forEach(aluno => {

        html += `
            <tr>

                <td>${aluno.ra}</td>

                <td>${aluno.nome}</td>

                <td>
                    ${new Date(
                        aluno.data_nascimento
                    ).toLocaleDateString('pt-BR')}
                </td>

                <td>${aluno.turma}</td>

                <td>

                    <button
    class="btn btn-warning btn-sm"

    onclick='abrirModalEditar(
        ${JSON.stringify(aluno)}
    )'
>
    Editar
</button>

                    <button 
                        class="btn btn-danger btn-sm"

                        onclick='abrirModalArquivar(
                            ${aluno.id},
                            ${JSON.stringify(aluno.nome)}
                        )'
                    >
                       excluir
                    </button>

                </td>

            </tr>
        `;
    });

    tabela.innerHTML = html;
}


// =========================
// ABRIR MODAL ARQUIVAR
// =========================

function abrirModalArquivar(id, nome) {

    alunoIdArquivar = id;

    document.getElementById(
        'nome-aluno-arquivar'
    ).innerText = nome;

    const modal = new bootstrap.Modal(
        document.getElementById(
            'modalArquivar'
        )
    );

    modal.show();
}

function abrirModalEditar(aluno) {

    // muda título
    document.getElementById(
        'titulo-modal-aluno'
    ).innerText = 'Editar Aluno';

    // preenche id oculto
    document.getElementById(
        'aluno_id'
    ).value = aluno.id;

    // preenche formulário
    document.getElementById(
        'ra'
    ).value = aluno.ra;

    document.getElementById(
        'nome'
    ).value = aluno.nome;

    document.getElementById(
        'data_nascimento'
    ).value =
        aluno.data_nascimento.split('T')[0];

    document.getElementById(
        'turma_id'
    ).value = aluno.turma_id;
    
    // abre modal
    const modal =
        new bootstrap.Modal(
            document.getElementById(
                'modalAluno'
            )
        );

    modal.show();
}

// =========================
// CONFIRMAR ARQUIVAMENTO
// =========================

document.getElementById(
    'btn-confirmar-arquivar'
).addEventListener(
    'click',
    async () => {

        const response = await fetch(
            `http://localhost:3000/alunos/arquivar/${alunoIdArquivar}`,
            {
                method: 'PUT'
            }
        );

        const data =
            await response.json();

        mostrarAlerta(data.mensagem);

        // atualiza tabela
        carregarAlunos();

        // fecha modal
        const modal =
            bootstrap.Modal.getInstance(
                document.getElementById(
                    'modalArquivar'
                )
            );

        modal.hide();
    }
);


function mostrarAlerta(
    mensagem,
    tipo = 'success'
) {

    const container =
        document.getElementById(
            'alert-container'
        );

    const alerta =
        document.createElement('div');

    alerta.className =
        `alert alert-${tipo} alert-dismissible fade show`;

    alerta.innerHTML = `
        ${mensagem}

        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
        ></button>
    `;

    container.appendChild(alerta);

    // remove automático
    setTimeout(() => {

        alerta.remove();

    }, 3000);
}

// =========================
// INICIALIZA TABELA
// =========================

carregarAlunos();


// =========================
// FUNÇÃO GLOBAL
// =========================

window.abrirModalNovoAluno =
    abrirModalNovoAluno;
window.abrirModalEditar =
    abrirModalEditar;
window.abrirModalArquivar =
    abrirModalArquivar;