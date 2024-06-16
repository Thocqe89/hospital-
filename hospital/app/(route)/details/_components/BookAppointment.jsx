import React, { useEffect, useState, useRef } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarRange, CheckCheck, Clock } from 'lucide-react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';
import GeneratePDF from './GeneratePDF';

function BookAppointment({ doctor }) {
    const { user } = useKindeBrowserClient();
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectTimeSlot, setSelectTimeSlot] = useState('');
    const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
    const [note, setNote] = useState('');
    const [appointment, setAppointment] = useState(null);
    const componentRef = useRef();
    const [bookedDates, setBookedDates] = useState([]);

    useEffect(() => {
        // Fetch booked time slots and set booked dates
        getTime();

        // Fetch appointments and set the latest appointment
        GlobalApi.getAppointments().then(res => {
            const fetchedAppointments = res.data.data;
            if (fetchedAppointments.length > 0) {
                const latestAppointment = fetchedAppointments[0].attributes;
                setAppointment({
                    UserName: latestAppointment.UserName,
                    Email: latestAppointment.Email,
                    Date: latestAppointment.Date,
                    Time: latestAppointment.Time,
                    Note: latestAppointment.Note,
                });
            }
        });
    }, [date]);

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

    const saveBooking = () => {
        if (bookedTimeSlots.includes(selectTimeSlot)) {
            toast.error("This time slot is already booked.", { style: toastStyles.error });
            return;
        }

        const data = {
            data: {
                user_1s: doctor.id,
                UserName: user.given_name + " " + user.family_name,
                Email: user.email,
                Time: selectTimeSlot,
                Date: date,
                Note: note,
            }
        };

        GlobalApi.BookAppointment(data)
            .then(resp => {
                if (resp) {
                    toast.success("ສຳເລັດການຈອງ!.", { style: toastStyles.success });
                    setBookedTimeSlots([...bookedTimeSlots, selectTimeSlot]);
                }
            })
            .catch(error => {
                toast.error("An error occurred while sending the booking.", { style: toastStyles.error });
            });
    };

    const getTime = () => {
        const timeList = [];
        for (let i = 1; i <= 15; i++) {
            const paddedNumber = i.toString().padStart(3, '0');
            timeList.push({ time: `Q${paddedNumber}` });
        }
        setTimeSlot(timeList);

        // Fetch booked time slots for the selected date and doctor
        GlobalApi.getBookedTimeSlots(doctor.id, date)
            .then(resp => {
                const bookedSlots = resp.data.map(slot => slot.attributes);
                setBookedTimeSlots(bookedSlots.map(slot => slot.Time));
                setBookedDates(bookedSlots.map(slot => new Date(slot.Date)));
            })
            .catch(error => {
                console.error("Error fetching booked time slots:", error);
            });
    };

    const isPastDay = (day) => {
        return day <= new Date();
    };

    const handleTimeSlotSelection = (selectedSlot) => {
        if (bookedTimeSlots.includes(selectedSlot)) {
            toast.error("This time slot is already booked.", { style: toastStyles.error });
        } else {
            setSelectTimeSlot(selectedSlot);
        }
    };

    const isBookedDate = (date) => {
        return bookedDates.some(bookedDate => bookedDate.toDateString() === date.toDateString());
    };

    const countBookingsForDate = (date) => {
        return bookedDates.filter(bookedDate => bookedDate.toDateString() === date.toDateString()).length;
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button className='mt-3 rounded-full w-[150px]'>ຈອງຄິວ</Button>
            </DialogTrigger>
            <DialogContent ref={componentRef}>
                <DialogHeader>
                    <DialogTitle className='text-primary'>ການນັດຈອງ</DialogTitle>
                    <DialogDescription>
                        <div>
                            <div className='grid grid-cols-1 md:grid-cols-2 mt-5 '>
                                <div className='flex flex-col gap-3 items-baseline'>
                                    <h2 className='flex gap-3 items-center'>
                                        <CalendarRange className='text-primary h-5 w-5' />
                                        ເລືອກຄິວ
                                    </h2>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        disabled={isPastDay}
                                        className="rounded-md border"
                                        tileDisabled={({ date }) => {
                                            const formattedDate = date.toISOString().split('T')[0];
                                            return bookedTimeSlots.some(slot => {
                                                const slotDate = slot.split('T')[0];
                                                return slotDate === formattedDate;
                                            });
                                        }}
                                    />
                                    {isBookedDate(date) && (
                                        <p className="text-red-500">This date already has bookings.</p>
                                    )}
                                </div>
                                <div className='mt-3 md:mt-0'>
                                    <h2 className='flex gap-2 items-center mb-5 '>
                                        <Clock className='text-primary h-5 w-5' />
                                        ເລືອກເວລາ
                                    </h2>
                                    <div className='grid grid-cols-3 gap-2 border rounded-lg p-5'>
                                        {timeSlot.map((item, index) => (
                                            <h2
                                                key={index}
                                                onClick={() => handleTimeSlotSelection(item.time)}
                                                className={`p-2 border cursor-pointer text-center
                                                ${bookedTimeSlots.includes(item.time) ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-primary hover:text-red'}
                                                ${item.time === selectTimeSlot && 'bg-primary text-white'}
                                                rounded-full`}
                                            >
                                                {item.time}
                                            </h2>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                {appointment && (
                    <div>
                        <h2 className='text-bold' style={{ color: '#f44336' }}>ອາການເບຶ່ອງຕົ້ນ</h2>
                        <textarea
                            className='text-primary border rounded-lg p-2 h-20 w-full'
                            placeholder="ອາການ..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        ></textarea>
                    </div>
                )}
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <>
                            <Button
                                type="button"
                                disabled={!date || !selectTimeSlot || bookedTimeSlots.includes(selectTimeSlot) || countBookingsForDate(date) >= 3}
                                onClick={() => saveBooking()}
                            >
                                <div className="flex items-center space-x-2">
                                    <CheckCheck className="h-5 w-5" />
                                    <span>ບັນທຶກ</span>
                                </div>
                            </Button>
                        </>
                    </DialogClose>
                    <GeneratePDF appointment={appointment} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default BookAppointment;
