export const getAuthToken = () => localStorage.getItem('adminToken');
export const setAuthToken = (token) => localStorage.setItem('adminToken', token);
export const clearAuthToken = () => localStorage.removeItem('adminToken');

const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const loginAdmin = async (email, password) => {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Login failed');
    }
    const data = await res.json();
    setAuthToken(data.token);
    return true;
  } catch (err) {
    console.error("Login Error:", err);
    throw err;
  }
};

export const getChildrenData = async () => {
  try {
    const res = await fetch('/api/children');
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch children:", err);
    return [];
  }
};

export const addChild = async (formData) => {
  try {
    const res = await fetch('/api/children', {
      method: 'POST',
      headers: { ...getAuthHeaders() }, // Don't set Content-Type to application/json, browser sets it to multipart/form-data with boundary
      body: formData // This should be a FormData object
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to add child');
    }
    return await res.json();
  } catch (err) {
    console.error("Failed to add child:", err);
    throw err;
  }
};

export const updateChild = async (id, formData) => {
  try {
    const res = await fetch(`/api/children/${id}`, {
      method: 'PUT',
      headers: { ...getAuthHeaders() },
      body: formData // This should be a FormData object
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update child');
    }
    return await res.json();
  } catch (err) {
    console.error("Failed to update child:", err);
    throw err;
  }
};

export const deleteChild = async (id) => {
  try {
    const res = await fetch(`/api/children/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() }
    });
    if (!res.ok) throw new Error('Failed to delete child');
    return await res.json();
  } catch (err) {
    console.error("Failed to delete child:", err);
    throw err;
  }
};

// For quick status updates (like from the public checkout form, if we allow that. Usually protected, but for demo we can use a mock token or let it fail if unauthorized. Wait, we protected PUT /api/children/:id. We might need a public route or use admin token.)
// For now, let's keep it but it will need auth.
export const updateChildStatus = async (id, newStatus) => {
  // Creating a FormData since updateChild expects it
  const formData = new FormData();
  formData.append('status', newStatus);
  return await updateChild(id, formData);
};
