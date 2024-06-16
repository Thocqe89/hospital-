"use client";
import React, { useEffect, useState } from 'react';
import CategoryList from '../_components/CategoryList';
import GlobalApi from '@/app/_utils/GlobalApi';
import Doctorlist from '@/app/_conponents/Doctorlist';
import { usePathname } from 'next/navigation';

function Search() {
  const params = usePathname();
  const category = params.split('/')[2];

  const [doctorlist, setDocterlist] = useState([]);

  useEffect(() => {
    if (category) { getDoctors(); }
  }, [category]);

  const getDoctors = () => {
    GlobalApi.getDoctorByCategory(category).then(resp => {
      setDocterlist(resp.data.data);
    });
  };

  return (
    <div className='mt-5 '
      // style={{ backgroundImage: 'url("/82.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <Doctorlist heading={decodeURIComponent(category)} doctorlist={doctorlist} />
    </div>
  );

}

export default Search;
