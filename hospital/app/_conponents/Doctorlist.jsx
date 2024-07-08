"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import doctorlist from '@/app/_conponents/Doctorlist';


function Doctorlist({ doctorlist, heading = "ທານໝໍ" }) {
  console.log(doctorlist);
  return (
    <div className='mb-10 px-8'>
      <h2 className='text-primary font-bold text-xl'>{heading}</h2>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-7 mt-4 lg:grid-cols-4'>
        {doctorlist.length > 0 ? doctorlist.slice(0, 8).map((doctor) => (
          <div className='border-[1px] bg-slate-200 rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out' key={doctor.id}>
            <Image 
              src={doctor.attributes?.image?.data?.[0]?.attributes?.url || '/86.jpg'} 
              alt={'Doctor'} 
              width={300} 
              height={200} 
              className='h-[200px] w-full object-cover rounded' 
            />
            <div className='mt-3 items-baseline flex flex-col gap-1'>
              <h2 className='text-[14px] bg-blue-100 p-1 rounded-full px-2 text-primary'>
                {doctor.attributes?.first_name}
              </h2>
              <h2 className='text-primary font-bold'>
                {doctor.attributes?.employees?.data[0]?.attributes?.name}
              </h2>
              <h2 className='text-primary text-sm'>
                {doctor.attributes?.role_1?.data?.attributes?.status}
              </h2>
              <h2 className='text-gray-500 text-sm'>
                {doctor.attributes?.province}
              </h2>
              <h2 className='text-gray-500 text-sm'>
                {doctor.attributes?.country}
              </h2>
              <Link href={'/details/' + doctor?.id} className='w-full'>
                <h2 className='p-2 px-3 border-[1px] border-primary text-primary rounded-full w-full text-center text-[11px] mt-2 cursor-pointer hover:bg-primary hover:text-white'>
                  ຂໍ້ມູນເພີ່ມ
                </h2>
              </Link>
            </div>
          </div>
        )) :
        [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className='h-[220px] bg-slate-100 w-full rounded-lg animate-pulse'></div>
        ))
        }
      </div>
    </div>
  );
}

export default Doctorlist;
