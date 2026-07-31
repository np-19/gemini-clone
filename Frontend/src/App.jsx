import { useState, useEffect } from 'react';
import { apiFetch } from './helper/apiFetch';
import { apiUrl } from './helper/apiFetch';
import { clearAccessToken } from './helper/authToken';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import './App.css';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Main from './components/layout/Main';
import Home from './components/sections/Home';
import Chat from './components/sections/Chat';

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  function menu() {
    setIsCollapsed(prevState => !prevState);

  }
  let [user, setUser] = useState(null);
  const handleLogout = async () => {
    try {
      await fetch(apiUrl('/api/auth/logout'), { method: 'POST', credentials: 'include' });
    } finally {
      clearAccessToken();
      setUser(null);
    }
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const userRes = await apiFetch('/api/auth/user');
        if (!userRes.ok) throw new Error('Not logged in');
        const userData = await userRes.json();
        setUser(userData);
        console.log(userData);
        
        
      } catch (err) {
        console.log(err.message);
        setUser(null);
        
      }
    }
    fetchUser();

  }, []);


  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/app" />} />
          <Route path="/app" element={<Main user={user} onLogout={handleLogout} isCollapsed={isCollapsed} menu={menu} />}>
            <Route index element={<Home user={user} />} />
            <Route path=":id" element={<Chat />} />
          </Route>
          <Route path="/app/:id" element={<Main user={user} onLogout={handleLogout} isCollapsed={isCollapsed} menu={menu} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />}  /> 
        </Routes>
    </BrowserRouter>
  );
}

export default App;
