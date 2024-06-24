"use client";
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi'; // Import GlobalApi
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Trash2, CheckCheck, CopyXIcon, CircleUserRound, Users, ClipboardPlus } from 'lucide-react';
import Link from 'next/link';

function EditUser({ params }) {
    const router = useRouter();
    const id = params.edit;

    const [userData, setUserData] = useState({
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
        if (id) {
            GlobalApi.getUserById(id)
                .then(response => {
                    setUserData(response.data.data.attributes);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
        // Fetch employees and roles for the select options
        GlobalApi.getEmployee()
            .then(response => setEmployees(response.data.data))
            .catch(error => console.error('Error fetching employees:', error));

        GlobalApi.getrole()
            .then((response) => {
                console.log("=>", response);
                return setRoles(response.data.data)
            })
            .catch(error => console.error('Error fetching roles:', error));
    }, [id]);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        GlobalApi.updateUser(id, { data: userData })
            .then(response => {
                console.log('User updated successfully:', response.data);
                toast.success('User updated successfully!', { style: toastStyles.success });
                router.push('/users');
            })
            .catch(error => {
                console.error('Error updating User:', error);
                toast.error('Error updating user!', { style: toastStyles.error });
            });
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this user?")) {
            GlobalApi.deleteUser(id)
                .then(response => {
                    console.log('User deleted successfully:', response.data);
                    toast.success('User deleted successfully!', { style: toastStyles.success });
                    router.push('/users');
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                    toast.error('Error deleting user!', { style: toastStyles.error });
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
        <div className="grid grid-cols-2 bg-gray-200 md:grid-cols-3 border-[1px] p-5 mt-6 rounded-lg">
            <div className="col-span-3 mt-2 md:mt-0">
                <form onSubmit={handleSubmit} className="space-y-2 text-primary">
                    <div className="grid gap-3 mb-2 md:grid-cols-2">
                        <h2 className='text-md mt-3 flex gap-1 text-primary '>
                            <CircleUserRound className="text-primary" /> First Name
                        </h2>
                        <Input type="text" id="first_name" name="first_name" value={userData.first_name} onChange={handleChange} />

                        <h2 className='text-md flex gap-2 text-primary '>
                            <Users className="text-primary" /> Last Name
                        </h2>
                        <Input type="text" id="last_name" name="last_name" value={userData.last_name} onChange={handleChange} />

                        <h2 className='text-md flex gap-2 text-primary '>
                            Gender
                        </h2>
                        <Input type="text" id="gender" name="gender" value={userData.gender} onChange={handleChange} />

                        <h2 className='text-md flex gap-2 text-primary '>
                            Phone Number
                        </h2>
                        <Input type="text" id="phone_number" name="phone_number" value={userData.phone_number} onChange={handleChange} />

                        <h2 className='text-md flex gap-2 text-primary '>
                            Village
                        </h2>
                        <Input type="text" id="village" name="village" value={userData.village} onChange={handleChange} />

                        <h2 className='text-md flex gap-2 text-primary '>
                            District
                        </h2>
                        <Input type="text" id="district" name="district" value={userData.district} onChange={handleChange} />

                        <h2 className='text-md flex gap-2 text-primary '>
                            Province
                        </h2>
                        <Input type="text" id="province" name="province" value={userData.province} onChange={handleChange} />

                        <h2 className='text-md flex gap-2 text-primary '>
                            Country
                        </h2>
                        <Input type="text" id="country" name="country" value={userData.country} onChange={handleChange} />

                        <h2 className='text-md flex gap-2 text-primary '>
                            Email
                        </h2>
                        <Input type="email" id="email" name="email" value={userData.email} onChange={handleChange} />

                        <h2 className='text-md flex gap-2 text-primary '>
                            Password
                        </h2>
                        <Input type="text" id="password" name="password" value={userData.password} onChange={handleChange} />

                        <h2 className='text-md flex gap-2 text-primary '>
                            Date of Birth
                        </h2>
                        <Input type="date" id="date_of_birth" name="date_of_birth" value={userData.date_of_birth} onChange={handleChange} />

                        <h2 className='text-md flex gap-2 text-primary '>
                            Experience Year
                        </h2>
                        <Input type="text" id="experience_year" name="experience_year" value={userData.experience_year} onChange={handleChange} />

                        <h2 className='text-md flex gap-2 text-primary '>
                            Graduation At
                        </h2>
                        <Input type="text" id="graduation_at" name="graduation_at" value={userData.graduation_at} onChange={handleChange} />

                        <h2 className='text-md flex gap-2 text-primary '>
                            Graduation Date
                        </h2>
                        <Input type="date" id="graduation_date" name="graduation_date" value={userData.graduation_date} onChange={handleChange} />

                        <h2 className='text-md flex gap-2 text-primary '>
                            Employees
                        </h2>
                        <select id="employees" name="employees" value={userData.employees} onChange={handleChange} className="input input-bordered">
                            <option value="">ເລືອກພະແນກ</option>
                            {employees.map(employee => (
                                <option key={employee.id} value={employee.id}>{employee.attributes.name}</option>
                            ))}
                        </select>

                        <h2 className='text-md flex gap-2 text-primary '>
                            Role
                        </h2>
                        <select id="role_1" name="role_1" value={userData.role_1} onChange={handleChange} className="input input-bordered">
                            <option value="">ເລືອກຕຳແໜ່ງ</option>
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>{role.attributes.display_name}</option>
                            ))}
                        </select>
                        {/* <h2 className='text-md flex gap-2 text-primary '>
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
            </select>  */}
                    </div>
                    <div className="flex mt-2 justify-end space-x-4">

                        <Button
                            onClick={() => handleDelete(id)}
                            className="text-primary text-white px-4 py-2 rounded-md bg-red-500 hover:bg-red-600"
                        >
                            <div className="flex items-center space-x-2">
                                <Trash2 className="h-5 w-5" />
                                <span>ລືບ</span>
                            </div>
                        </Button>
                        <Button type="submit" className="text-primary text-white px-4 py-2 rounded-md">
                            <div className="flex items-center space-x-2">
                                <CheckCheck className="h-5 w-5" />
                                <span>ບັນທຶກ</span>
                            </div>
                        </Button>

                        <Link href="/users/" legacyBehavior>
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

                    {/* <div className="flex gap-2">
                        <Button type="submit" className="btn btn-primary flex-1">
                            <CheckCheck className="text-primary mr-1" /> ບັນທຶກ
                        </Button>
                        <Button type="button" onClick={handleDelete} className="btn btn-danger flex-1">
                            <Trash2 className="text-primary mr-1" /> ລືບຂໍ້ມູນ
                        </Button>
                        <Link href="/users">
                            <Button type="button" className="btn btn-secondary flex-1">
                                <CopyXIcon className="text-primary mr-1" /> ຍົກເລິກ
                            </Button>
                        </Link>
                    </div> */}
                </form>

            </div>
        </div>
    );
}

export default EditUser;
