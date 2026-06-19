const STORAGE_KEY = 'pilli_foundation_children_v1';

const defaultChildren = [
  { id: 1, name: "Aisha M.", age: 8, location: "Nairobi, Kenya", need: "Primary School Tuition", status: "Awaiting Sponsor" },
  { id: 2, name: "Rahul S.", age: 10, location: "Mumbai, India", need: "Books & Uniform", status: "Sponsored" },
  { id: 3, name: "Elena G.", age: 7, location: "Bogota, Colombia", need: "Primary School Tuition", status: "Awaiting Sponsor" },
  { id: 4, name: "Samuel O.", age: 12, location: "Lagos, Nigeria", need: "High School Prep", status: "Awaiting Sponsor" },
  { id: 5, name: "Mai N.", age: 9, location: "Hanoi, Vietnam", need: "After-school Program", status: "Sponsored" },
  { id: 6, name: "David T.", age: 6, location: "Accra, Ghana", need: "Kindergarten Support", status: "Awaiting Sponsor" }
];

export const getChildrenData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  }
  // Initialize if empty
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultChildren));
  return defaultChildren;
};

export const saveChildrenData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const updateChildStatus = (id, newStatus) => {
  const currentData = getChildrenData();
  const updatedData = currentData.map(child => 
    child.id === id ? { ...child, status: newStatus } : child
  );
  saveChildrenData(updatedData);
  return updatedData;
};
