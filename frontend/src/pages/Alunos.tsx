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
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/alunos')
      .then((res) => res.json())
      .then((data) => {
        console.log('Dados recebidos:', data); 
        setAlunos(data.rows);
      })
      .catch((err) => console.error('Erro ao buscar alunos:', err));
  }, []);

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
    </div>
  );
}
