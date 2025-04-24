// src/components/Navbar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'Personal', path: '/personal' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark px-4">
      <div className="container-xxl d-flex justify-content-between w-100">
        <h4 className="text-white mb-0">Simplify2.0</h4>
        <div className="d-flex gap-4">
          {navLinks.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link text-white ${
                location.pathname === path ? 'fw-bold text-decoration-underline' : ''
              }`}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
