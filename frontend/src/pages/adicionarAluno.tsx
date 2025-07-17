import React, { useState } from 'react';

interface AlunoForm {
  nome: string;
  cep: string;
  cidade: string;
  estado: string;
  logradouro: string;
}

export default function AdicionarAluno() {
  const [form, setForm] = useState<AlunoForm>({
    nome: '',
    cep: '',
    cidade: '',
    estado: '',
    logradouro: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Atualiza o estado do formulário
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  // Busca endereço pelo CEP usando ViaCEP
  async function buscarEnderecoPorCep(cep: string) {
    if (cep.length !== 8) return; // ViaCEP usa CEP sem hífen, 8 dígitos
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setForm(prev => ({
          ...prev,
          cidade: data.localidade,
          estado: data.uf,
          logradouro: data.logradouro,
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('http://localhost:3000/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage('Aluno cadastrado com sucesso!');
        setForm({ nome: '', cep: '', cidade: '', estado: '', logradouro: '' });
      } else {
        const err = await res.json();
        setMessage('Erro: ' + (err.message || 'Não foi possível cadastrar'));
      }
    } catch (error) {
      setMessage('Erro na comunicação com o servidor');
    }

    setLoading(false);
  }

  // Busca endereço ao digitar CEP (removendo não dígitos)
  function handleCepChange(e: React.ChangeEvent<HTMLInputElement>) {
    const cepLimpo = e.target.value.replace(/\D/g, '');
    setForm(prev => ({ ...prev, cep: cepLimpo }));

    if (cepLimpo.length === 8) {
      buscarEnderecoPorCep(cepLimpo);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-8">
      <h2 className="text-2xl font-semibold mb-4">Adicionar Aluno</h2>
      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            message.startsWith('Erro') ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="nome">Nome</label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={form.nome}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="cep">CEP</label>
          <input
            id="cep"
            name="cep"
            type="text"
            value={form.cep}
            onChange={handleCepChange}
            maxLength={8}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Somente números, ex: 12345678"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="cidade">Cidade</label>
          <input
            id="cidade"
            name="cidade"
            type="text"
            value={form.cidade}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="estado">Estado</label>
          <input
            id="estado"
            name="estado"
            type="text"
            value={form.estado}
            onChange={handleChange}
            maxLength={2}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Ex: SP"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="logradouro">Logradouro</label>
          <input
            id="logradouro"
            name="logradouro"
            type="text"
            value={form.logradouro}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
