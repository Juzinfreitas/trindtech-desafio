import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Aluno {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  dataNascimento: string;
  cep: string;
  estado: string;
  cidade: string;
  logradouro: string;
  createdAt: string;
  updatedAt: string;
}

export default function Alunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const alunosPorPagina = 10;
  const navigate = useNavigate();

  const fetchAlunos = async (page = 1, limit = alunosPorPagina) => {
    try {
      const res = await fetch(`http://localhost:3000/alunos?page=${page}&limit=${limit}`);
      const data = await res.json();
      setAlunos(data.rows); 
      setTotalCount(data.totalCount); 
    } catch (err) { 
      console.error('Erro ao buscar alunos:', err);
    }
  };

  useEffect(() => {
    fetchAlunos(currentPage, alunosPorPagina);
  }, [currentPage]);

  const totalPages = Math.max(1, Math.ceil(totalCount / alunosPorPagina));


  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
      <button
      onClick={() => navigate('/')}
      className="ml-4 mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
    >
        Voltar para o Início
      </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Lista de Alunos</h1>
      {alunos.length === 0 ? (
        <p>Nenhum aluno encontrado.</p>
      ) : (
        <ul className="space-y-2">
          {alunos.map((aluno) => (
            <li
              key={aluno.id}
              className="p-4 border border-gray-300 rounded-md shadow"
            >
              <p>
                <strong>Nome:</strong> {aluno.nome}
              </p>
              <p>
                <strong>Sobrenome:</strong> {aluno.sobrenome}
              </p>
              <p>
                <strong>Email:</strong> {aluno.email}
              </p>
              <p>
                <strong>Data de Nascimento:</strong> {aluno.dataNascimento}
              </p>
              <p>
                <strong>CEP:</strong> {aluno.cep}
              </p>
              <p>
                <strong>Estado:</strong> {aluno.estado}
              </p>
              <p>
                <strong>Cidade:</strong> {aluno.cidade}
              </p>
              <p>
                <strong>Logradouro:</strong> {aluno.logradouro}
              </p>
            </li>
          ))}
        </ul>
      )}
            <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          ← Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded ${
              currentPage === page
                ? 'bg-blue-600 text-white border-blue-600'
                : 'text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Próximo →
        </button>
      </div>
    </div>
  );
}
