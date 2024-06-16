"use client";
import { useRouter} from 'next/navigation';
import { useParams } from 'next/navigation';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import GlobalApi from '@/app/_utils/GlobalApi';
import { Banknote, BookUser, CalendarCheck, CalendarDays, CalendarPlus, CalendarX2, CheckCheck, CircleUserRound, CopyX, CopyXIcon, Earth, HotelIcon, LucideHome, PhoneCall, PhoneForwarded, Radiation, School2, ShieldCheck, SquareUserRound, Trash2, Undo2, UserRoundSearch, Users } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/router';



const EditPage = () => {
  const router = useRouter();
  const { id } = router.query || {};

  // const { id } = router.query || {}; // Handle undefined id gracefully
  // console.log("Fetching case data for ID:", id);
  // State variables to hold case data
  // const id = params.edit;
  const [caseData, setCaseData] = useState({
    symptom: '',
    treatment: '',
    medical_detail: '',
  
  });
  console.log('=>7d:', caseData);
  useEffect(() => {
    if (id) {
      // Fetch case data when id changes
      GlobalApi.getCaseById(id)
        .then(response => {
          setCaseData(response.data.attributes);
        })
        .catch(error => {
          console.error('Error fetching case data:', error);
        });
    }
  }, [id]);
  // Function to fetch case data based on ID
  // const fetchCaseData = async () => {
  //   try {
      
  //     const response = await GlobalApi.getCaseById(id);
  //     setCaseData(response.data); // Update state with case data
  //   } catch (error) {
  //     console.error('Error fetching case data:', error);
  //   }
  // };

  // Fetch case data when component mounts
  // useEffect(() => {
  //   if (id) {
  //     fetchCaseData();
  //   }
  // }, [id]);
  const handleChange = (e) => {
    setCaseData({
      ...caseData,
      [e.target.name]: e.target.value
    });
  };
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    GlobalApi.updateCase(id, { data: caseData })
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
  // Function to handle input changes
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setCaseData(prevState => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
  const handleDelete = () => {
    if (confirm("ຕ້ອງການລືບຂໍ້ມູນນີ້ແທ້ບໍ?")) {
      GlobalApi.deletecase(id)
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
            <Input type="text" id="first_name" name="first_name" value={caseData.treatment} onChange={handleChange} />

            <h2 className='text-md mt-3 flex gap-1 text-primary '>
              <CircleUserRound className="text-primary" /> ຊື້
            </h2>
            <Input type="text" id="first_name" name="first_name" value={caseData.symptom} onChange={handleChange} />

            <h2 className='text-md mt-3 flex gap-1 text-primary '>
              <CircleUserRound className="text-primary" /> ຊື້
            </h2>
            <Input type="text" id="first_name" name="first_name" value={caseData.medical_detail} onChange={handleChange} />
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


export default EditPage;
