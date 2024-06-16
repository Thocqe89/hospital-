"use client";
import { useRouter, useParams } from 'next/navigation';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import GlobalApi from '@/app/_utils/GlobalApi';
import { Banknote, BookUser, CalendarCheck, CalendarDays, CalendarPlus, CalendarX2, CheckCheck, CircleUserRound, CopyX, CopyXIcon, Earth, HotelIcon, LucideHome, PhoneCall, PhoneForwarded, Radiation, School2, ShieldCheck, SquareUserRound, Trash2, Undo2, UserRoundSearch, Users } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useEffect, useState } from 'react';


function EditPatient({ params }) {
  const router = useRouter();
  // const { id } = router.query || {};
  const id = params.edit;

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
    insurance_start_date: "",
    insurance_end_date: "",
    identify_familybook_passport: "",
    disease_diagnoses: "",
    // prayment_amount: "",
    // prayment_date: ""
  });

  useEffect(() => {
    console.log('id:', id);
    if (id) {

      GlobalApi.getPatientById(id)
      .then(response => {
        setPatientData(response.data.data.attributes);
      }).catch(error => {
        console.error('Error fetching patient data:', error);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    GlobalApi.updatePatient(id, { data: patientData })
      .then(response => {
        console.log('Patient updated successfully:', response.data);
        toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດ !', { style: toastStyles.success });
        router.push('/patients');
      })
      .catch(error => {
        console.error('Error updating patient:', error);
        toast.error('ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດກວດຊອບການປ້ອນຂໍ້ມູນ !', { style: toastStyles.error });
      });



  };
  const handleDelete = () => {
    if (confirm("ຕ້ອງການລືບຂໍ້ມູນນີ້ແທ້ບໍ?")) {
      GlobalApi.deletepatients(id)
        .then(response => {
          console.log('Patient deleted successfully:', response.data);
          toast.success('ລືບຂໍ້ມູນສຳເລັດກວດ !', { style: toastStyles.success });
          router.push('/patients');
        })

        .catch(error => {
          console.error('Error deleting patient:', error);
          toast.error('ລົບຂໍ້ມູນບໍ່ສຳເລັດກວດຊອບການປ້ອນຂໍ້ມູນ !', { style: toastStyles.error });
        });
    }
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
          <div className="grid gap-3 mb-2 md:grid-cols-2">
            <h2 className='text-md mt-3 flex gap-1 text-primary '>
              <CircleUserRound className="text-primary" /> ຊື້
            </h2>
            <Input type="text" id="first_name" name="first_name" value={patientData.first_name} onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <Users className="text-primary" /> ນາມສະກຸນ
            </h2>
            <Input type="text" id="last_name" name="last_name" value={patientData.last_name} onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <SquareUserRound className="text-primary" /> ເພດ
            </h2>
            <Input type="text" id="gender" name="gender" value={patientData.gender} onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <PhoneCall className="text-primary" /> ເບີຕິດຕໍ່
            </h2>
            <Input type="text" id="phone_number" name="phone_number" value={patientData.phone_number} onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <LucideHome className="text-primary" /> ບ້ານ
            </h2>
            <Input type="text" id="village" name="village" value={patientData.village} onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <School2 className="text-primary" /> ເມືອງ
            </h2>
            <Input type="text" id="district" name="district" value={patientData.district} onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <HotelIcon className="text-primary" /> ແຂວງ
            </h2>
            <Input type="text" id="province" name="province" value={patientData.province} onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <Earth className="text-primary" /> ປະເທດ
            </h2>
            <Input type="text" id="country" name="country" value={patientData.country} onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <UserRoundSearch className="text-primary" /> ຊື້ຜູ້ທີ່ສາຕິດຕໍ່ສຸກເສີນ
            </h2>
            <Input type="text" id="emergency_name" name="emergency_name" value={patientData.emergency_name} onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <PhoneForwarded className="text-primary" /> ເບີຕິດຕໍ່ຜູ້ທີ່ສາຕິດຕໍ່ສຸກເສີນ
            </h2>
            <Input type="text" id="emergency_phone_number" name="emergency_phone_number" value={patientData.emergency_phone_number} onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <CalendarDays className="text-primary" /> ວັນ/ເດືອນ/ປີເກິດ
            </h2>
            <Input type="date" id="date_of_birth" name="date_of_birth" value={patientData.date_of_birth} onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <ShieldCheck className="text-primary" /> ຊື່ປະກັນໄພ
            </h2>
            <Input type="text" id="insurance_name" name="insurance_name" value={patientData.insurance_name} onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <CalendarCheck className="text-primary" /> ເລີ່ມວັນທີເປີດໃຊ້ປະກັນໄພ
            </h2>
            <Input type="date" id="insurance_start_date" name="insurance_start_date" value={patientData.insurance_start_date} onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <CalendarX2 className="text-primary" /> ປະກັນໄພໝົດອາຍຸວັນທີ
            </h2>
            <Input type="date" id="insurance_end_date" name="insurance_end_date" value={patientData.insurance_end_date} onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <BookUser className="text-primary" /> ບັດປະຈຳຕົວ/ເລກໃນເມືອງ/ເລກພູມລຳນານ
            </h2>
            <Input type="text" id="identify_familybook_passport" name="identify_familybook_passport" value={patientData.identify_familybook_passport} onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <Radiation className="text-primary" /> ພະຍາດທີ່ເປັນແລ້ວ
            </h2>
            <Input type="text" id="disease_diagnoses" name="disease_diagnoses" value={patientData.disease_diagnoses} onChange={handleChange} />

            {/* <h2 className='text-md flex gap-2 text-primary '>
              <Banknote className="text-primary" /> ຈຳນວນເງິນທີ່ຈ່າຍ
            </h2>
            <Input type="text" id="prayment_amount" name="prayment_amount" value={patientData.prayment_amount} onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
              <CalendarPlus className="text-primary" /> ວັນທີຈ່າຍເງິນ
            </h2>
            <Input type="date" id="prayment_date" name="prayment_date" value={patientData.prayment_date} onChange={handleChange} /> */}
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              onClick={() => handleDelete(id)}
              className="text-primary text-white px-4 py-2 rounded-md bg-red-500 hover:bg-red-600"
            >
              <div className="flex items-center space-x-2">
              <Trash2  className="h-5 w-5" />
                <span>ລືບ</span>
              </div>
            </Button>
            <Button type="submit" className="text-primary text-white px-4 py-2 rounded-md">
              <div className="flex items-center space-x-2">
                <CheckCheck className="h-5 w-5" />
                <span>ບັນທຶກ</span>
              </div>
            </Button>

            <Link href="/patients" legacyBehavior>
              <a>
                <Button className="text-primary text-white px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-900">
                  <div className="flex items-center space-x-2">
                  <CopyXIcon className="h-5 w-5" />
                    <span>ຍົກເລີກ</span>
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

export default EditPatient;
