import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #0D7A68;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Message = styled.div`
  margin-top: 10px;
`;

const LoadingSpinner = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner />
      {!isOnline && <Message>ບໍ່ມີການເຊື່ອມຕໍ່ອິນເຕີເນັດ</Message>}
    </div>
  );
};

export default LoadingSpinner;
