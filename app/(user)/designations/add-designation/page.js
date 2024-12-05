'use client'
import React, { useState } from "react";
import { db, addDoc, collection, doc, getDoc } from "../../../../firebase";
import { useRouter } from "next/navigation";
import { addDesignation } from "@/Redux/designationSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export default function AddDesignation() {
  const [designation, setDesignation] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (designation.trim()) {
      try {
        // Add the designation to Firestore
        const createdAt = new Date();
        const docRef = await addDoc(collection(db, "designations"), {
          designation,
          createdAt,
        });

        // Get the newly added document
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const newDesignation = { id: docSnap.id, designation: docSnap.data().designation, createdAt: createdAt.toISOString() };
          console.log(newDesignation);
          
          dispatch(addDesignation(newDesignation));
          
          Swal.fire({
            icon: "success",
            title: "Designation Added",
            text: "The designation has been successfully added"
          }).then(() => {
            router.push('/designations');
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error adding designation"
        });
      }
    } else {
      console.log("Please enter a valid designation");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="p-4 font-bold">ADD DESIGNATION</div>
      <div className="w-8/12 md:w1/2 bg-kseblightgreen flex items-center justify-center rounded-2xl">
        <form onSubmit={handleSubmit} className="p-10 w-8/12 flex flex-col gap-16 justify-center items-center ">
          <input
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full py-2 px-2 rounded-xl"
            placeholder="Enter new designation"
            value={designation}
          />
          <button type="submit" className="bg-ksebgreen w-5/12 md:w-3/12 rounded-xl text-white shadow-xl">
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
}
