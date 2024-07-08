"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { canAccess } from '@/lib/utils';
import GlobalApi from '@/app/_utils/GlobalApi'; // Import GlobalApi
import { Maximize } from 'lucide-react';

function Header() {
  const Menu = [
    { id: 1, name: "ໜ້າຫຼັກ", path: '/', value: 'all' },
    { id: 2, name: "ຂໍ້ມູນຄົນເຈັບ", path: '/patients', value: 'all' },
    { id: 3, name: "ຂໍ້ມູນພະນັກງານ", path: '/users', value: 'approve' },
    { id: 4, name: "ລາຍການຈອງ", path: '/my-booking', value: 'all' },
    { id: 5, name: "LA", path: '#', image: '/laos.png' ,value: 'all' },
  ];

  const { user } = useKindeBrowserClient();

  const [emailData, setEmailData] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      // Fetch email data from the API when the component mounts
      GlobalApi.getEmail(user.email)
 
        .then(response => {
          const emailList = response.data.data;
          const foundEmail = emailList.find(item => item.attributes.email === user.email);
          setEmailData(foundEmail);
        })
        .catch(error => {
          console.error('Error fetching email:', error);
        });
    }

  }, [user]);

  const handleChangeScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  
  return (
    <div className='flex items-center justify-between p-1 shadow-sm'>
      <div className='flex items-center gap-10'>
        <Image src='/logoS.png' alt='logo' width={100} height={100} />
        <h2 className='text-primary font-bold text-xl'>
          ໂຮງຫມໍ ເສດຖາທິຣາດ <span className='text-rose-700 font-bold'>+</span>
        </h2>
        
        <ul className='md:flex gap-8 hidden'>
          
          {Menu.filter(item => emailData && canAccess(item.value, emailData.attributes?.role_1.data?.attributes?.code)).map((item) => (
            <Link href={item.path} key={item.id}>
              <li className='hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out'>
                {item.name === 'LA' ? (
                  <Image src={item.image} alt="Laos Flag" width={30} height={30} />
                ) : (
                  item.name
                )}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <Button className='ml-auto hover:bg-white cursor-pointer  transition-all ease-in-out bg-transparent mr-4' onClick={handleChangeScreen}>
  <div>
    <Maximize className='text-primary' />
  </div>
</Button>
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
               <div className="profile-initial">
                 {user.email.charAt(0).toUpperCase(1)}
               </div>
             )}
           </div>
        </PopoverTrigger>
        <PopoverContent className='w-44'>
          <ul className='flex flex-col gap-2'>
            <Link href="/Profile" passHref>
              <li className='cursor-pointer hover:text-primary p-2 rounded-md'>
                ຂໍ້ມູນສ່ວນຕົວ
              </li>
            </Link>
            <li className='cursor-pointer hover:text-primary p-2 rounded-md'>
              <LogoutLink>ອອກຈາກລະບົບ</LogoutLink>
            </li>
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
        width: 45px;
        height: 45px;
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
        font-size: 20px;
        font-weight: bold;
        color: #F40000;
      }
    `}</style>
  </div>
);
}

export default Header;