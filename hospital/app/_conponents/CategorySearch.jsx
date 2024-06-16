"use client"
import React, { useEffect, useState } from 'react';

import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import GlobalApi from '../_utils/GlobalApi';

function CategorySearch() {

  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    getEmployee(); 
  }, []);

  const getEmployee = () => {
    GlobalApi.getEmployee  ().then(resp => {
      console.log(resp.data.data);
      setCategoryList(resp.data.data);
      setLoading(false); // Set loading to false when data is loaded
    });
  }

  return (
    <div className='mb-10 items-center px-5 flex flex-col'>
       <h2 className='font-bold text-3xl tracking-wide'> <samp className='text-primary'>ຂໍ້ມູນພະແນກ ແລະ ທ່ານໝໍ</samp> </h2>

      <h2 className='text-gray-500 text-xl mt-5'>ຂໍ້ມູນພະແນກ</h2> 
      <div className="flex w-full max-w-sm items-center space-x-2">
     
  
      </div>
      <div className='grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6 '>
        {loading ? (
          // Render placeholder UI when loading is true
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={index} className='bg-slate-200 m-2 animate-pulse rounded-lg h-[130px] w-[130px]'></div>
          ))
        ) : (
          // Render categoryList when loading is false
          categoryList.map((item, index) => (
            index < 6 && (
              <Link href={' /search/' + item?.attributes?.name} key={index} className='flex 
              flex-col text-center items-center 
              p-5 bg-blue-50 m-2 rounded-lg
               gap-2 hover:scale-110 transition-all ease-in-out'>
                <Image
                  src={item?.attributes?.iamge?.data[0]?.attributes?.url}

                  alt="image"
                  width={250}
                  height={250}
                  
                />
                <label className='text-green-600 text-sm'>
                  {item?.attributes?.name}
                </label>
              </Link>
            )
          ))
        )}
      </div>
    </div>
  );
}

export default CategorySearch;
