import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../services/api';

interface Aluno {
  id: number;
  nome: string;
  cidade: string;
  estado: string;
}

export default function ListaAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();

  const buscarAlunos = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/alunos`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro ${res.status}: ${text}`);
      }
      const data = await res.json();
      console.log('Dados recebidos:', data);

      if (Array.isArray(data.rows)) {
        setAlunos(data.rows);
      } else {
        alert('Erro: resposta da API não é um array');
        setAlunos([]);
      }
    } catch (error: any) {
      alert(`Erro ao buscar alunos: ${error.message}`);
    }
  };

  console.log('Alunos:', alunos);

  // Deletar aluno
  const deletarAluno = async (id: number) => {
    const confirmar = confirm('Tem certeza que deseja excluir este aluno?');
    if (!confirmar) return;

    try {
      await fetch(`${API_BASE_URL}/alunos/${id}`, { method: 'DELETE' });
      buscarAlunos(); // Atualiza lista após deletar
    } catch (error) {
      alert('Erro ao deletar aluno.');
    }
  };

  useEffect(() => {
    buscarAlunos();
  }, []);

  // Filtro por nome
  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(filtro.toLowerCase()),
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lista de Alunos</h2>
        <button
          onClick={() => navigate('/alunos/novo')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Novo Aluno
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nome..."
        className="w-full mb-4 px-3 py-2 border rounded"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-left">Nome</th>
            <th className="border px-4 py-2 text-left">Cidade</th>
            <th className="border px-4 py-2 text-left">Estado</th>
            <th className="border px-4 py-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunosFiltrados.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                Nenhum aluno encontrado.
              </td>
            </tr>
          ) : (
            alunosFiltrados.map((aluno) => (
              <tr key={aluno.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{aluno.nome}</td>
                <td className="border px-4 py-2">{aluno.cidade}</td>
                <td className="border px-4 py-2">{aluno.estado}</td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => navigate(`/alunos/${aluno.id}/editar`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deletarAluno(aluno.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
