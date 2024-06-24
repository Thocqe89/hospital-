"use client"
import React from 'react'
import { Map } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'


function footer() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-5xl justifly-center text-center flex flex-col
  items-center px-4 py-16 sm:px-6 lg:px-8">
        <Image src='/logoS.png'
          alt='logo'
          width={100}
          height={100} />

        <h2 className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
        ໂຮງຫມໍ ເສດຖາທິຣາດ
          <br class="mb-2" />
          ຖະນົນ ກຳແພງເມືອງ ບ້ານດອນກອຍ ເມືອງໄຊເສດຖາ ນະຄອນຫຼວງວຽງຈັນ
          <br class="mb-2" />
          ເບີ :030 5725978
          <br class="mb-2" />
          Mail : hospitalsetthathirath@gmail.com 
        </h2>
        <Link href='https://maps.app.goo.gl/dHXmWUFUTacNHDAt5'>
        <h2 className='font-bold  text-center text-3xl tracking-wide'><samp className='text-primary'><Map /></samp> </h2>
</Link>

        {/* 
    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> About </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Careers </a>
      </li>cd

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> History </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Services </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Projects </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Blog </a>
      </li>
    </ul> */}
    

      </div>
    </footer>
  )
}

export default footer
