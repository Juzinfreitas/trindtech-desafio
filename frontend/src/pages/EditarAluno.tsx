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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

        // Verifica se os dados do aluno estão completos
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
   <div className="max-w-2xl mx-auto bg-white shadow-md rounded p-6">
  <h2 className="text-2xl font-bold text-primary mb-6">Editar Aluno</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input
          type="text"
          value={aluno.nome}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
    </div>
  </form>
</div>
  );
};

export default EditarAluno;
