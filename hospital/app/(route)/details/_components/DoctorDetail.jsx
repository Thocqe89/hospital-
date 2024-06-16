import React from 'react';
import Image from 'next/image';
import { BookOpenText, BriefcaseBusiness, ClipboardPlus, Earth, GraduationCap, MailCheck, MapPin, PhoneCall, PhoneForwarded, School, Stethoscope } from 'lucide-react';

import BookAppointment from './BookAppointment';

function DoctorDetail({doctor}) {
  return (
    <div className='grid grid-cols-2 bg-gray-200 md:grid-cols-2 border-[1px] p-5 mt-5 rounded-lg '>
  {/* image */}
      <div>
      <img 
  src={doctor.attributes?.image?.data?.[0]?.attributes?.url || '/82.jpg'} 
  alt={'Doctor'} 
  width={500}
  height={500}
          className='rounded-lg  w-full h-[450px] object-cover'
        />
      </div>
      <div className='col-span-50 grid grid-cols-1 mt-50 md:px-10  '>
      <h2 className='font-bold text-2xl text-gray-500'>
        ທ່ານ. <span className= ' font-bold text-2xl text-primary text-blod'> {doctor.attributes?.first_name} {doctor.attributes?.last_name}</span> </h2>
        <h2 className='flex gap-2 text-gray-500 text-md'>
          <ClipboardPlus className='text-primary'/>ຕຳແໜ່ງ
          <span className='font-bold text-primary'>{doctor.attributes?.role_1?.data?.attributes?.status}</span>
        </h2>
       
        <h2 className='text-md flex gap-2 text-gray-500'>
          <Earth className='text-primary'/>ສັນຊາດ
          <span className='text-primary'> {doctor.attributes?.country}</span>
        </h2>
        <h2 className='text-md flex gap-2 text-gray-500'> 
          <BriefcaseBusiness className='text-primary'/>ປະສົບການ
          <span className='text-primary font-bold'>{doctor.attributes?.experience_year} </span> ປີ
        </h2>
        <h2 className='text-md flex gap-2 text-gray-500'> 
          <GraduationCap className='text-primary' /> ຈົບປິ
          <span className='text-primary'>{doctor.attributes?.graduation_date}</span> 
        </h2>
        <h2 className='text-md flex gap-2 text-gray-500'> 
          <School className='text-primary'/> ຈົບຈາກ
          <span className='text-primary'>{doctor.attributes?.graduation_at}</span> 
        </h2>
        
        <h2 className='text-md flex gap-2 text-gray-500'>
          <MapPin className='text-primary'/>ທີ່ຢູ່ປັດຈຸບັນ
          <span className='text-primary'>{doctor.attributes?.province}</span>
        </h2>
        <h2 className='text-md flex gap-2 text-gray-500'> 
          <PhoneCall className='text-primary'/>ເບີໂທ
          <span className='text-primary'>{doctor.attributes?.phone_number}</span></h2>
          <h2 className='text-md flex gap-2 text-gray-500'>
          <MailCheck className='text-primary'/>
          <span className='text-primary'> {doctor.attributes?.email}</span>
        </h2>
        <h2 className='text-md flex gap-2 text-gray-500'>
        <Stethoscope className='text-primary'/>ຊຽວຊານ
        <span className='text-primary text-blod'>
           {doctor.attributes?.employees?.data[0]?.attributes?.name}</span>
           </h2>
        <BookAppointment doctor={doctor} />
      </div>
    </div>
  );
}

export default DoctorDetail;
