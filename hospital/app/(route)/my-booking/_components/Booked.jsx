import React from 'react';
import PropTypes from 'prop-types';
import GlobalApi from '@/app/_utils/GlobalApi';

function AcceptBookingButton({ bookingId, onAccept }) {
  const handleAcceptBooking = () => {
    GlobalApi.updateBookingStatus(bookingId, { isAccepted: true })
      .then(resp => {
        console.log('Booking accepted:', resp.data);
        onAccept(); // Refresh the booking list after acceptance
      })
      .catch(error => {
        console.error('Error accepting booking:', error);
      });
  };

  return (
    <button
      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      onClick={handleAcceptBooking}
    >
      Accept
    </button>
  );
}

AcceptBookingButton.propTypes = {
  bookingId: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired
};

export default AcceptBookingButton;
