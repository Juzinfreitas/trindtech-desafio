import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Aluno = {  
  id: number;
  nome: string;
  email: string;
};

type Curso = {
  id: number;
  nome: string;
};

export default function AlunoDetalhes() {
  const { id } = useParams(); // Pega o ID da URL
  const alunoId = Number(id);

  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [todosCursos, setTodosCursos] = useState<Curso[]>([]);
  const [cursoSelecionado, setCursoSelecionado] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [alunoRes, cursosVinculadosRes, todosCursosRes] = await Promise.all([
          fetch(`http://localhost:3000/alunos/${alunoId}`),
          fetch(`http://localhost:3000/alunos/${alunoId}/cursos`),
          fetch(`http://localhost:3000/cursos`)
        ]);

        const alunoData = await alunoRes.json();
        const cursosVinculados = await cursosVinculadosRes.json();
        const cursosTodos = await todosCursosRes.json();

        setAluno(alunoData);
        setCursos(cursosVinculados);
        setTodosCursos(cursosTodos);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    carregarDados();
  }, [alunoId]);

  async function vincularCurso() {
    if (!cursoSelecionado) return;

    try {
      const res = await fetch(`http://localhost:3000/alunos/${alunoId}/cursos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cursoId: cursoSelecionado }),
      });

      if (res.ok) {
        const novoCurso = todosCursos.find(c => c.id === cursoSelecionado);
        if (novoCurso) {
          setCursos(prev => [...prev, novoCurso]);
          setCursoSelecionado(null);
        }
      } else {
        console.error("Erro ao vincular curso");
      }
    } catch (error) {
      console.error("Erro ao fazer requisição:", error);
    }
  }

  if (loading) return <div className="p-4">Carregando aluno...</div>;
  if (!aluno) return <div className="p-4 text-red-500">Aluno não encontrado</div>;

  const cursosDisponiveis = todosCursos.filter(c => !cursos.some(cv => cv.id === c.id));

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-2">{aluno.nome}</h1>
      <p className="text-gray-600 mb-4">{aluno.email}</p>

      <h2 className="text-xl font-semibold mb-2">Cursos vinculados</h2>
      {cursos.length === 0 ? (
        <p className="text-gray-500">Nenhum curso vinculado.</p>
      ) : (
        <ul className="list-disc pl-5 mb-4">
          {cursos.map(c => (
            <li key={c.id}>{c.nome}</li>
          ))}
        </ul>
      )}

      <div className="border-t pt-4 mt-4">
        <h3 className="font-medium mb-2">Vincular novo curso:</h3>
        <div className="flex items-center gap-2">
          <select
            value={cursoSelecionado ?? ''}
            onChange={e => setCursoSelecionado(Number(e.target.value))}
            className="border rounded px-3 py-1 w-full"
          >
            <option value="" disabled>
              Selecione um curso
            </option>
            {cursosDisponiveis.map(c => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
          <button
            onClick={vincularCurso}
            disabled={!cursoSelecionado}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Vincular
          </button>
        </div>
      </div>
    </div>
  );
}
