"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/ui/button'
// import { Button } frm '@/components/ui/button';

import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";

function Header() {
  const Menu = [
    {
      id: 1,
      name: "ໜ້າຫຼັກ",
      path: '/'
    },
    {
      id: 2,
      name: "ຂໍ້ມູນຄົນເຈັບ",
      path: '/patients'
    },
    {
      id: 3,
      name: "ຂໍ້ມູນພະນັກງານ",
      path: '/users'
    },
    {
      id: 4,
      name: "ລາຍການຈອງ",
      path: '/my-booking'
    },
    {
      id: 5,
      name: "LA",
      path: '#',
      image: '/laos.png', // Add the image path here
    },
  ];

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className='flex items-center justify-between p-1 shadow-sm '>
      <div className='flex items-center gap-10'>
        <Image src='/logoS.png' alt='logo' width={100} height={100} /><h2 className='text-primary font-bold text-xl'>ໂຮງຫມໍ ເສດຖາທິຣາດ <samp className='text-rose-700 font-bold '>+</samp></h2>
        <ul className='md:flex gap-8 hidden'>{Menu.map((item, index) => (
          <Link href={item.path} key={item.id}>
            <li className='hover:text-primary cursor-pointer hover:scale-105 transition-all case-in-out'>
              {item.name === 'LA' ? (
                <Image src={item.image} alt="Laos Flag" width={30} height={30} />
              ) : (
                item.name
              )}
            </li>
          </Link>
        ))}</ul>
      </div>
      {user ? (
        <Popover>
          <PopoverTrigger>
            <div className="profile-picture-container">
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt='profile'
                  width={40}
                  height={40}
                  className='rounded-full'
                />
              ) : (
                <div className="profile-initial">{user.email.charAt(0).toUpperCase()}</div>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-44'>
            <ul className='flex flex-col gap-2'>
              <li className='cursor-pointer hover:text-primary p-2 rounded-md'><>ຂໍ້ມູນສ່ວນຕົວ</></li>
              <li className='cursor-pointer hover:text-primary p-2 rounded-md'><LogoutLink>ອອກຈາກລະບົບ</LogoutLink></li>
            </ul>
          </PopoverContent>
        </Popover>
      ) : (
        <LoginLink>
          <Button>
            ເຂົ້າສູ່ລະບົບ
          </Button>
        </LoginLink>
      )}
      <style jsx>{`
        .profile-picture-container {
          width: 45px; /* Adjust as needed */
          height: 45px; /* Adjust as needed */
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          background-color: #0D7A68;
        }
        .profile-initial {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 40px;
          font-weight: bold;
          color: #fff;
        }
      `}</style>
    </div>
  );
}

export default Header;
