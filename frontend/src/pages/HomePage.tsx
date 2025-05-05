import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from '../components/Login';
import Loggedin from '../components/LoggedIn';// hypothetical component


const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if session cookie is valid
    axios.get('http://localhost:8080/api/check-session', { withCredentials: true })
      .then(res => {
        if (res.data.loggedIn) setIsLoggedIn(true);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  return (
    <div className="container-xxl text-center py-5">
      <h1 className="mb-3 fw-bold">Welcome to Simplify 2.0</h1>
      <p className="text-muted mb-4">Manage your profile and job application info in one place.</p>
      {isLoggedIn ? <Loggedin /> : <Login onLoginSuccess={() => setIsLoggedIn(true)} />}
    </div>
  );
};

export default Home;
