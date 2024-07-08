"use client";
import React, { useEffect, useState } from 'react';

import GlobalApi from '@/app/_utils/GlobalApi';
// import doctorlist from '@/app/_conponents/Doctorlist';
// import doctorlist from '@/app/_conponents/Doctorlist';
import Doctorlist from '@/app/_conponents/Doctorlist'; // Ensure this matches the actual path


import { usePathname } from 'next/navigation';
import CategoryList from '../_components/CategoryList';


function Search() {
  const params = usePathname();
  const category = params.split('/')[2];

  const [doctorlist, setDoctorlist] = useState([]);

  useEffect(() => {
    const getDoctors = () => {
      GlobalApi.getDoctorByCategory(category).then(resp => {
        setDoctorlist(resp.data.data);
      });
    };

    if (CategoryList) {
      getDoctors();
    }
  }, []);

  return (
    <div className='mt-5'>
      <Doctorlist heading={decodeURIComponent(category)} doctorlist={doctorlist} />
    </div>
  );
}

export default Search;
