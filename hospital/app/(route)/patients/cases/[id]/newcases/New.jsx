'use client';
import React, { useState, useEffect } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';  // Import your API module
import { toast } from 'sonner';
import { Activity, CheckCheck, CopyXIcon, Pill, Syringe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

function NewCases() {
    const { id } = useParams();
    const { user } = useKindeBrowserClient();
    const [newcases, setNewcases] = useState({
        medical_detail: "",
        symptom: "",
        treatment: "",
        user_1_: {
            first_name: "",
            last_name: "",
            email: ""
        }
    });

    useEffect(() => {
        if (user) {
            setNewcases(prevCases => ({
                ...prevCases,
                user_1_: {
                    first_name: user.first_name || "",
                    last_name: user.last_name || "",
                    email: user.email || ""
                }
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setNewcases({
            ...newcases,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if any field is empty
        if (!newcases.medical_detail || !newcases.symptom || !newcases.treatment) {
            toast.error('ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ ກວດຊອບການປ້ອນຂໍ້ມູນ!', { style: toastStyles.error });
            return; // Exit the function if any field is empty
        }
        GlobalApi.PostNewcasesing({ ...newcases, patient_1_: id })
            .then(response => {
                console.log('Patient added successfully:', response.data);
                toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດການຮັກສາ!', { style: toastStyles.success }); // Show success toast with custom style
            })
            .catch(error => {
                console.error('Error adding patient:', error);
                toast.error('ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ ກວດຊອບການປ້ອນຂໍ້ມູນ!', { style: toastStyles.error }); // Show error toast with custom style
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
        error1: {
            backgroundColor: '#36A2F4',
            color: 'white',
        },
    };

    return (
        <div className="bg-gray-200 border-[1px] p-5 mt-6 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4 text-primary">
                <div className="grid grid-cols-1 col-span-1 mt-2 md:mt-5">
                    <div className="flex flex-col space-y-2">
                        <h2 className='text-md flex gap-2 text-primary mt-2 '>
                            <Pill className="text-primary" />ປະເພດຍາ
                        </h2>
                        <textarea className="p-3 text-lg h-40  rounded-lg" id="medical_detail" name="medical_detail" placeholder="" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h2 className='text-md flex gap-2 text-primary mt-2 '>
                            <Activity className="text-primary" /> ອາການ
                        </h2>
                        <textarea className="p-3 text-lg h-40  rounded-lg" id="symptom" name="symptom" placeholder="" onChange={handleChange} />
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <h2 className='text-md flex gap-2 text-primary mt-2'>
                        <Syringe className="text-primary" />ການຮັກສາ
                    </h2>
                    <textarea className="p-3 text-lg h-40 rounded-lg" id="treatment" name="treatment" placeholder=" " onChange={handleChange} />
                </div>
                <div className="flex justify-end mt-5 space-x-4">
                    <Link href="/patients" passHref legacyBehavior>
                        <a>
                            <Button className="text-primary text-white px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-900">
                                <div className="flex items-center space-x-2">
                                    <CopyXIcon className="h-5 w-5" />
                                    <span> ຍົກເລີກ</span>
                                </div>
                            </Button>
                        </a>
                    </Link>
                    <Button type="submit" className="text-primary text-white px-4 py-2 rounded-md">
                        <div className="flex items-center space-x-2">
                            <CheckCheck className="h-5 w-5" />
                            <span>ບັນທຶກ</span>
                        </div>
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default NewCases;
