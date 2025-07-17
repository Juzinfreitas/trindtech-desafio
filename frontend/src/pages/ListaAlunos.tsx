import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../services/api';
import { Lupa } from '../components/lupa';
import { IconeBotaoAdicionar } from '../components/icone_botao_adicionar';

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
    <div className="max-w-4xl mx-auto bg-white shadow-md">
  <div className="flex gap-4 items-center mb-6 bg-primary p-4">
    <img src="/Union.svg" alt="Ícone" className="w-8 h-8" />
    <h2 className="text-2xl font-bold text-white">Gerenciador de Alunos</h2>
  </div>

  <div className="flex md:flex-row items-stretch md:items-center justify-between gap-4 mb-4 pl-4">
    <div className="flex border rounded-md w-full md:w-1/2 items-center px-4">
      <input
        type="text"
        placeholder="Buscar por nome..."
        className="w-full py-2 focus:outline-none"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      <span className="text-gray-500">
        <Lupa />
      </span>
    </div>

    <button
      onClick={() => navigate('/alunos/novo')}
      className="flex items-center gap-2 bg-white text-primary border border-primary px-4 py-2 rounded-md hover:bg-red-400 hover:text-white transition"
    >
      <IconeBotaoAdicionar />
      Adicionar
    </button>
  </div>

  <table className="w-full border border-gray-200 rounded overflow-hidden text-sm">
    <thead className="bg-gray-100 text-left text-gray-700">
      <tr>
        <th className="border px-4 py-3">Nome</th>
        <th className="border px-4 py-3">Cidade</th>
        <th className="border px-4 py-3">Estado</th>
        <th className="border px-4 py-3 text-center">Ações</th>
      </tr>
    </thead>
    <tbody>
      {alunosFiltrados.length === 0 ? (
        <tr>
          <td colSpan={4} className="text-center py-6 text-gray-500">
            Nenhum aluno encontrado.
          </td>
        </tr>
      ) : (
        alunosFiltrados.map((aluno) => (
          <tr key={aluno.id} className="hover:bg-gray-50">
            <td className="border px-4 py-3">{aluno.nome}</td>
            <td className="border px-4 py-3">{aluno.cidade}</td>
            <td className="border px-4 py-3">{aluno.estado}</td>
            <td className="border px-4 py-3 text-center space-x-2">
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
