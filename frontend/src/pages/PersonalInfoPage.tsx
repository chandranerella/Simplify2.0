import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PersonalInfo {
  name: string;
  location: string;
  birthday: string;
  ethnicity: string;
  gender: string;
}

const PersonalInfoPage: React.FC = () => {
  const [info, setInfo] = useState<PersonalInfo | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<PersonalInfo>({
    name: '',
    location: '',
    birthday: '',
    ethnicity: '',
    gender: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/personal-info', { withCredentials: true })
      .then((res) => {
        setInfo(res.data);
        setFormData(res.data);
      })
      .catch((err) => console.log('No personal info yet'));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/personal-info', formData, { withCredentials: true });
      setInfo(formData);
      setEditMode(false);
    } catch (err) {
      console.error('Error submitting info:', err);
    }
  };

  if (editMode || !info) {
    return (
      <div className="container mt-4">
        <h2>Personal Information</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          {Object.keys(formData).map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                className="form-control"
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
              />
            </div>
          ))}
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Personal Information</h2>
      <ul className="list-group mt-3">
        {Object.entries(info).map(([key, value]) => (
          <li className="list-group-item" key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
          </li>
        ))}
      </ul>
      <button className="btn btn-secondary mt-3" onClick={() => setEditMode(true)}>
        Edit
      </button>
    </div>
  );
};

export default PersonalInfoPage;
