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
    <div className="max-w-4x2 mx-autop-4 bg-white rounded shadow">
      <div className="flex gap-6 items-center mb-4 bg-primary p-6">
        <img src="/Union.svg" alt="" />
        <h2 className="text-2xl font-bold text-white">Gerenciador de Alunos</h2>
      </div>
      <div className="flex w-full items-center">
        <div className=" flex border py-4 my-4 mx-4 rounded-md w-full">
          <input
            type="text"
            placeholder="Buscar por nome..."
            className="w-full border-none pl-4 focus:outline-none"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <span className="pr-4">
            <Lupa />
          </span>
        </div>
        <div className="flex items-center gap-2 border rounded-md h-fit">
          <span className="">
            <IconeBotaoAdicionar />
          </span>
          <button
            onClick={() => navigate('/alunos/novo')}
            className="text-primary rounded"
          >
            Adicionar
          </button>
        </div>
      </div>

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
