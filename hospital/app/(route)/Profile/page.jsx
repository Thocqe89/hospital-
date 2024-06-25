"use client"
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
  console.log(user)
  useEffect(() => {
    if (user && user.email) {
      // Fetch email data from the API when the component mounts
      GlobalApi.getEmail(user.email)
        .then(response => {
          console.log('API Response:', response); // Log the entire response object
          const emailList = response.data.data
          // console.log(emailList)
          const foundEmail = emailList.find(item => item.attributes.email
            === user.email);
          console.log(foundEmail)
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
  console.log(emailData, 'll')

  // Check if user email is undefined or null
  // if (!user.email) {
  //   return (
  //     <div>
  //       <p>No email provided.</p>
  //       <button onClick={() => alert('Please provide an email.')}>Click here to provide email</button>
  //     </div>
  //   );
  // }

  return (
    <div style={{
      width: '720px', // Set the desired width
      height: '840px', // Set the desired height
      backgroundImage: 'url("/82.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center ',
      position: 'relative' // Ensure z-index works

    }} className='p-4 border mt-2 rounded-lg '>
      <h1 className=" text-center profile-title">ຂໍ້ມູນສ່ວນຕົວ</h1>
      <div className="profile-container">
      <div className="profile-details">
   

        <div
          style={{
            // // width: '720px', // Set the desired width
            // // height: '840px', // Set the desired height
            // backgroundImage: 'url("/.jpg")',
            // backgroundSize: 'cover',
            // backgroundPosition: 'center ',
            // // position: 'relative' // Ensure z-index works

          }}
          className="profile-details"> 
            
          {user.picture && (
            <img src={user.picture} alt="Profile" className="profile-picture  " />
            
            
          )}
         
         
          {/* {canAccess('patients',emailData.attributes.role_1.data?.attributes.code)?"Add":"NO"} */}
          {/* {canAccess('patientsEdit',emailData.attributes.role_1.data.attributes.code)?"Add":""} */}
         
            <div class="relative flex h-3 w-3">
            <div className="profile-info  ">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full green-400 opacity-50"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </div>


            <p><strong>ຊື້: </strong> <span className='text-primary '> {user.given_name}</span></p>
            <p><strong>ນາມສະກຸນ: </strong> <span className='text-primary '>{user.family_name}</span></p>
            <p><strong >ອີເມວ: <span className='text-primary '>{user.email}</span></strong> </p>

            {/* Display additional information if email matches */}
            {emailData && emailData.attributes.email === user.email && emailData.attributes.role_1 && (
              <>
                {/* <Image className=''
              src="/202.jpg"
              alt="logo"
              width={100}
              height={100} />
                <div className='text-primary pending '> waiting admin approved
                </div> */}


              </>
            )}

            {!emailData && (
              <>
              <div className='pending flex justify-center items-center space-x-4'>
                <div className='mt-5'>
           
             
     <Link className='flex justify-center items-center' href="users/AddNew" passHref>
     
     {/* <Button
          style={{ backgroundColor: 'transparent', color: '#0D7A68', border: 'none', padding: '0', cursor: 'pointer' }}
        >
          
            */} 
            <span className="relative flex  h-10 w-10 " >
              
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-red-800 opacity-150 "></span>
              
      <span className="relative flex h-8 w-8 rounded-full bg-green-800 opacity-100 "></span>
     
    </span>
  
             {/* </Button> */}
             
          </Link>
   
     
 
    </div>
</div>
<div >
   <p className='text-red-500 mt-5 flex justify-center items-center space-x-4 '>
    ຍັງບໍ່ມີຂໍ້ມູນໃນລະບົບ ກະລຸນາປ້ອນຂໍ້ມູນ "ກົດປຸ້ມດ້ານເທີງ"!
  </p>
{/* <Link className='flex justify-center items-center ' href="users/addnew" passHref>
    <Button
     
      style={{ backgroundColor: 'transparent', color: '#0D7A68', border: 'none', padding: '0', cursor: 'pointer' }}
    >
      <UserCog className="group-hover:text-red-500 group-hover:scale-125 transition-transform duration-200" size={40} />
    </Button>
              
  </Link>
   */}
   </div>


              </>
            )}
            {/* Pending animation */}

          </div>
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
