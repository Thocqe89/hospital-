"use client";
import React, { useEffect, useState, useCallback } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import DoctorDetail from '../_components/DoctorDetail';
import { UserRound, UsersRound } from 'lucide-react';

function Details({ params }) {
  const [doctor, setDoctor] = useState();

  const getDoctorById = useCallback(() => {
    GlobalApi.getDoctorById(params.recordId).then(resp => {
      setDoctor(resp.data.data);
    });
  }, [params.recordId]);

  useEffect(() => {
    getDoctorById();
  }, [getDoctorById]);

  return (
    <div className='p-5 md:px-20'>
      <h2 className='font-bold flex grap-2 text-[22px] text-primary'>
        <span> ຂໍ້ມູນລາຍລະອຽດ</span>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-4'>
        <div className='col-span-3'>
          {doctor && <DoctorDetail doctor={doctor} />}
        </div>
        <div>
          {/* Suggestions or other content */}
        </div>
      </div>
    </div>
  );
}

export default Details;
