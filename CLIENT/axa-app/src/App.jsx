import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Login_page, Register_page, Dashboard_page , Error_page , Home_page } from './pages';
import { Register_success, Register_error , Login_error } from './components/index';

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    setRegisterSuccess(true);
    setTimeout(() => {
      setRegisterSuccess(false);
    }, 10000);
  };

  const handleRegisterError = () => {
    setRegisterError(true);
    setTimeout(() => {
      setRegisterError(false);
    }, 10000);
  };

  const handleLoginError = () => {
    setLoginError(true);
    setTimeout(() => {
      setLoginError(false);
    }, 10000);
  };

  const handleUser = (userData) => {
    setUser(userData);
    navigate('/dashboard');
  };

  const toggleForm = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="main">
      {registerSuccess && <Register_success />}
      {registerError && <Register_error />}
      {loginError && <Login_error />}
      <Routes>
        <Route path="/" element={<Home_page />} />
        <Route
          path="/register&login"
          element={
            showRegister ? (
              <Register_page
                switchLogin={toggleForm}
                registerSuccess={handleRegisterSuccess}
                registerError={handleRegisterError}
              />
            ) : (
              <Login_page switchRegister={toggleForm} setUser={handleUser} loginError={handleLoginError} />
            )
          }
        />
        <Route path="/dashboard" element={<Dashboard_page userData={user} />} />
        <Route path="*" element={<Error_page />} />
      </Routes>
    </div>
  );
}

export default App;
