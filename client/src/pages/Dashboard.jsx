import { useEffect, useMemo, useState } from 'react';
import { LogOut, Pencil, Search, Send, Trash2, X } from 'lucide-react';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';

const emptyForm = {
  title: '',
  category: 'Academics',
  description: '',
  status: 'Pending'
};

const categories = ['Academics', 'Facilities', 'Administration', 'Other'];
const statuses = ['Pending', 'In Review', 'Resolved'];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [grievances, setGrievances] = useState([]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const stats = useMemo(() => {
    return statuses.map((status) => ({
      status,
      count: grievances.filter((item) => item.status === status).length
    }));
  }, [grievances]);

  const fetchGrievances = async (keyword = '') => {
    setLoading(true);
    setError('');

    try {
      const { data } = await api.get('/grievances', {
        params: keyword ? { search: keyword } : {}
      });
      setGrievances(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load grievances.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    try {
      if (editingId) {
        await api.put(`/grievances/${editingId}`, form);
        setMessage('Grievance updated successfully.');
      } else {
        await api.post('/grievances', {
          title: form.title,
          category: form.category,
          description: form.description
        });
        setMessage('Grievance submitted successfully.');
      }

      resetForm();
      await fetchGrievances(search);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save grievance.');
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (grievance) => {
    setEditingId(grievance._id);
    setForm({
      title: grievance.title,
      category: grievance.category,
      description: grievance.description,
      status: grievance.status
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteGrievance = async (id) => {
    const confirmed = window.confirm('Delete this grievance?');
    if (!confirmed) return;

    setError('');
    setMessage('');

    try {
      await api.delete(`/grievances/${id}`);
      setMessage('Grievance deleted successfully.');
      await fetchGrievances(search);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete grievance.');
    }
  };

  const submitSearch = (event) => {
    event.preventDefault();
    fetchGrievances(search);
  };

  return (
    <main className="dashboard-page">
      <header className="topbar">
        <div>
          <p className="eyebrow">Student Grievance Management System</p>
          <h1>Welcome, {user?.name}</h1>
        </div>
        <button className="ghost-button" onClick={logout} type="button">
          <LogOut size={18} />
          Logout
        </button>
      </header>

      <section className="stats-row">
        {stats.map((item) => (
          <div className="stat-box" key={item.status}>
            <span>{item.status}</span>
            <strong>{item.count}</strong>
          </div>
        ))}
      </section>

      <section className="dashboard-grid">
        <form className="grievance-form" onSubmit={handleSubmit}>
          <div className="section-heading">
            <h2>{editingId ? 'Update Grievance' : 'Submit Grievance'}</h2>
            {editingId && (
              <button className="icon-button" onClick={resetForm} type="button" title="Cancel edit">
                <X size={18} />
              </button>
            )}
          </div>

          {message && <div className="alert success">{message}</div>}
          {error && <div className="alert error">{error}</div>}

          <label>
            Title
            <input name="title" value={form.title} onChange={handleChange} required />
          </label>

          <label>
            Category
            <select name="category" value={form.category} onChange={handleChange} required>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>

          {editingId && (
            <label>
              Status
              <select name="status" value={form.status} onChange={handleChange} required>
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
          )}

          <label>
            Description
            <textarea name="description" rows="7" value={form.description} onChange={handleChange} required />
          </label>

          <button type="submit" disabled={saving}>
            <Send size={18} />
            {saving ? 'Saving...' : editingId ? 'Update' : 'Submit'}
          </button>
        </form>

        <section className="list-panel">
          <div className="section-heading">
            <h2>My Grievances</h2>
          </div>

          <form className="search-box" onSubmit={submitSearch}>
            <Search size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title, category, status..."
            />
            <button type="submit">Search</button>
          </form>

          <div className="grievance-list">
            {loading && <p className="muted">Loading grievances...</p>}
            {!loading && grievances.length === 0 && <p className="muted">No grievances found.</p>}

            {grievances.map((grievance) => (
              <article className="grievance-card" key={grievance._id}>
                <div>
                  <div className="card-top">
                    <h3>{grievance.title}</h3>
                    <span className={`status status-${grievance.status.toLowerCase().replaceAll(' ', '-')}`}>
                      {grievance.status}
                    </span>
                  </div>
                  <p>{grievance.description}</p>
                  <div className="meta">
                    <span>{grievance.category}</span>
                    <span>{new Date(grievance.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="card-actions">
                  <button className="icon-button" onClick={() => startEdit(grievance)} type="button" title="Edit">
                    <Pencil size={17} />
                  </button>
                  <button
                    className="icon-button danger"
                    onClick={() => deleteGrievance(grievance._id)}
                    type="button"
                    title="Delete"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
