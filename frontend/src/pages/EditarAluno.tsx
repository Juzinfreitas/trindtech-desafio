import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../services/api';

interface Curso {
  id: number;
  nome: string;
}

interface CursoAssociado {
  id: number;
  nome: string;
  status: 'concluido' | 'em_andamento';
}

const EditarAluno = () => {
  const { id } = useParams<{ id: string }>(); // força tipagem string
  const navigate = useNavigate();

  // Estado aluno - mantendo inicial padrão para evitar erros
  const [aluno, setAluno] = useState({
    nome: '',
    cep: '',
    cidade: '',
    estado: '',
    logradouro: '',
    cursosConcluidos: [] as string[],
    cursosEmAndamento: [] as string[],
  });

  const [novoCursoConcluido, setNovoCursoConcluido] = useState('');
  const [novoCursoAndamento, setNovoCursoAndamento] = useState('');
  const [cursosDisponiveis, setCursosDisponiveis] = useState<Curso[]>([]);
  const [cursosAssociados, setCursosAssociados] = useState<CursoAssociado[]>(
    [],
  );
  const [cursoSelecionado, setCursoSelecionado] = useState('');
  const [statusCurso, setStatusCurso] = useState<'concluido' | 'em_andamento'>(
    'em_andamento',
  );

  useEffect(() => {
    if (!id) {
      alert('ID do aluno não encontrado');
      navigate('/alunos');
      return;
    }

    const fetchData = async () => {
      console.log(`Buscando dados do aluno com ID: ${id}`);
      try {
        const alunoRes = await fetch(`${API_BASE_URL}/alunos/${id}`);
        if (!alunoRes.ok) throw new Error('Erro ao buscar aluno');
        const alunoData = await alunoRes.json();
        console.log('Dados do aluno:', alunoData);
        // Garantir que os arrays existam
        setAluno({
          ...alunoData,
          cursosConcluidos: alunoData.cursosConcluidos || [],
          cursosEmAndamento: alunoData.cursosEmAndamento || [],
        });

        //   const cursosRes = await fetch(`${API_BASE_URL}/cursos`);
        //   if (!cursosRes.ok) throw new Error('Erro ao buscar cursos');
        //   const cursosData = await cursosRes.json();
        //   setCursosDisponiveis(cursosData);

        //   const vinculadosRes = await fetch(`${API_BASE_URL}/alunos/${id}/cursos`);
        //   if (!vinculadosRes.ok) throw new Error('Erro ao buscar cursos associados');
        //   const vinculadosData = await vinculadosRes.json();
        //   setCursosAssociados(vinculadosData);
      } catch (error) {
        alert('Erro ao carregar dados do aluno');
        // navigate('/alunos');
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAluno((prev) => ({ ...prev, [name]: value }));
  };

  const adicionarCurso = (tipo: 'concluido' | 'andamento') => {
    if (tipo === 'concluido' && novoCursoConcluido.trim()) {
      setAluno((prev) => ({
        ...prev,
        cursosConcluidos: [...prev.cursosConcluidos, novoCursoConcluido.trim()],
      }));
      setNovoCursoConcluido('');
    } else if (tipo === 'andamento' && novoCursoAndamento.trim()) {
      setAluno((prev) => ({
        ...prev,
        cursosEmAndamento: [
          ...prev.cursosEmAndamento,
          novoCursoAndamento.trim(),
        ],
      }));
      setNovoCursoAndamento('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/alunos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aluno),
      });
      if (res.ok) {
        navigate('/alunos');
      } else {
        alert('Erro ao atualizar aluno');
      }
    } catch {
      alert('Erro na requisição');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Editar Aluno</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['nome', 'cep', 'cidade', 'estado', 'logradouro'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={(aluno as any)[field] || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        ))}

        <div>
          <label className="font-semibold">Cursos em Andamento:</label>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={novoCursoAndamento}
              onChange={(e) => setNovoCursoAndamento(e.target.value)}
              placeholder="Digite o curso"
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => adicionarCurso('andamento')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Adicionar
            </button>
          </div>
          <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
            {Array.isArray(aluno.cursosEmAndamento) &&
              aluno.cursosEmAndamento.map((curso, index) => (
                <li key={index}>{curso}</li>
              ))}
          </ul>
        </div>

        <div>
          <label className="font-semibold">Cursos Concluídos:</label>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={novoCursoConcluido}
              onChange={(e) => setNovoCursoConcluido(e.target.value)}
              placeholder="Digite o curso"
              className="flex-1 p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => adicionarCurso('concluido')}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Adicionar
            </button>
          </div>
          <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
            {Array.isArray(aluno.cursosConcluidos) &&
              aluno.cursosConcluidos.map((curso, index) => (
                <li key={index}>{curso}</li>
              ))}
          </ul>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Salvar Alterações
        </button>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Associação de Cursos</h3>
          <div className="flex gap-4 mb-4">
            <select
              value={cursoSelecionado}
              onChange={(e) => setCursoSelecionado(e.target.value)}
              className="border px-3 py-2 rounded w-1/2"
            >
              <option value="">Selecione um curso</option>
              {cursosDisponiveis.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.nome}
                </option>
              ))}
            </select>

            <select
              value={statusCurso}
              onChange={(e) =>
                setStatusCurso(e.target.value as 'concluido' | 'em_andamento')
              }
              className="border px-3 py-2 rounded w-1/2"
            >
              <option value="em_andamento">Em andamento</option>
              <option value="concluido">Concluído</option>
            </select>
          </div>
          <button
            type="button"
            className="bg-purple-600 text-white py-2 px-4 rounded"
            onClick={() => {
              if (!cursoSelecionado)
                return alert('Selecione um curso para associar');
              setCursosAssociados((prev) => [
                ...prev,
                {
                  id: Number(cursoSelecionado),
                  nome:
                    cursosDisponiveis.find(
                      (c) => c.id === Number(cursoSelecionado),
                    )?.nome || '',
                  status: statusCurso,
                },
              ]);
            }}
          >
            Associar Curso
          </button>

          <ul className="mt-4">
            {cursosAssociados.map((curso, i) => (
              <li key={i}>
                {curso.nome} -{' '}
                {curso.status === 'concluido' ? 'Concluído' : 'Em andamento'}
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default EditarAluno;
