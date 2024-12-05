"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GrAdd } from "react-icons/gr";
import { useSelector } from 'react-redux';
import { RiEdit2Fill } from "react-icons/ri";
import Link from 'next/link';
// The component receives the data as a prop
export default function Designations() {
  let [desigs,setDesigs]=useState([])

  let data=useSelector((store)=>store.designations.desigs)
  useEffect(() => { setDesigs(data); }, [data]);


  const router = useRouter();
  const handleAddButton = () => {
    router.push('/designations/add-designation');
  };
  return (
    <div className="flex flex-col items-center">
      <div className="p-4 font-bold">DESIGNATIONS</div>
      <button
        className="bg-ksebgreen w-14 h-14 rounded-full text-white flex items-center justify-center text-3xl shadow-2xl"
        onClick={handleAddButton}
      >
        <GrAdd />
      </button>
      <div className=' w-full'>
       {
        desigs.map((desi,index)=>(
          <div key={desi.id} className='py-2 gap-2 w-10/12 md:w-7/12 mx-auto'>
            <div className=' bg-ksebgrey flex justify-between gap-4 py-2 px-3 rounded-xl'>
              <div className='flex gap-4'>
              <h1>{index+1}</h1>
              <h1 >{desi.designation}</h1>
              </div>
            
            <div className='flex  gap-4'>
              <Link href={`/designations/edit-designation/${desi.id}`} className='text-ksebgreen'><RiEdit2Fill className='size-6' /></Link>
              <h1>dlt</h1>
            </div>
            </div>
            

          </div>
         
          
        ))
       }
      </div>

      
    </div>
  );
}
