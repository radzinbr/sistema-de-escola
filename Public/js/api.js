const API_URL = 'http://localhost:3000';

async function buscarAlunos() {

    const response = await fetch(`${API_URL}/alunos`);

    return await response.json();
}