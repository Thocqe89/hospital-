import { Sparkles } from 'lucide-react';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: red;
  animation: ${bounce} 1s ease infinite;
`;

const NoInternet = () => (
  <Message className='text-primary'> <Sparkles  size={50} />
  <h2>ບໍ່ມີການເຊື່ອມຕໍ່ອິນເຕີເນັດ ກະລຸກວດຊອບການເຊື່ອມຕໍ່ອິນເຕີເນັດ </h2> </Message>
);

export default NoInternet;
