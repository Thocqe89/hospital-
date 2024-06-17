"use client"
import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from 'flowbite-react';
import { Printer, Download } from 'lucide-react'; // Assuming Download icon is available in lucide-react
import GlobalApi from '@/app/_utils/GlobalApi';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import Image from 'next/image';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { height } from '@mui/system';


const PrintPage = () => {
  const { id } = useParams();
  const componentRef = useRef();
  const [caseData, setCaseData] = useState(null);
  const canvasRef = useRef(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    if (id) {
      GlobalApi.getPatientByCaseId(id)
        .then(response => {
          console.log('API response:', response); // Log the full response for debugging
          const caseDetails = response.data.data;
          console.log('Case details:', caseDetails); // Log the case details for debugging
          setCaseData(caseDetails);
          generateQRCode(caseDetails);
        })
        .catch(error => {
          console.error('Error fetching case data:', error);
        });

    }
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString('en-US', options));
  }, [id]);

  const generateQRCode = async (caseDetails) => {
    try {
      const canvas = canvasRef.current;
      await QRCode.toCanvas(canvas, JSON.stringify(caseDetails), {
        errorCorrectionLevel: 'L', // or 'M'
        color: {
          dark: '#0D7A68',
          //  backgroundColor: '#ffffff' // Background color for the QR code


        },
        width: 150,
        height: 150,
      });
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleSavePDF = () => {
    const pdf = new jsPDF();
    const component = componentRef.current;

    html2canvas(component)
      .then((canvas) => {
        const imageData = canvas.toDataURL('image/png');
        const imgWidth = 210; // Width of A4 paper in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Height in mm

        pdf.addImage(imageData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('setthathirath hospital +.pdf');
      })
      .catch((error) => {
        console.error('Error saving PDF:', error);
      });
  };
  return (
    <div className='text-primary   flex flex-col justify-center items-center'>
      <div className='flex items-center gap-10 mt-10'>
        <h2 className="text-2xl font-bold">ປີ້ນບິນໄອດີທີ: <span className='text-rose-700 font-bold'>{id}</span></h2>
        <span>
          <ReactToPrint
            trigger={() => (
              <Button type="button" className="ml-2 text-primary">
                <div className="flex items-center space-x-2">
                  <Printer className="h-5 w-5" />
                  <span>Print</span>
                </div>
              </Button>
            )}
            content={() => componentRef.current}
          />
        </span>
        <Button type="button" className="ml-2 text-primary" onClick={handleSavePDF}>
          <div className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Save as PDF</span>
          </div>
        </Button>

      </div>

      <div ref={componentRef} className="a4-page " style={{
        // backgroundImage: 'url("/101.jpg")',
        backgroundSize: 'cover',
        // color: 'black',
        backgroundPosition: 'center ',
        position: 'relative' // Ensure z-index works
      }}>
        {caseData ? (
          <div className=' text-primary'>
            <div className='flex items-center gap-10'>

              <Image src='/logoS.png' alt='logo' width={100} height={100} />
              <h2 className='text-primary text-start font-bold text-xl'>ໂຮງຫມໍ ເສດຖາທິຣາດ <samp className='text-rose-700 font-bold '>+</samp>


                <h2>Setthathirath Hospital</h2>

              </h2>

            </div>
            <div className='items-end'>
              <h2 className="text-1xl text-end font-bold">ເລກທີ: <span className='text-rose-700 text-2xl  font-bold'>00{id}</span>/ສທຣ</h2>
            </div>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              width: '720px', // Set the desired width
              height: '840px' // Set the desired height
            }} className='p-4 border mt-2 rounded-lg shadow-sm'>
              <di className='items-strat text-1xl '>
                <div className='text-start'>
                  <div className='grid grid-cols-2'>
                    <p><strong className='text-primary'>ຊື້:</strong> {caseData.attributes.patient_1_.data.attributes.first_name}</p>
                    <p><strong>ນາມສະກຸນ:</strong> {caseData.attributes.patient_1_.data.attributes.last_name}</p>
                    <p><strong>ເພດ:</strong> {caseData.attributes.patient_1_.data.attributes.gender}</p>
                    <p><strong>ເບີໂທ:</strong> {caseData.attributes.patient_1_.data.attributes.phone_number}</p>
                    <p><strong>ບ້ານ:</strong> {caseData.attributes.patient_1_.data.attributes.village}</p>
                    <p><strong>ເມືອງ:</strong> {caseData.attributes.patient_1_.data.attributes.district}</p>
                    <p><strong>ແຂວງ:</strong> {caseData.attributes.patient_1_.data.attributes.province}</p>
                    <p><strong>ປະເທດ:</strong> {caseData.attributes.patient_1_.data.attributes.country}</p>
                    <p><strong>Emergency Contact:</strong> {caseData.attributes.patient_1_.data.attributes.emergency_name} </p>
                    <p><strong>kk:</strong> {caseData.attributes.patient_1_.data.attributes.emergency_phone_number}</p>
                    <p><strong>Date of Birth:</strong> {caseData.attributes.patient_1_.data.attributes.date_of_birth}</p>
                    <p><strong>Insurance Name:</strong> {caseData.attributes.patient_1_.data.attributes.insurance_name}</p>
                    <p><strong>Insurance End Date:</strong> {caseData.attributes.patient_1_.data.attributes.insurance_end_date}</p>
                    <p><strong>ເອກະສານຍືນຍັນຕົວຕົນ:</strong> {caseData.attributes.patient_1_.data.attributes.identify_familybook_passport}</p>
                    {/* <p><strong>Payment Amount:</strong> {caseData.attributes.patient_1_.data.attributes.prayment_amount}</p> */}
                    {/* <p><strong>Payment Date:</strong> {caseData.attributes.patient_1_.data.attributes.prayment_date}</p> */}
                  </div>
                  <h2 className='text-center text-rose-700 text-2xl  font-bold'>ຂໍ້ມູນການປີ້ນປົວ</h2>

                  <div style={{

                    backdropFilter: 'blur(10px)',
                    width: '680px', // Set the desired width
                    height: '438px' // Set the desired height
                  }} className='bg-gray-200 border-[1px] p-10 mt-6 rounded-lg'>

                    <p><strong>ວັນທີເຂົ້າຮັກສາ:</strong> {caseData.attributes.createdAt}</p>
                    <p><strong>ອາການ:</strong><div>{caseData.attributes.symptom}</div> </p>
                    <p><strong>ການປີ້ນປົວ:</strong> <div>{caseData.attributes.treatment}</div></p>
                    <p ><strong>ຍາ ແລະ ອຸປະກອນ:</strong> <div>{caseData.attributes.medical_detail}</div></p>
                    
                    <div style={{
                      marginTop: '190px', // Adjust this value to move the QR code down
                      display: 'flex',
                      justifyContent: 'flex-end', // Align to the right
                      transform: 'scale(0.8)', // Scale down if necessary
                      marginRight: '-115px' // Adjust this value to move the QR code to the right
                    }}>
                      <canvas ref={canvasRef} />
                      <br>
                      </br>
                    </div>
                    <p className="text-sm text-end text-primary">ວັນທີ: {currentDate} ນະຄອນຫຼວງວຽງຈັນ ສປປລາວ</p>

                    {/* <p><strong>Updated At:</strong> {caseData.attributes.updatedAt}</p> */}
                  </div>
                </div>

              </di>



            </div>
            <div className='text-center  '>

              <span className=''>
                <h2 className=" text-gray-500">

                  <br class="mb-2" />
                  ຖະນົນ ກຳແພງເມືອງ ບ້ານດອນກອຍ ເມືອງໄຊເສດຖາ ນະຄອນຫຼວງວຽງຈັນ
                  <br class="mb-2" />

                  ອີເມວ : hospitalsetthathirath@gmail.com
                  <br class="mb-2" />
                  ເບີ :030 5725978

                </h2>
              </span>
            </div>
          </div>

        ) : (
          <p>Loading case data...</p>
        )}
      </div>

      <style jsx>{`
        .a4-page {
          width: 21cm;
          height: 29.7cm;
          padding: 1cm;
          margin: auto;
          background: white;
          box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-top: 20px;
        }
        .content {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .column {
          width: 48%;
          background-color: white;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow-wrap: break-word;
        }
        .text-center {
          text-align: center;
        }
         .qr-code {
          margin-top: 10px; /* Adjust this value to move the QR code down */
          display: flex;
          justify-content: flex-end; /* Align to the left */
          transform: scale(0.8); /* Scale down if necessary */
          margin-right: -80px; /* Adjust this value to move the QR code to the right */
             
        }
        @media print {
          .a4-page {
            width: 21cm;
            height: 29.7cm;
            padding: 0.5cm;
            margin: 0;
            box-shadow: none;
          }
          .content {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .column {
            width: 48%;
            padding: 10px;
            box-shadow: none;
            break-inside: avoid;
          }
        }
      `}</style>

    </div>
  );
};

export default PrintPage;

