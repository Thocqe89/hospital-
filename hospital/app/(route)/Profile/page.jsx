"use client";
import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import { CheckCheck, UserCog, UserPlus } from 'lucide-react';
import { canAccess } from '@/lib/utils';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

function Profile() {
  const { user } = useKindeBrowserClient();
  const [emailData, setEmailData] = useState(null);
  console.log(user);
  useEffect(() => {
    if (user && user.email) {
      // Fetch email data from the API when the component mounts
      GlobalApi.getEmail(user.email)
        .then(response => {
          console.log('API Response:', response); // Log the entire response object
          const emailList = response.data.data;
          // console.log(emailList)
          const foundEmail = emailList.find(item => item.attributes.email === user.email);
          console.log(foundEmail);
          setEmailData(foundEmail);
        })
        .catch(error => {
          console.error('Error fetching email:', error);
        });
    }
  }, [user]); // useEffect should depend on user

  // Check if user is undefined or null
  if (!user) {
    return <div>Loading...</div>;
  }
  console.log(emailData, 'll');

  return (
    <div style={{
      width: '720px', // Set the desired width
      height: '840px', // Set the desired height
      backgroundImage: 'url("/82.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center ',
      position: 'relative' // Ensure z-index works
    }} className='p-4 border mt-2 rounded-lg'>
      <h1 className="text-center profile-title">ຂໍ້ມູນສ່ວນຕົວ</h1>
      <div className="profile-container">
        <div className="profile-details">
          {user.picture && (
            <Image src={user.picture} alt="Profile" width={100} height={100} className="profile-picture" />
          )}

          <div className="relative flex h-3 w-3">
            <div className="profile-info">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full green-400 opacity-50"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </div>

            <p><strong>ຊື້: </strong> <span className='text-primary'>{user.given_name}</span></p>
            <p><strong>ນາມສະກຸນ: </strong> <span className='text-primary'>{user.family_name}</span></p>
            <p><strong>ອີເມວ: <span className='text-primary'>{user.email}</span></strong></p>

            {/* Display additional information if email matches */}
            {emailData && emailData.attributes.email === user.email && emailData.attributes.role_1 && (
              <>
                {/* Additional content here */}
              </>
            )}

            {!emailData && (
              <>
                <div className='pending flex justify-center items-center space-x-4'>
                  <div className='mt-5'>
                    <Link className='flex justify-center items-center' href="users/AddNew" passHref> ⚠ 
                      <span className="relative flex h-10 w-10">
                        <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-red-800 opacity-150"></span>
                        <span className="relative flex h-8 w-8 rounded-full bg-green-800 opacity-100"></span>
                      </span>
                    </Link>
                  </div>
                </div>
                <div>
                  <p className='text-red-500 mt-5 flex justify-center items-center space-x-4'>
                    ຍັງບໍ່ມີຂໍ້ມູນໃນລະບົບ ກະລຸນາປ້ອນຂໍ້ມູນ &quot;ກົດປຸ້ມດ້ານເທີງ&quot;!
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile-container {
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          margin: 0 auto;
          text-align: center;
        }
        .profile-title {
          font-size: 24px;
          margin-bottom: 20px;
          color: #0D7A68;
        }
        .profile-details {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .profile-picture {
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          background-color: #0D7A68;
        }
        .profile-info {
          text-align: left;
        }
        .profile-info p {
          margin: 5px 0;
          font-size: 16px;
          color: #555;
        }
        .profile-info strong {
          // color: #333;
        }
      `}</style>
    </div>
  );
}

export default Profile;
