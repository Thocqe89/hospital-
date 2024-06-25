"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Bookinglist from './_components/Bookinglist';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

function Mybook() {
  const { user } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);

  const getBookingList = useCallback(() => {
    if (user) {
      console.log('Fetching booking list for:', user.email);
      GlobalApi.getBookinglist(user.email)
        .then(resp => {
          console.log('Booking API Response:', resp.data);
          setBookingList(resp.data.data);
        })
        .catch(error => {
          console.error('Error fetching booking data:', error.response ? error.response.data : error.message);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      console.log('User found:', user);
      getBookingList();
    } else {
      console.log('No user found');
    }
  }, [user, getBookingList]);

  const handleAcceptBooking = (id) => {
    GlobalApi.updateBookingStatus(id, { isAccepted: true })
      .then(resp => {
        console.log('Booking accepted:', resp.data);
        getBookingList(); // Refresh the booking list after acceptance
      })
      .catch(error => {
        console.error('Error accepting booking:', error.response ? error.response.data : error.message);
      });
  };

  const filterUserBooking = (type) => {
    const today = new Date();
    if (type === 'booking') {
      return bookingList;
    } else if (type === 'today') {
      return bookingList.filter(item => {
        const bookingDate = new Date(item.attributes.Date);
        return isSameDay(bookingDate, today);
      });
    } else if (type === 'expired') {
      return bookingList.filter(item => {
        const bookingDate = new Date(item.attributes.Date);
        return bookingDate < today && !isSameDay(bookingDate, today);
      });
    } else if (type === 'all') {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      return bookingList.filter(item => {
        const bookingDate = new Date(item.attributes.Date);
        return isSameDay(bookingDate, yesterday);
      });
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  return (
    <div className='px-4 ms:px-10 mt-10'>
      <div className='text-primary text-3xl font-bold'>ລາຍການຈອງ</div>

      <Tabs defaultValue="booking" className="w-full mt-5">
        <TabsList className='w-full justify-start'>
          <TabsTrigger value="booking">ລາຍການທັງມົດ</TabsTrigger>
          <TabsTrigger value="today">ລາຍການຈອງມື້ນີ້</TabsTrigger>
          <TabsTrigger value="expired">ລາຍການຈອງທີພ່ານນມາ</TabsTrigger>
        </TabsList>
        <TabsContent value="booking">
          <Bookinglist bookings={filterUserBooking('booking')} onAccept={handleAcceptBooking} />
        </TabsContent>
        <TabsContent value="today">
          <Bookinglist bookings={filterUserBooking('today')} onAccept={handleAcceptBooking} />
        </TabsContent>
        <TabsContent value="expired">
          <Bookinglist bookings={filterUserBooking('expired')} onAccept={handleAcceptBooking} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Mybook;
