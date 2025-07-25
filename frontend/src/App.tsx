import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListaAlunos from './pages/ListaAlunos';
import Alunos from './pages/Alunos';
import AdicionarAluno from './pages/adicionarAluno';
import EditarAluno from './pages/EditarAluno'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaAlunos />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/alunos/novo" element={<AdicionarAluno />} />
        <Route path="/alunos/:id/editar" element={<EditarAluno />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

