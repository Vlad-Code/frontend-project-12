import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Chat } from './pages/chat.jsx';
import { AuthorizationForm } from './pages/form.jsx';
import { NotFound } from './pages/NotFound.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/login' element={<AuthorizationForm />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
