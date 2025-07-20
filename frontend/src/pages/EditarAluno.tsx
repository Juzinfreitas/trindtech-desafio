import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../services/api';
import ListaAlunos from './ListaAlunos';
import { Lixeira } from '../components/lixeira';

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
    sobrenome: '',
    email: '',
    dataNascimento: '',
    cpf: '',
    genero: '',
    cep: '',
    cidade: '',
    estado: '',
    logradouro: '',
    numero: '',
    bairro: '',
    complemento: '',
    pais: '',
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
    <div className="max-w-4x2 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-6 bg-primary p-4" >
        <div className="flex gap-4 items-center">
          <img src="/Union.svg" alt="Ícone" className="w-8 h-8" />
          <h2 className="text-2xl font-bold text-white">Gerenciador de Alunos | </h2>
          <span className='flex items-center text-2xl text-white'>{aluno.nome} {aluno.sobrenome}</span>
        </div>
        <Lixeira />
      </div>
      <div className="flex items-center gap-4 mb-8">
        <img src="/Union.svg" alt="" className="w-8 h-8" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-8  p-6">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome*</label>
              <input
                type="text"
                name="nome"
                value={aluno.nome}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
              <input
                type="text"
                name="sobrenome"
                value={aluno.sobrenome}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Data de nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={aluno.dataNascimento}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CPF</label>
              <input
                type="text"
                name="cpf"
                value={aluno.cpf}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gênero</label>
              <input
                type="text"
                name="genero"
                value={aluno.genero}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email*</label>
              <input
                type="email"
                name="email"
                value={aluno.email}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Localização</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">CEP</label>
              <input
                type="text"
                name="cep"
                value={aluno.cep}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">País*</label>
              <input
                type="text"
                name="pais"
                value={aluno.pais}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rua</label>
              <input
                type="text"
                name="logradouro"
                value={aluno.logradouro}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bairro</label>
              <input
                type="text"
                name="bairro"
                value={aluno.bairro}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Número*</label>
              <input
                type="text"
                name="numero"
                value={aluno.numero}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Complemento</label>
              <input
                type="text"
                name="complemento"
                value={aluno.complemento}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cidade</label>
              <input
                type="text"
                name="cidade"
                value={aluno.cidade}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <input
                type="text"
                name="estado"
                value={aluno.estado}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Cursos</h3>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white rounded-md px-6 py-2 text-lg hover:bg-blue-700"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarAluno;
