const API_URL = "http://localhost:3000";

async function request(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        },
        ...options
    });

    return response.json();
}

export const getAlunos = () => request("/alunos");


export const criarAluno = (dados) =>
    request("/alunos", {
        method: "POST",
        body: JSON.stringify(dados)
    });

   export async function getTurmas() {

    const response = await fetch(
        'http://localhost:3000/turmas'
    );

    return await response.json();
}