import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import useAuth from './hooks/index.jsx';
import AuthContext from './contexts/index.jsx';
import { Chat } from './pages/chat.jsx';
import { AuthorizationForm } from './pages/form.jsx';
import { NotFound } from './pages/NotFound.jsx';


function App() {
  const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const logIn = () => setLoggedIn(true);
    const logOut = () => {
      localStorage.removeItem('userId');
      setLoggedIn(false);
    }

    return (
      <AuthContext.Provider value={{ logIn, logOut, loggedIn }}>
        {children}
      </AuthContext.Provider>
    )
  }

  const AuthRoute = ({ children }) => {
    const auth = useAuth();
    console.log(localStorage.getItem('userId'))
    return (
      localStorage.getItem('userId') ? children : <Navigate to="/login" />
    )
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={(<AuthRoute><Chat/></AuthRoute>)} />
          <Route path='/login' element={<AuthorizationForm />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
