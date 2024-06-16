"use client"
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import GlobalApi from '@/app/_utils/GlobalApi'; // Import GlobalApi
import { Banknote, BookUser, CalendarCheck, CalendarDays, CalendarPlus, CalendarPlus2, CalendarX2, CheckCheck, CircleUserRound, Earth, HomeIcon, Hotel, LucideHome, PersonStanding, PhoneCall, PhoneForwarded, Radiation, School, School2, Search, ShieldCheck, SprayCan, SquareUserRound, TicketCheck, TicketCheckIcon, UserRoundMinusIcon, UserRoundSearch, Users } from 'lucide-react';
import { toast } from 'sonner';
import { UserRoundMinus } from 'lucide';
import Link from 'next/link';
import Home from '@/app/page';
import { LucideSchool } from 'lucide-vue-next';



function Add() {
  const [patientData, setPatientData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    phone_number: "",
    village: "",
    district: "",
    province: "",
    country: "",
    emergency_name: "",
    emergency_phone_number: "",
    date_of_birth: "",
    insurance_name: "",
    insurance_strat_date: "",
    insurance_end_date: "",
    identify_familybook_passport: "",
    disease_diagnoses: "",
    // prayment_amount: "",
    // prayment_date: ""
  });

  const handleChange = (e) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    GlobalApi.addPatient({...patientData})
      .then(response => {
        console.log('Patient added successfully:', response.data);
        toast.success('ບັນທຶກຂໍ້ມູນບສຳເລັດກວດ !.', { style: toastStyles.success }); 
        // Optionally clear the form or provide feedback to the user
      })
      .catch(error => {
        console.error('Error adding patient:', error);
        toast.error('ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດກວດຊອບການປ້ອນຂໍ້ມູນ !.', { style: toastStyles.error });
      });
  };

  const toastStyles = {
    success: {
      backgroundColor: "#1A846C",
      color: 'white',
    },
    error: {
      backgroundColor: '#f44336',
      color: 'white',
    },
  };

  return (


    <div className="grid grid-cols-1 bg-gray-200 md:grid-cols-3 border-[1px] p-5 mt-6 rounded-lg">


      <div className="col-span-3 mt-2 md:mt-0">

        <form onSubmit={handleSubmit} className="space-y-1 text-primary">

          <div class="grid gap-3 mb-2 md:grid-cols-2"> {/* Increased gap from 6 to 8 */}
            <h2 className='text-md mt-3 flex gap-1 text-primary '>
              <CircleUserRound className="text-primary" /> ຊື້
            </h2>
            <Input type="text" id="first_name" name="first_name" placeholder="ຕັອກກີ່" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <Users className="text-primary" /> ນາມສະກຸນ
            </h2>
            <Input type="text" id="last_name" name="last_name" placeholder="ໄຊຍະກອນ" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <SquareUserRound className="text-primary" /> ເພດ
            </h2>
            <Input type="text" id="gender" name="gender" placeholder="ຊາຍ" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <PhoneCall className="text-primary" /> ເບີຕິດຕໍ່
            </h2>
            <Input type="text" id="phone_number" name="phone_number" placeholder="2055058028" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <LucideHome className="text-primary" /> ບ້ານ
            </h2>
            <Input type="text" id="village" name="village" placeholder="ໜອງບົວທອງ" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <School2 className="text-primary" /> ເມືອງ
            </h2>
            <Input type="text" id="district" name="district" placeholder="ສີໂຄດຕະບອງ" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <Hotel className="text-primary" /> ແຂວງ
            </h2>
            <Input type="text" id="province" name="province" placeholder="ນະຄອນຫຼວງວຽງຈັນ" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <Earth className="text-primary" /> ປະເທດ
            </h2>
            <Input type="text" id="country" name="country" placeholder="ລາວ" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <UserRoundSearch className="text-primary" /> ຊື້ຜູ້ທີ່ສາຕິດຕໍ່ສຸກເສີນ
            </h2>
            <Input type="text" id="emergency_name" name="emergency_name" placeholder="ໄຊຍະລາດ" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <PhoneForwarded className="text-primary" /> ເບີຕິດຕໍ່ຜູ້ທີ່ສາຕິດຕໍ່ສຸກເສີນ
            </h2>
            <Input type="text" id="emergency_phone_number" name="emergency_phone_number" placeholder="2055058028" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <CalendarDays className="text-primary" /> ວັນ/ເດືອນ/ປີເກິດ
            </h2>
            <Input type="date" id="date_of_birth" name="date_of_birth" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <ShieldCheck className="text-primary" /> ຊື່ປະກັນໄພ
            </h2>
            <Input type="text" id="insurance_name" name="insurance_name" placeholder="ວຽງຈັນປະກັນໄພ" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <CalendarPlus className="text-primary" /> ວັນທີ່ເລີ່ມປະກັນໄພ
            </h2>
            <Input type="date" id="insurance_strat_date" name="insurance_strat_date" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <CalendarX2 className="text-primary" /> ວັນທີ່ສິ້ນສຸດປະກັນໄພ
            </h2>
            <Input type="date" id="insurance_end_date" name="insurance_end_date" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <BookUser className="text-primary" /> ເອກະສານຍືນຍັນຕົວຕົນ
            </h2>
            <Input type="text" id="identify_familybook_passport" name="identify_familybook_passport" placeholder="P12345678" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <Radiation className="text-primary" /> ໂລກປະຈຳຕົວ ແລະ ອາການແພ້
            </h2>
            <Input type="text" id="disease_diagnoses" name="disease_diagnoses" placeholder="ແພ້ຍາ" onChange={handleChange} />

            {/* <h2 className='text-md flex gap-2 text-primary '>
              <Banknote className="text-primary" /> ຈຳນວນເງີນ
            </h2>
            <Input type="text" id="prayment_amount" name="prayment_amount" placeholder="50000" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <CalendarCheck className="text-primary" /> ວັນທີຊຳລະຄ່າຍາ
            </h2>
            <Input type="date" id="prayment_date" name="prayment_date" onChange={handleChange} /> */}




          </div>
          <div className="flex justify-end space-x-4">
            <Button type="submit" className="text-primary text-white px-4 py-2 rounded-md">
              <div className="flex items-center space-x-2">
                <CheckCheck className="h-5 w-5" />
                <span>ບັນທຶກ</span>
              </div>
            </Button>
            <Link href="/search/ພະເເນກຄົນເຈັບສຸກເສີນ" legacyBehavior>
              <a>
                <Button className="text-primary text-white px-4 py-2 rounded-md">
                  <div className="flex items-center space-x-2">
                    <TicketCheck className="h-5 w-5" />
                    <span>ຈອງຄິວ</span>
                  </div>
                </Button>
              </a>
            </Link>
          </div>


        </form>
      </div>

    </div>
  );
}

export default Add; 