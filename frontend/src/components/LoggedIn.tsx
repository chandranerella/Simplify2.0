// src/components/DashboardOptions.tsx

import { Link } from 'react-router-dom';

const DashboardOptions: React.FC = () => {
  return (
    <div className="d-flex flex-column align-items-center gap-4">
      <Link to="/personal" className="btn btn-primary px-4 py-2 rounded-pill">
        Personal Info
      </Link>
      <Link to="/profile" className="btn btn-outline-primary px-4 py-2 rounded-pill">
        Profile Info
      </Link>
    </div>
  );
};

export default DashboardOptions;
