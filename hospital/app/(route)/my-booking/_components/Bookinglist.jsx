import React from 'react';

function Bookinglist({ bookings }) {
  return (
    
    <div className=" grid gap-4 lg:grid-cols-2 xl:grid-cols-3  ">
      
      

      {bookings && bookings.map((booking, index) => (
        <div 
          key={index} 
          className="p-4 border mt-2 rounded-lg shadow-sm bg-white"
          style={{ 
            backgroundImage: 'url("/82.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center ', 
            position: 'relative' // Ensure z-index works
          }}
        >
           <p className="text-lg text-gray-800">
            <strong className='text-primary' >ຄິວທີ:</strong> 
            <span className='text-red-800  font-bold ' style={{ fontSize: "50px" }}>{booking.attributes.Time}</span>
          </p>
          <p className="text-lg d text-gray-800">
            <strong className='text-primary font-semibol '>ຈອງໂດຍ:</strong> <spans> {booking.attributes.UserName}</spans>
          </p>
          {/* <p className="text-gray-600">
            <strong>Email:</strong> {booking.attributes.Email}
          </p> */}
          <p className="text-gray-600">
            <strong className='text-primary' >ເວລາ:</strong> {new Date(booking.attributes.Date).toLocaleString()}
          </p>
          <p className="text-gray-600">
            <strong className='text-primary' >ອາການເບຶ່ອຕົ້ນ:</strong> {booking.attributes.Note}
          </p>
         
        </div>
      ))}
    </div>
  );
}

export default Bookinglist;
