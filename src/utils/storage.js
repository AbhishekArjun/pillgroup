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

export const saveChildrenData = async (data) => {
  // If data is an array, we might be trying to save multiple (not optimal for REST, but let's handle single saves in the components)
  // This function is kept for backwards compatibility but we will primarily use specific POST/PUT endpoints.
  console.warn("saveChildrenData is deprecated. Use specific add/update endpoints instead.");
};

export const addChild = async (child) => {
  try {
    const res = await fetch('/api/children', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(child)
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to add child:", err);
  }
};

export const updateChild = async (id, childData) => {
  try {
    const res = await fetch(`/api/children/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(childData)
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to update child:", err);
  }
};

export const deleteChild = async (id) => {
  try {
    const res = await fetch(`/api/children/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to delete child:", err);
  }
};

export const updateChildStatus = async (id, newStatus) => {
  return await updateChild(id, { status: newStatus });
};
