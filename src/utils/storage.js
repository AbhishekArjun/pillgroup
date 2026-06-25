import { db, storage } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const CHILDREN_COLLECTION = 'children';

export const getChildrenData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, CHILDREN_COLLECTION));
    const children = [];
    querySnapshot.forEach((doc) => {
      children.push({ id: doc.id, ...doc.data() });
    });
    return children;
  } catch (err) {
    console.error("Failed to fetch children from Firebase:", err);
    return [];
  }
};

export const addChild = async (formData) => {
  try {
    const childData = {
      name: formData.get('name'),
      age: formData.get('age'),
      location: formData.get('location'),
      need: formData.get('need'),
      status: formData.get('status'),
      imageUrl: null
    };

    const imageFile = formData.get('image');
    if (imageFile && imageFile instanceof File) {
      const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      childData.imageUrl = downloadURL;
      childData.storagePath = snapshot.ref.fullPath;
    }

    const docRef = await addDoc(collection(db, CHILDREN_COLLECTION), childData);
    return { id: docRef.id, ...childData };
  } catch (err) {
    console.error("Failed to add child to Firebase:", err);
    throw err;
  }
};

export const updateChild = async (id, formData) => {
  try {
    const childRef = doc(db, CHILDREN_COLLECTION, id);
    const updates = {};
    
    // Extract fields from formData if they exist
    ['name', 'age', 'location', 'need', 'status'].forEach(field => {
      if (formData.has(field)) {
        updates[field] = formData.get(field);
      }
    });

    const imageFile = formData.get('image');
    if (imageFile && imageFile instanceof File) {
      // Assuming we don't delete the old image here to keep it simple, 
      // but in a real app we'd fetch the old doc and delete its storage object
      const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      updates.imageUrl = downloadURL;
      updates.storagePath = snapshot.ref.fullPath;
    }

    await updateDoc(childRef, updates);
    return { id, ...updates };
  } catch (err) {
    console.error("Failed to update child in Firebase:", err);
    throw err;
  }
};

export const deleteChild = async (id, storagePath = null) => {
  try {
    const childRef = doc(db, CHILDREN_COLLECTION, id);
    await deleteDoc(childRef);

    if (storagePath) {
      const imageRef = ref(storage, storagePath);
      await deleteObject(imageRef).catch(e => console.log("Failed to delete image from storage", e));
    }
    
    return { message: "Deleted successfully" };
  } catch (err) {
    console.error("Failed to delete child from Firebase:", err);
    throw err;
  }
};

export const updateChildStatus = async (id, newStatus) => {
  try {
    const childRef = doc(db, CHILDREN_COLLECTION, id);
    await updateDoc(childRef, { status: newStatus });
    return { id, status: newStatus };
  } catch (err) {
    console.error("Failed to update child status in Firebase:", err);
    throw err;
  }
};
