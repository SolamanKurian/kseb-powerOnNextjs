import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Ensure this path points to your Firebase configuration

export async function fetchOneDesignation(id) {
    console.log("etheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    
  try {
    // Get the document by ID
    const docRef = doc(db, "designations", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      // Convert any Timestamp fields to ISO strings (e.g., 'createdAt')
      if (data.createdAt && data.createdAt.toDate) {
        data.createdAt = data.createdAt.toDate().toISOString();  // Convert Timestamp to ISO string
      }
      return {
        id: docSnap.id,
        ...data,
      };
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching designation:", error);
    throw new Error("Failed to fetch designation");
  }
}
