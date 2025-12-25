// src/App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE = 'http://localhost:8080/api/employees';

function AdminApp() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    favorites: ['', '', '', '', ''],
  });
  const [editing, setEditing] = useState(false);

  const loadEmployees = async () => {
    const res = await axios.get(API_BASE);
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleFavoriteChange = (index, value) => {
    const favs = [...form.favorites];
    favs[index] = value;
    setForm(prev => ({ ...prev, favorites: favs }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      name: form.name,
      favorites: form.favorites.filter(f => f && f.trim() !== ''),
    };

    if (editing && form.id != null) {
      await axios.put(`${API_BASE}/${form.id}`, payload);
    } else {
      await axios.post(API_BASE, payload);
    }

    setForm({ id: null, name: '', favorites: ['', '', '', '', ''] });
    setEditing(false);
    await loadEmployees();
  };

  const handleEdit = emp => {
    const favs = [...emp.favorites];
    while (favs.length < 5) favs.push('');
    setForm({ id: emp.id, name: emp.name, favorites: favs.slice(0, 5) });
    setEditing(true);
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this employee?')) return;
    await axios.delete(`${API_BASE}/${id}`);
    await loadEmployees();
  };

  return (
    <div className="app">
      <div className="overlay">
        <h1>🎅 Secret Santa Employee Admin</h1>
        <p>Manage employees and their favorite gifts here.</p>

        <form className="form" onSubmit={handleSubmit}>
          <h2>{editing ? 'Edit Employee' : 'Add Employee'}</h2>
          <input
            type="text"
            placeholder="Employee name"
            value={form.name}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
            required
          />

          <h3>Favorites (max 5)</h3>
          {form.favorites.map((fav, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Favorite ${idx + 1}`}
              value={fav}
              onChange={e => handleFavoriteChange(idx, e.target.value)}
            />
          ))}

          <button type="submit">{editing ? 'Update' : 'Create'}</button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setForm({ id: null, name: '', favorites: ['', '', '', '', ''] });
              }}
            >
              Cancel
            </button>
          )}
        </form>

        <h2>Employees</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th> {/* favorites hidden from list */}
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>
                  <button onClick={() => handleEdit(emp)}>Edit</button>
                  <button onClick={() => handleDelete(emp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminApp;
