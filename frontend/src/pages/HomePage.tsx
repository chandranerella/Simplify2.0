// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container-xxl text-center py-5">
      <h1 className="mb-3 fw-bold">Welcome to Simplify 2.0</h1>
      <p className="text-muted mb-4">Manage your profile and job application info in one place.</p>

      <div className="d-flex justify-content-center gap-4">
        <Link to="/personal" className="btn btn-primary px-4 py-2 rounded-pill">
          Personal Info
        </Link>
        <Link to="/profile" className="btn btn-outline-primary px-4 py-2 rounded-pill">
          Profile Info
        </Link>
      </div>
    </div>
  );
};

export default Home;
