import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:8080/api/check-session', { withCredentials: true })
      .then(res => {
        if (res.data.loggedIn) setIsLoggedIn(true);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link to="/" className="navbar-brand fw-bold text-white">
        Simplify 2.0
      </Link>

      <div className="ms-auto d-flex gap-4">
        {isLoggedIn && (
          <>
            <Link
              to="/personal"
              className={`nav-link text-white ${location.pathname === '/personal' ? 'fw-bold text-decoration-underline' : ''}`}
            >
              Personal
            </Link>
            <Link
              to="/profile"
              className={`nav-link text-white ${location.pathname === '/profile' ? 'fw-bold text-decoration-underline' : ''}`}
            >
              Profile
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
