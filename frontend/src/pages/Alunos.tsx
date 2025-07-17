import { useEffect, useState } from 'react';

interface Aluno {
  id: number;
  nome: string;
  cep: string;
  estado: string;
  cidade: string;
  logradouro: string;
  createdAt: string;
  updatedAt: string;
}

export default function Alunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/alunos')
      .then((res) => res.json())
      .then((data) => {
        console.log('Dados recebidos:', data); // debug
        setAlunos(data.rows);
      })
      .catch((err) => console.error('Erro ao buscar alunos:', err));
  }, []);

  return (
    <div className="p-4">
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
