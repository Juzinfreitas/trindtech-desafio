import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../services/api';
import { Lixeira } from '../components/lixeira';
import { IconeConcluido } from '../components/icone_concluido';
import { IconeCurso } from '../components/icone_curso';
import { Seta } from '../components/seta';
import { CruzCurso } from '../components/cruz_curso';

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
    cursosConcluidos: [] as { nome: string; dataConclusao: string }[],
    cursosEmAndamento: [] as { nome: string; dataConclusao: string }[],
  });

  const [novoCursoConcluido, setNovoCursoConcluido] = useState('');
  const [dataCursoConcluido, setDataCursoConcluido] = useState('');
  const [novoCursoAndamento, setNovoCursoAndamento] = useState('');
  const [dataCursoAndamento, setDataCursoAndamento] = useState('');

  useEffect(() => {
    if (!id) {
      alert('ID do aluno não encontrado');
      navigate('/alunos');
      return;
    }
    (async () => {
      try {
        const alunoRes = await fetch(`${API_BASE_URL}/alunos/${id}`);
        if (!alunoRes.ok) throw new Error('Erro ao buscar aluno');
        const alunoData = await alunoRes.json();
        setAluno({
          ...alunoData,
          cursosConcluidos: alunoData.cursosConcluidos || [],
          cursosEmAndamento: alunoData.cursosEmAndamento || [],
        });
      } catch {
        alert('Erro ao carregar dados do aluno');
      }
    })();
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAluno((prev) => ({ ...prev, [name]: value }));
  };

const adicionarCurso = async (tipo: 'concluido' | 'andamento') => {
  let nome = '';
  let dataConclusao = '';

  if (tipo === 'concluido') {
    if (!novoCursoConcluido.trim() || !dataCursoConcluido.trim()) return;
    nome = novoCursoConcluido.trim();
    dataConclusao = dataCursoConcluido.trim();
  } else if (tipo === 'andamento') {
    if (!novoCursoAndamento.trim() || !dataCursoAndamento.trim()) return;
    nome = novoCursoAndamento.trim();
    dataConclusao = dataCursoAndamento.trim();
  } else {
    return;
  }
  
  const cursoRes = await fetch(`${API_BASE_URL}/cursos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome }), 
  });

  if (!cursoRes.ok) {
    alert('Erro ao criar curso');
    return;
  }

  const cursoCriado = await cursoRes.json();

  const vinculoRes = await fetch(`${API_BASE_URL}/alunos/${id}/vincular-curso`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cursoId: cursoCriado.id }),
  });

  if (!vinculoRes.ok) {
    alert('Erro ao vincular curso ao aluno');
    return;
  }


  const fetchData = async () => {
  if (!id) return;
  try {
    const alunoRes = await fetch(`${API_BASE_URL}/alunos/${id}`);
    if (!alunoRes.ok) throw new Error('Erro ao buscar aluno');
    const alunoData = await alunoRes.json();
    setAluno(alunoData);
  } catch {
    alert('Erro ao carregar dados do aluno');
  }
};
  await fetchData();

  if (tipo === 'concluido') {
    setNovoCursoConcluido('');
    setDataCursoConcluido('');
  } else {
    setNovoCursoAndamento('');
    setDataCursoAndamento('');
  }
  navigate(`/`)
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/alunos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...aluno,
          cursosConcluidos: aluno.cursosConcluidos,
          cursosEmAndamento: aluno.cursosEmAndamento,
        }),
      });
      if (res.ok) {
        navigate('/');
      } else {
        alert('Erro ao atualizar aluno');
      }
    } catch {
      alert('Erro na requisição');
    }
  };

  const deletarAluno = async () => {
    if (!id) return;
    if (!window.confirm('Tem certeza que deseja deletar este aluno?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/alunos/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        navigate('/alunos');
      } else {
        alert('Erro ao deletar aluno');
      }
    } catch {
      alert('Erro na requisição');
    }
  };

  return (
    <div className="max-w-4x2 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-6 bg-primary p-4">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => navigate('/')}
            className="mr-2 hover:opacity-80"
            title="Voltar para lista"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Seta />
          </button>
          <img src="/Union.svg" alt="Ícone" className="w-8 h-8" />
          <h2 className="text-2xl font-bold text-white">Gerenciador de Alunos | </h2>
          <span className="flex items-center text-2xl text-white">{aluno.nome} {aluno.sobrenome}</span>
        </div>
        <Lixeira onClick={deletarAluno} />
      </div>
      <form onSubmit={handleSubmit} className="space-y-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome*</label>
            <input type="text" name="nome" value={aluno.nome} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
            <input type="text" name="sobrenome" value={aluno.sobrenome} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data de nascimento</label>
            <input type="date" name="dataNascimento" value={aluno.dataNascimento} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CPF</label>
            <input type="text" name="cpf" value={aluno.cpf} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gênero</label>
            <input type="text" name="genero" value={aluno.genero} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email*</label>
            <input type="email" name="email" value={aluno.email} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">CEP</label>
            <input type="text" name="cep" value={aluno.cep} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">País*</label>
            <input type="text" name="pais" value={aluno.pais} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rua</label>
            <input type="text" name="logradouro" value={aluno.logradouro} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bairro</label>
            <input type="text" name="bairro" value={aluno.bairro} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Número*</label>
            <input type="text" name="numero" value={aluno.numero} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Complemento</label>
            <input type="text" name="complemento" value={aluno.complemento} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cidade</label>
            <input type="text" name="cidade" value={aluno.cidade} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <input type="text" name="estado" value={aluno.estado} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Cursos</h3>
          <div className="mb-4">
            <label className="block font-medium">Cursos Concluídos</label>
            <div className="flex flex-row items-end gap-2 mb-2 justify-between">
              <div className="flex flex-col flex-1">
                <input type="text" value={novoCursoConcluido} onChange={e => setNovoCursoConcluido(e.target.value)} className="border rounded px-2 py-1" placeholder="Nome do curso" />
              </div>
              <div className="flex flex-col items-end">
                <label className="block text-xs font-medium mb-1">Data de conclusão</label>
                <input type="date" value={dataCursoConcluido} onChange={e => setDataCursoConcluido(e.target.value)} className="border rounded px-2 py-1" placeholder="Data de conclusão" />
              </div>
              <button type="button" onClick={() => adicionarCurso('concluido')} className="self-end">
                <IconeConcluido />
              </button>
            </div>
            <ul>
              {aluno.cursosConcluidos.map((curso, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {curso.nome} - {curso.dataConclusao}
                  <button
                    type="button"
                    onClick={() =>
                      setAluno(prev => ({
                        ...prev,
                        cursosConcluidos: prev.cursosConcluidos.filter((_, i) => i !== idx),
                      }))
                    }
                    className="text-red-500"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <label className="block font-medium">Cursos em Andamento</label>
            <div className="flex flex-row items-end gap-2 mb-2 justify-between">
              <div className="flex flex-col flex-1">
                <input type="text" value={novoCursoAndamento} onChange={e => setNovoCursoAndamento(e.target.value)} className="border rounded px-2 py-1" placeholder="Nome do curso" />
              </div>
              <div className="flex flex-col items-end">
                <label className="block text-xs font-medium mb-1">Data de conclusão</label>
                <input type="date" value={dataCursoAndamento} onChange={e => setDataCursoAndamento(e.target.value)} className="border rounded px-2 py-1" placeholder="Data de conclusão" />
              </div>
              <button type="button" onClick={() => adicionarCurso('andamento')} className="self-end relative w-8 h-8 flex items-center justify-center">
                <IconeCurso />
              <span className="absolute inset-0 flex items-center justify-center">
                <CruzCurso />
              </span>
              </button>
            </div>
            <ul>
              {aluno.cursosEmAndamento.map((curso, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {curso.nome} - {curso.dataConclusao}
                  <button
                    type="button"
                    onClick={() =>
                      setAluno(prev => ({
                        ...prev,
                        cursosEmAndamento: prev.cursosEmAndamento.filter((_, i) => i !== idx),
                      }))
                    }
                    className="text-red-500"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button type="submit" className="bg-primary text-white px-6 py-2 rounded font-bold mt-4">
          Salvar alterações
        </button>
      </form>
    </div>
  );
};

export default EditarAluno;