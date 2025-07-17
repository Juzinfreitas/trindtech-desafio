const API_URL = 'http://localhost:3000/alunos';

export async function listarAlunos() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function buscarAluno(id: string) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function criarAluno(data: any) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function atualizarAluno(id: string, data: any) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deletarAluno(id: string) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
}
