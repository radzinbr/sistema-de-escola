import {
    getAlunos,
    getTurmas
} from "./api.js";

let todosAlunos = [];
let alunoIdArquivar = null
let paginaAtual = 1;
const limite = 10;

let totalPaginas = 1;


const formAluno =
    document.getElementById('form-aluno');


// =========================
// MODAL NOVO ALUNO
// =========================

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
// CADASTRAR / EDITAR ALUNO
// =========================

formAluno.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        const btnSalvar =
            document.getElementById(
                'btn-salvar-aluno'
            );

        btnSalvar.disabled = true;

        btnSalvar.innerHTML = `
    <span
        class="spinner-border spinner-border-sm"
    ></span>

    Salvando...
`;

        try {

            const alunoId =
                document.getElementById(
                    'aluno_id'
                )?.value;

            const aluno = {

                ra:
                    document.getElementById(
                        'ra'
                    ).value,

                nome:
                    document.getElementById(
                        'nome'
                    ).value,

                data_nascimento:
                    document.getElementById(
                        'data_nascimento'
                    ).value,

                turma_id:
                    document.getElementById(
                        'turma_id'
                    ).value
            };

            console.log(aluno);

            let response;

            // ====================
            // EDITAR
            // ====================

            if (alunoId) {

                response = await fetch(
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
            }

            // ====================
            // Novo aluno
            // ====================

            else {

                response = await fetch(
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
            }

            console.log(response);

            // pega texto primeiro
            const texto =
                await response.text();

            console.log(texto);

            // tenta converter json
            let data = {};

            try {

                data = JSON.parse(texto);

            }

            catch {

                throw new Error(
                    'Resposta inválida do servidor'
                );
            }

            mostrarAlerta(
                data.mensagem || data.erro,

                response.ok
                    ? 'success'
                    : 'danger'
            );

            // sucesso
            if (response.ok) {

                carregarAlunos();

                formAluno.reset();

                const modalElement =
                    document.getElementById(
                        'modalAluno'
                    );

                const modal =
                    bootstrap.Modal.getInstance(
                        modalElement
                    );

                if (modal) {
                    btnSalvar.disabled = false;

                    btnSalvar.innerHTML = 'Salvar';
                    modal.hide();
                }



                setTimeout(() => {

                    document.body.classList.remove('modal-open');
                    document.body.style.overflow = '';

                    document
                        .querySelectorAll('.modal-backdrop')
                        .forEach(el => el.remove());

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });

                }, 300);
                // limpa backdrop preso
                document.body.classList.remove(
                    'modal-open'
                );


                document
                    .querySelectorAll(
                        '.modal-backdrop'
                    )
                    .forEach(el => el.remove());
            }
        }

        catch (error) {

            console.log(error);

            mostrarAlerta(
                error.message,
                'danger'
            );

            // evita travamento do modal
            document.body.classList.remove(
                'modal-open'
            );

            document
                .querySelectorAll(
                    '.modal-backdrop'
                )
                .forEach(el => el.remove());
        }
        console.log("CHEGOU NO FINAL DO SUBMIT");
    }
);





// =========================
// LISTAR ALUNOS
// =========================
async function carregarAlunos() {

    todosAlunos = await getAlunos();

    renderizarTabela(todosAlunos);

}


function renderizarTabela(alunos) {

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
                        Excluir
                    </button>

                </td>

            </tr>
        `;
    });

    tabela.innerHTML = html;
}


function aplicarFiltros() {

    const nome =
        document.getElementById(
            'filtro-nome'
        ).value.toLowerCase();

    const ra =
        document.getElementById(
            'filtro-ra'
        ).value.toLowerCase();

    const ano =
        document.getElementById(
            'filtro-ano'
        ).value;

    const turma =
        document.getElementById(
            'filtro-turma'
        ).value.toLowerCase();

    const filtrados =
        todosAlunos.filter(aluno => {

            const data =
                new Date(
                    aluno.data_nascimento
                );

            const anoNascimento =
                data.getFullYear();

            return (

                aluno.nome
                    .toLowerCase()
                    .includes(nome)

                &&

                aluno.ra
                    .toLowerCase()
                    .includes(ra)

                &&

                (
                    !ano ||
                    anoNascimento == ano
                )

                &&

                aluno.turma
                    .toLowerCase()
                    .includes(turma)
            );
        });

    renderizarTabela(filtrados);
}


// =========================
// CARREGAR TURMAS
// =========================

async function carregarTurmas() {

    const turmas =
        await getTurmas();

    const select =
        document.getElementById(
            'turma_id'
        );

    let html = `
        <option value="">
            Selecione
        </option>
    `;

    turmas.forEach(turma => {

        html += `
            <option value="${turma.id}">
                ${turma.nome} - ${turma.ano}
            </option>
        `;
    });

    select.innerHTML = html;
}


// =========================
// MODAL ARQUIVAR
// =========================

function abrirModalArquivar(id, nome) {

    alunoIdArquivar = id;

    document.getElementById(
        'nome-aluno-arquivar'
    ).innerText = nome;

    const modal =
        new bootstrap.Modal(
            document.getElementById(
                'modalArquivar'
            )
        );

    modal.show();
}


// =========================
// MODAL EDITAR
// =========================

function abrirModalEditar(aluno) {

    // título
    document.getElementById(
        'titulo-modal-aluno'
    ).innerText =
        'Editar Aluno';

    // id oculto
    document.getElementById(
        'aluno_id'
    ).value = aluno.id;

    // campos
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

        try {

            const response = await fetch(
                `http://localhost:3000/alunos/arquivar/${alunoIdArquivar}`,
                {
                    method: 'PUT'
                }
            );

            const data =
                await response.json();

            mostrarAlerta(
                data.mensagem || data.erro,
                response.ok
                    ? 'success'
                    : 'danger'
            );

            if (response.ok) {

                carregarAlunos();

                // fecha modal
                const modal =
                    bootstrap.Modal.getInstance(
                        document.getElementById(
                            'modalArquivar'
                        )
                    );

                if (modal) {
                    modal.hide();

                }
            }

        }

        catch (error) {

            console.log(error);

            mostrarAlerta(
                'Erro ao arquivar aluno',
                'danger'
            );
        }
    }
);

document.getElementById(
    'ra'
).addEventListener(
    'input',
    (e) => {

        let valor =
            e.target.value;

        // remove caracteres inválidos
        valor = valor.replace(
            /[^0-9A-Za-z]/g,
            ''
        );

        // números + dígito
        if (valor.length > 9) {

            valor =
                valor.slice(0, 9)
                + '-'
                + valor.slice(9);
        }

        // adiciona espaço antes UF
        if (valor.length > 11) {

            valor =
                valor.slice(0, 11)
                + ' '
                + valor.slice(11, 13)
                    .toUpperCase();
        }

        e.target.value = valor;
    }
);

// =========================
// ALERTA BOOTSTRAP
// =========================

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
// INICIALIZA
// =========================





carregarAlunos();



carregarTurmas();

[
    'filtro-nome',
    'filtro-ra',
    'filtro-ano',
    'filtro-turma'
].forEach(id => {
    document.getElementById(id).addEventListener(
        'input',
        aplicarFiltros
    );
})


// =========================
// FUNÇÕES GLOBAIS
// =========================

window.abrirModalNovoAluno =
    abrirModalNovoAluno;

window.abrirModalEditar =
    abrirModalEditar;

window.abrirModalArquivar =
    abrirModalArquivar; 