import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase"; // Ensure this path points to your Firebase configuration

export async function GetDesignations(req) {
  
 
  
  try {
    // Get all documents in the 'designations' collection
    const querySnapshot = await getDocs(collection(db, "designations"));

    // Map over documents to extract data
    const designations = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      // Convert any Timestamp fields to ISO strings (e.g., 'createdAt')
      if (data.createdAt && data.createdAt.toDate) {
        data.createdAt = data.createdAt.toDate().toISOString();  // Convert Timestamp to ISO string
      }
      return {
        id: doc.id,
        ...data,
      };
    });
    
    designations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return designations      
  } catch (error) {
    console.error("Error fetching designations:", error);
    throw new Error("Failed to fetch designations");
  }
}