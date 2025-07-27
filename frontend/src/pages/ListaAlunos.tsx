import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../services/api';
import { Lupa } from '../components/lupa';
import { IconeBotaoAdicionar } from '../components/icone_botao_adicionar';

// Novo componente para chips/tags de cursos
const CursoTags = ({
  cursos,
  maxVisible = 4,
}: {
  cursos: { nome: string }[] | string[];
  maxVisible?: number;
}) => {
  const cursoNomes =
    cursos.length > 0 && typeof cursos[0] === 'object'
      ? (cursos as { nome: string }[]).map((c) => c.nome)
      : (cursos as string[]);

  const visible = cursoNomes.slice(0, maxVisible);
  const extra = cursoNomes.length - visible.length;
  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((curso, idx) => (
        <span
          key={curso + idx}
          className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium"
        >
          {curso}
        </span>
      ))}
      {extra > 0 && (
        <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
          +{extra}
        </span>
      )}
    </div>
  );
};

interface Aluno {
  id: number;
  nome: string;
  sobrenome: string;
  cidade: string;
  estado: string;
  cursosConcluidos?: { nome: string }[];
  cursosEmAndamento?: { nome: string }[];
  createdAt: string;
}

export default function ListaAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [filtro, setFiltro] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const alunosPorPagina = 10;
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const buscarAlunos = async (page = 1, limit = 10) => {
    try {
      const res = await fetch(`${API_BASE_URL}/alunos?page=${page}&limit=${limit}&filtro=${encodeURIComponent(filtro)}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro ${res.status}: ${text}`);
      }
      const data = await res.json();

      // Backend precisa retornar totalCount para calcular totalPages!
      setAlunos(data.rows || []);
      setTotalPages(Math.max(1, Math.ceil((data.totalCount || 0) / alunosPorPagina)));
    } catch (error: any) {
      alert(`Erro ao buscar alunos: ${error.message}`);
    }
  };

  useEffect(() => {
    buscarAlunos(currentPage, alunosPorPagina);
  }, [currentPage, alunosPorPagina, filtro]);

  const renderCursos = (aluno: Aluno) => {
    const todosCursos = [
      ...(aluno.cursosConcluidos ?? []),
      ...(aluno.cursosEmAndamento ?? [])
    ];
    return <CursoTags cursos={todosCursos} maxVisible={4} />;
  };

  const renderPaginationButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 border rounded ${
            currentPage === i
              ? 'bg-blue-600 text-white border-blue-600'
              : 'text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }
    return pageButtons;
  };

  return (
    <div className="max-w-4x2 mx-auto bg-white shadow-md">
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
            onChange={(e) => { setFiltro(e.target.value); setCurrentPage(1); }}
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
            <th className="py-3 text-left pl-2">
              Data de cadastro
              <span className="ml-2 text-xs cursor-pointer">↑↓</span>
            </th>
            <th className="border px-4 py-3">Nome</th>
            <th className="border px-4 py-3">Estado</th>
            <th className="border px-4 py-3">Cursos</th>
            <th className="border px-4 py-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                Nenhum aluno encontrado.
              </td>
            </tr>
          ) : (
            alunos.map((aluno) => (
              <tr key={aluno.id} className="border-b hover:bg-gray-50">
                <td className="py-3 pl-2 text-gray-500">
                  {aluno.createdAt
                    ? new Date(aluno.createdAt).toLocaleDateString('pt-BR')
                    : ''}
                </td>
                <td className="py-3 font-semibold text-gray-700">{aluno.nome} {aluno.sobrenome}</td>
                <td className="py-3 text-gray-600">{aluno.estado}</td>
                <td className="py-3">{renderCursos(aluno)}</td>
                <td className="py-3 text-blue-600 hover:underline cursor-pointer">
                  <button onClick={() => navigate(`/alunos/${aluno.id}/editar`)} className="text-blue-600 hover:underline">
                    Editar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          ← Anterior
        </button>
        {renderPaginationButtons()}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Próximo →
        </button>
      </div>
    </div>
  );
}