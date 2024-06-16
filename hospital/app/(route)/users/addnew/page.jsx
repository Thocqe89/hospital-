'use client';

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import GlobalApi from '@/app/_utils/GlobalApi';
import { CircleUserRound, Users, SquareUserRound, PhoneCall, LucideHome, School2, Hotel, Earth, CalendarDays, CheckCheck, ClipboardPlus, BriefcaseBusiness, School, GraduationCap, MailCheck, RectangleEllipsis } from 'lucide-react';
import { toast } from 'sonner';

function addnew() {
  const [addUser, setAddUser] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    phone_number: "",
    village: "",
    district: "",
    province: "",
    country: "",
    email: "",
    password: "",
    date_of_birth: "",
    experience_year: "",
    graduation_at: "",
    graduation_date: "",
    employees: "",
    role_1: ""
  });

  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await GlobalApi.getEmployee();
        const employeesData = response.data.data.map(item => ({
          id: item.id,
          name: item.attributes.name
        }));
        setEmployees(employeesData);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await GlobalApi.getrole(); // Using getrole API
        const rolesData = response.data.data.map(item => ({
          id: item.id,
          name: item.attributes.display_name
        }));
        setRoles(rolesData);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchEmployees();
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setAddUser({
      ...addUser,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    GlobalApi.addUser({ ...addUser })
      .then(response => {
        console.log('Patient added successfully:', response.data);
        toast.success('ບັນທຶກຂໍ້ມູນສຳເລັດ!', { style: toastStyles.success });
      })
      .catch(error => {
        console.error('Error adding patient:', error);
        toast.error('ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ!', { style: toastStyles.error });
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
          <div className="grid gap-3 mb-2 md:grid-cols-2">
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
              <CalendarDays className="text-primary" /> ວັນ/ເດືອນ/ປີເກິດ
            </h2>
            <Input type="date" id="date_of_birth" name="date_of_birth" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
            <School className='text-primary'/> ຈົບຈາກ
            </h2>
            <Input type="text" id="graduation_at" name="graduation_at" placeholder="graduation_at" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
            <BriefcaseBusiness className='text-primary'/>ປະສົບການ
            </h2>
            <Input type="text" id="experience_year" name="experience_year" placeholder="experience_year" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
            <GraduationCap className='text-primary' /> ວັນ/ເດືອນ/ປີຈົບ
            </h2>
            <Input type="date" id="graduation_date" name="graduation_date" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
            <MailCheck className='text-primary'/>ອີເມວ
            </h2>
            <Input type="text" id="email" name="email" placeholder="mail" onChange={handleChange} />

            <h2 className='text-md flex gap-2 text-primary '>
            <RectangleEllipsis className="text-primary" />ລະຫັດອີເມວ
            </h2>
            <Input type="text" id="password" name="password" placeholder="password" onChange={handleChange} />

            {/* Dropdown for selecting Employee */}
            <h2 className='text-md flex gap-2 text-primary '>
              <CircleUserRound className="text-primary" /> ພະແນກ
            </h2>
            <select
              id="employee_id"
              name="employees"
              value={addUser.employee_id}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded"
            >
              <option value="">ເລືອກພະແນກ</option>
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>{employee.name}</option>
              ))}
            </select>

            {/* Dropdown for selecting Role */}
            <h2 className='text-md flex gap-2 text-primary '>
            <ClipboardPlus className='text-primary'/>ຕຳແໜ່ງ
            </h2>
            <select
              id="role_id"
              name="role_1"
              value={addUser.role_id}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded"
            >
              <option value="">ເລືອກຕຳແໜ່ງ</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="submit" className="text-primary text-white px-4 py-2 rounded-md">
              <div className="flex items-center space-x-2">
                <CheckCheck className="h-5 w-5" />
                <span>ບັນທຶກ</span>
              </div>
            </Button>
            </div>

       
        </form>
       
      </div>
      
    </div>
    
  );
}

export default addnew;
