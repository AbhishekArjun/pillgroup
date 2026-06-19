import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getChildrenData, saveChildrenData } from '../utils/storage';

const AdminDashboard = () => {
  const [childrenData, setChildrenData] = useState([]);

  useEffect(() => {
    setChildrenData(getChildrenData());
  }, []);

  // Sync state to local storage whenever it changes
  useEffect(() => {
    if (childrenData.length > 0) {
      saveChildrenData(childrenData);
    }
  }, [childrenData]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChild, setEditingChild] = useState(null); // null means "Add New", object means "Edit"
  
  // Form State
  const [formData, setFormData] = useState({ name: '', age: '', location: '', need: '', status: 'Awaiting Sponsor' });

  // Calculated Stats
  const totalSponsored = childrenData.filter(c => c.status === 'Sponsored').length;
  const awaitingSponsors = childrenData.filter(c => c.status === 'Awaiting Sponsor').length;
  // A mock funds calculation (e.g. $500 per sponsored child)
  const totalFunds = totalSponsored * 500;

  // Handlers
  const handleOpenModal = (child = null) => {
    if (child) {
      setEditingChild(child);
      setFormData(child);
    } else {
      setEditingChild(null);
      setFormData({ name: '', age: '', location: '', need: '', status: 'Awaiting Sponsor' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingChild(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingChild) {
      // Update existing
      setChildrenData(prev => prev.map(child => child.id === editingChild.id ? { ...formData, id: editingChild.id } : child));
    } else {
      // Add new
      const newId = childrenData.length > 0 ? Math.max(...childrenData.map(c => c.id)) + 1 : 1;
      setChildrenData(prev => [...prev, { ...formData, id: newId }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      setChildrenData(prev => prev.filter(c => c.id !== id));
      handleCloseModal();
    }
  };

  return (
    <div className="admin-body">
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2 className="logo">NGO.Admin</h2>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li className="active"><a href="#">Dashboard</a></li>
              <li><a href="#">Children Profiles</a></li>
              <li><a href="#">Sponsors</a></li>
              <li><a href="#">Donations</a></li>
              <li><a href="#">Settings</a></li>
            </ul>
          </nav>
          <div className="sidebar-footer">
            <Link to="/" className="logout-btn">Back to Website</Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Topbar */}
          <header className="topbar">
            <div className="search-bar">
              <input type="text" placeholder="Search children, sponsors..." />
            </div>
            <div className="user-profile">
              <div className="avatar">A</div>
              <span>Admin User</span>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="dashboard-inner">
            <h1 className="page-title">Overview</h1>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Sponsored</h3>
                <p className="stat-value">{totalSponsored}</p>
                <span className="stat-trend positive">Actively supported</span>
              </div>
              <div className="stat-card">
                <h3>Awaiting Sponsors</h3>
                <p className="stat-value">{awaitingSponsors}</p>
                <span className="stat-trend neutral">Needs urgent attention</span>
              </div>
              <div className="stat-card">
                <h3>Total Funds Raised</h3>
                <p className="stat-value">${totalFunds.toLocaleString()}</p>
                <span className="stat-trend positive">Based on sponsorships</span>
              </div>
            </div>

            {/* Table Section */}
            <div className="table-section">
              <div className="table-header">
                <h2>Children Needing Sponsorship</h2>
                <button className="btn btn-primary" onClick={() => handleOpenModal()}>Add New Profile</button>
              </div>

              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Child Name</th>
                      <th>Age</th>
                      <th>Location</th>
                      <th>Education Need</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {childrenData.map(child => (
                      <tr key={child.id}>
                        <td><strong>{child.name}</strong></td>
                        <td>{child.age}</td>
                        <td>{child.location}</td>
                        <td>{child.need}</td>
                        <td>
                          <span className={`status-badge ${child.status === 'Sponsored' ? 'status-sponsored' : 'status-awaiting'}`}>
                            {child.status}
                          </span>
                        </td>
                        <td>
                          <button className="action-btn" onClick={() => handleOpenModal(child)}>Edit Details</button>
                        </td>
                      </tr>
                    ))}
                    {childrenData.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{textAlign: 'center', padding: '30px'}}>No profiles found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Overlay */}
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>{editingChild ? 'Edit Profile' : 'Add New Profile'}</h2>
            <button className="close-btn" onClick={handleCloseModal}>&times;</button>
          </div>
          
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Child Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div style={{display: 'flex', gap: '20px'}}>
              <div className="form-group" style={{flex: 1}}>
                <label>Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required />
              </div>
              <div className="form-group" style={{flex: 1}}>
                <label>Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label>Education Need</label>
              <input type="text" name="need" value={formData.need} onChange={handleChange} placeholder="e.g. Primary School Tuition" required />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Awaiting Sponsor">Awaiting Sponsor</option>
                <option value="Sponsored">Sponsored</option>
              </select>
            </div>

            <div className="modal-actions">
              {editingChild && (
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(editingChild.id)} style={{marginRight: 'auto'}}>
                  Delete Profile
                </button>
              )}
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
              <button type="submit" className="btn btn-primary">{editingChild ? 'Save Changes' : 'Add Profile'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
