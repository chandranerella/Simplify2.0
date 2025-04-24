// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './pages/HomePage';

import PersonalInfo from './pages/PersonalInfoPage'; // if created

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personal" element={<PersonalInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
