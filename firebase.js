// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1zYjyBB3EZLiB2FRhN8yuMuEQGe5j5vw",
  authDomain: "innovationlab-2a7bf.firebaseapp.com",
  projectId: "innovationlab-2a7bf",
  storageBucket: "innovationlab-2a7bf.firebasestorage.app",
  messagingSenderId: "344321204065",
  appId: "1:344321204065:web:5b4bf54aeadc0d06546f20",
  measurementId: "G-HY7YT6K7H9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Function to save customer data to Firestore
export async function saveCustomerData(customerData) {
  try {
    const docRef = await addDoc(collection(db, "customers"), {
      email: customerData.email,
      organizationSize: customerData.organizationSize,
      phoneNumber: customerData.phoneNumber,
      timestamp: serverTimestamp(),
      source: "website_form"
    });
    console.log("Customer data saved with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving customer data: ", error);
    return { success: false, error: error.message };
  }
}

// Export the db instance for use in other files
export { db };