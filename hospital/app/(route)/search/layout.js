"use client"
import React from 'react'
import CategoryList from './_components/CategoryList'

function layout({children}) {
  return (
    <div className='grid grid-cols-4'>
      <div className='hideden md:block'>
      <CategoryList/>
      </div>
      <div className=' col-spen-4 md:col-span-3'>
      {children}
      </div>
      
    </div>
  )
}

export default layout