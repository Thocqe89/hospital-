"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import GlobalApi from '@/app/_utils/GlobalApi';

function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { cname } = useParams();

  useEffect(() => {
    console.log('=>Category Name:', cname);
    if (cname) {
      setSelectedCategory(decodeURIComponent(cname));
    }
  }, [cname]);

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = () => {
    GlobalApi.getEmployee()
      .then(resp => {
        setCategoryList(resp.data.data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  };

  const handleCategorySelect = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);

    if (selectedValue) {
      console.log('=> Selected Category:', selectedValue);
      window.history.replaceState(
        null,
        '',
        `/search/${encodeURIComponent(selectedValue)}`
      );
    }
  };

  return (
    <div className='mt-5 flex flex-col mb-4'>
      <select
        className='w-[280px] text-primary border border-gray-300 rounded-md'
        value={selectedCategory}
        onChange={handleCategorySelect}
      >
        <option value="" disabled>ເລືອກພະແນກ</option>
        {categoryList.map((item, index) => (
          <option
            key={index}
            value={item.attributes.name}
          >
            {item.attributes.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryList;
