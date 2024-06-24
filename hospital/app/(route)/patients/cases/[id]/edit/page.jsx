'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import GlobalApi from '@/app/_utils/GlobalApi';
import { Activity, Banknote, CheckCheck, CopyXIcon, Pill, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { canAccess } from '@/lib/utils';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const EditPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const { user } = useKindeBrowserClient();
  const [emailData, setEmailData] = useState(null);
  const [caseData, setCaseData] = useState({
    data: {

      symptom: '',
      treatment: '',
      medical_detail: '',
      prayment_amount: '',

    },
  });

  useEffect(() => {
    if (user && user.email) {
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

  useEffect(() => {
    if (id) {
      GlobalApi.getCaseById(id)
        .then(response => {
          setCaseData(response.data);
        })
        .catch(error => {
          console.error('Error fetching case data:', error);
        });
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // console.log('=> event.target', value);

    setCaseData(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        attributes: {
          ...prevState.data.attributes,
          [name]: value,
        }
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('=> e', e.target.value);
    // console.log('=> e', e.target.value);
    const newData = {
      data: {
        symptom: caseData.data.attributes?.symptom,
        treatment: caseData.data.attributes?.treatment,
        medical_detail: caseData.data.attributes?.medical_detail,
        prayment_amount: caseData.data.attributes?.prayment_amount,
      }
    }

    console.log('=> Submitting case data:', newData); // Debug log

    GlobalApi.updateCase(id, newData)
      .then(response => {
        toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດ!', { style: toastStyles.success });
        router.push('/patients');
      })
      .catch(error => {
        console.error('Error updating patient:', error);
        toast.error('ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດກວດຊອບການປ້ອນຂໍ້ມູນ!', { style: toastStyles.error });
      });
  };

  const handleDelete = () => {
    if (confirm("ຕ້ອງການລືບຂໍ້ມູນນີ້ແທ້ບໍ?")) {
      GlobalApi.deletecase(id)
        .then(response => {
          toast.success('ລືບຂໍ້ມູນສຳເລັດກວດ!', { style: toastStyles.success });
          router.push('/patients');
        })
        .catch(error => {
          console.error('Error deleting patient:', error);
          toast.error('ລົບຂໍ້ມູນບໍ່ສຳເລັດກວດຊອບການປ້ອນຂໍ້ມູນ!', { style: toastStyles.error });
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
    <div className="flex justify-center">
      <div className="bg-gray-200 border-[8px] p-5 mt-3 rounded-lg" style={{ width: '900px', height: '950px' }}>
        <div className='text-primary text-3xl font-bold'>ລາຍງານການເຂົາພົບທ່ານໝໍ</div>
        <form onSubmit={handleSubmit} className="space-y-4 text-primary">
          <div className="grid grid-cols-1 col-span-1 mt-2 md:mt-5">
            <div className="flex flex-col space-y-2">
              <h2 className='text-md flex gap-2 text-primary mt-2 '>
                <Pill className="text-primary" />ປະເພດຍາ
              </h2>
              <textarea className="p-3 text-lg h-40 rounded-lg" id="medical_detail" name="medical_detail" value={caseData.data.attributes?.medical_detail} onChange={handleChange} />

              <h2 className='text-md mt-3 flex gap-1 text-primary '>
                <Activity className="text-primary" /> ອາການ
              </h2>
              <textarea className="p-3 text-lg h-40 rounded-lg" id="symptom" name="symptom" value={caseData.data.attributes?.symptom} onChange={handleChange} />

              <h2 className='text-md mt-3 flex gap-1 text-primary '>
                <Pill className="text-primary" /> ການຮັກສາ
              </h2>
              <textarea className="p-3 text-lg h-40 rounded-lg" id="treatment" name="treatment" value={caseData.data.attributes?.treatment} onChange={handleChange} />

              <h2 className='text-md mt-3 flex gap-1 text-primary '>
                <Banknote className="text-primary" /> ລວມຄ່າຊຳລະ
              </h2>
              <input type="text" className="p-3 text-lg rounded-lg" id="prayment_amount" name="prayment_amount" value={caseData.data.attributes?.prayment_amount} onChange={handleChange} />
            </div>
            <div className="flex mt-2 justify-end space-x-4">
              {emailData && canAccess("patientsCasesButtonViewcaseEdit", emailData.attributes.role_1.data.attributes.code) &&
                <Button onClick={handleDelete} className="text-primary text-white px-4 py-2 rounded-md bg-red-500 hover:bg-red-600">
                  <div className="flex items-center space-x-2">
                    <Trash2 className="h-5 w-5" />
                    <span>ລືບ</span>
                  </div>
                </Button>
              }

              {emailData && canAccess("patientsCasesButtonViewcaseEdit", emailData.attributes.role_1.data.attributes.code) &&
                <Button type="submit" className="text-primary text-white px-4 py-2 rounded-md">
                  <div className="flex items-center space-x-2">
                    <CheckCheck className="h-5 w-5" />
                    <span>ບັນທຶກ</span>
                  </div>
                </Button>
              }

              <Link href="/patients/" legacyBehavior>
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPage;
