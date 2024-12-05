'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchOneDesignation } from '@/app/api/getDesignation/fetchOneDesignation';

const EditDesignationWithId = () => {
  const router = useRouter();
  const params = useParams();
  const [designation, setDesignation] = useState(null);

  useEffect(() => {
    const id = params.id;
    if (id) {
      console.log("ID from params:", id);
      const fetchDesignation = async () => {
        try {
          console.log("Fetching designation for ID:", id); // Add log for debugging
          const response = await fetchOneDesignation(id);
          // const data = await response.json();
          setDesignation(response);
        } catch (error) {
          console.error('Error fetching designation:', error);
        }
      };
      fetchDesignation();
    } else {
      console.log("ID is undefined or params are empty");
    }
  }, [params]);

  return (
    <div>
      <h1>Edit Designation</h1>
      {designation ? (
        <form>
          <input
            type="text"
            value={designation.designation}
            onChange={(e) =>
              setDesignation({ ...designation, designation: e.target.value })
            }
          />
          {/* Add other form fields as necessary */}
          <button type="submit">Update</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditDesignationWithId;
