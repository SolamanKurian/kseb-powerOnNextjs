'use client'
import { GetDesignations } from "../../api/getDesignation/getDesignation";
import { useDispatch } from "react-redux";
import { setDesignations } from "@/Redux/designationSlice";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        // Wait for the promise to resolve
        const designations = await GetDesignations();
        console.log(designations);
        
        // Dispatch the result to Redux store
        if (designations) {
          dispatch(setDesignations(designations));
        }
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };

    // Call the async function to fetch the designations
    fetchDesignations();
  }, [dispatch]);

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
}
