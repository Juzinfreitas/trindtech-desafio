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
    <div className="max-w-4x2 mx-autobg-white shadow-md">
  <div className="flex gap-4 items-center mb-6 bg-primary p-4">
    <img src="/Union.svg" alt="Ícone" className="w-8 h-8" />
    <h2 className="text-2xl font-bold text-white">Gerenciador de Alunos</h2>
  </div>
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded p-6">
  <h2 className="text-2xl font-bold text-primary mb-6">Editar Aluno</h2>  
    </div>
  </div>
  );
};

export default EditarAluno;
