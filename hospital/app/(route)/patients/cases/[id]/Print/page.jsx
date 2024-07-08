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
import Link from 'next/link';


const PrintPage = () => {
  const { id } = useParams();
  const componentRef = useRef();
  const [caseData, setCaseData] = useState(null);
  const canvasRef = useRef(null);
  const [currentDate, setCurrentDate] = useState('');
  console.log('caseData response:', caseData);


  useEffect(() => {
    if (id) {
      GlobalApi.getPatientCase(id)
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

  const formatPaymentAmount = (amount) => {
    // Convert amount to number and round to 2 decimal places
    const formattedAmount = parseFloat(amount || 0).toFixed(2);

    // Split the amount into integer and decimal parts
    const parts = formattedAmount.split('.');

    // Insert commas for thousands separator
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Join integer and decimal parts with periods
    return parts.join('.') + ' LAK';
  };

  const generateQRCode = async () => {
    try {
      // Get the href attribute from the Link component
      const imageUrl = `${window.location.origin}/x-ray.jpg`;
      // Generate the QR code data URL using the href
      const qrCodeDataURL = await QRCode.toDataURL(href);
      // Get the canvas reference
      const canvas = canvasRef.current;
      // Get the canvas context
      const context = canvas.getContext('2d');
      // Create an image element
      const img = new Image();
      // Set the image source to the QR code data URL
      img.src = qrCodeDataURL;
      // When the image is loaded, draw it on the canvas
      img.onload = () => {
        context.drawImage(img, 0, 0);
      };
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
      <div className='flex items-center gap-10 mt-8'>
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
        // backgroundImage: 'url("/91.jpg")',
        backgroundSize: 'cover',
        // color: 'black',
        backgroundPosition: 'center ',
        position: 'relative' // Ensure z-index works
      }}>
        {caseData ? (
          <div className=' text-primary'>
            {/* <div className='flex items-center gap-10'>

              <Image src='/logoS.png' alt='logo' width={100} height={100} />
              <h2 className='text-primary text-start font-bold text-xl'>ໂຮງຫມໍ ເສດຖາທິຣາດ <samp className='text-rose-700 font-bold '>+</samp>
             
                <h2>Setthathirath Hospital</h2>
                
              
              </h2>

            </div> */}
            <div className='grid grid-cols-2'>
              <div className='flex items-center gap-10'>

                <Image src='/logoS.png' alt='logo' width={100} height={100} />
                <h2 className='text-primary text-start font-bold text-xl'>ໂຮງຫມໍ ເສດຖາທິຣາດ <samp className='text-rose-700 font-bold '>+</samp>

                  <h2>Setthathirath Hospital</h2>


                </h2>

              </div>
              <div className="text-end">
                <span className="text-1xl ">ເລກທີ: <span className='text-rose-700  font-bold '>00{id}</span>/ສຖທຣ</span>
                <p className="text-sm text-end text-primary">ວັນທີ: <span className='font-bold'>{currentDate} </span> </p>
                <p className="text-sm text-end text-primary">ນະຄອນຫຼວງວຽງຈັນ ສປປລາວ</p>
              </div>
            </div>


            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              width: '720px', // Set the desired width
              height: '840px' // Set the desired height
            }} className='p-4 border mt-2 rounded-lg '>

              <di className='items-strat text-1xl '>
                <div className='text-start'>
                  <div className='  grid grid-cols-2'>
                    <p><strong className='text-primary'>ຊື້:</strong> {caseData.attributes.patient_1_.data.attributes.first_name}</p>
                    <p><strong>ນາມສະກຸນ:</strong> {caseData.attributes.patient_1_.data.attributes.last_name}</p>
                    <p><strong>ເພດ:</strong> {caseData.attributes.patient_1_.data.attributes.gender}</p>
                    <p><strong>ເບີໂທ:</strong> {caseData.attributes.patient_1_.data.attributes.phone_number}</p>
                    <p><strong>ບ້ານ:</strong> {caseData.attributes.patient_1_.data.attributes.village}</p>
                    <p><strong>ເມືອງ:</strong> {caseData.attributes.patient_1_.data.attributes.district}</p>
                    <p><strong>ແຂວງ:</strong> {caseData.attributes.patient_1_.data.attributes.province}</p>
                    <p><strong>ປະເທດ:</strong> {caseData.attributes.patient_1_.data.attributes.country}</p>
                    <p><strong>ວັນເດືອນປີເກີດ:</strong> {caseData.attributes.patient_1_.data.attributes.date_of_birth}</p>
                    <p><strong>ຜູ້ຕິດຕໍ້ສຸເສີນ:</strong> {caseData.attributes.patient_1_.data.attributes.emergency_name} </p>
                    <p><strong>ເບີຜູ້ຕິດຕໍ້ສຸເສີນ:</strong> {caseData.attributes.patient_1_.data.attributes.emergency_phone_number}</p>
                    <p><strong>ບໍລິສັດປະກັນໄພ:</strong> {caseData.attributes.patient_1_.data.attributes.insurance_name}</p>
                    <p><strong>ວັນທີ່ເລີ່ມປະກັນໄພ:</strong> {caseData.attributes.patient_1_.data.attributes.insurance_strat_date}</p>
                    <p><strong>ວັນທີ່ສິ້ນສຸດປະກັນໄພ:</strong> {caseData.attributes.patient_1_.data.attributes.insurance_end_date}</p>
                    <p><strong>ເອກະສານຍືນຍັນຕົວຕົນ:</strong> {caseData.attributes.patient_1_.data.attributes.identify_familybook_passport}</p>
                    {/* <p><strong>Payment Amount:</strong> {caseData.attributes.patient_1_.data.attributes.prayment_amount}</p> */}
                    {/* <p><strong>Payment Date:</strong> {caseData.attributes.patient_1_.data.attributes.prayment_date}</p> */}
                  </div>
                </div>

                <div><h2 className='text-center text-rose-700 text-2xl  font-bold'>ຂໍ້ມູນການປີ້ນປົວ</h2></div>


                <div style={{

                  backdropFilter: 'blur(10px)',
                  width: '680px', // Set the desired width
                  Height: '330px' // Set the desired height
                }} className='bg-gray-200 border-[1px] p-10 mt-6 rounded-lg'>
                  <div> </div>
                  <p className='text-center'><strong>ວັນທີເຂົ້າຮັກສາ:</strong> {caseData.attributes.createdAt}</p>
                  <p>
                    <strong>ທານໝໍ:   </strong><span className=' text-1xl  font-bold'>
                      {caseData.attributes.user_1s.data?.map((userData, index) => (
                        <span key={index}>{userData.attributes.first_name} {userData.attributes.last_name}</span>
                      ))}
                    </span>
                  </p>

                  <p><strong>ອາການ:</strong><div>{caseData.attributes.symptom}</div> </p>
                  <p><strong>ການປີ້ນປົວ:</strong> <div>{caseData.attributes.treatment}</div></p>
                  <p ><strong>ຍາ ແລະ ອຸປະກອນ:</strong> <div>{caseData.attributes.medical_detail}</div></p>



                  {/* <p><strong>Updated At:</strong> {caseData.attributes.updatedAt}</p> */}
                </div>
                <div className='mt-2'>
                  <p className="text-strat text-primary">
                    ອອກບິນໂດຍ: <span className="text-gray-500"> {caseData.attributes.user_1s.data[0]?.attributes.first_name} <span> {caseData.attributes.user_1s.data[0]?.attributes.last_name}</span>
 
                    </span>
                  </p>

                </div>
                <div className='text-end'>
                  <p className="text-strat text-primary"> ລວມລາຍຈ່າຍ:
                    <div className="text-rose-700 font-bold text-2xl">
                      {formatPaymentAmount(caseData.attributes.prayment_amount)}
                    </div>
                  </p>
                </div>

                <div style={{
                  marginTop: '-5px', // Adjust this value to move the QR code down
                  display: 'flex',
                  justifyContent: 'flex-end', // Align to the right
                  transform: 'scale(0.8)', // Scale down if necessary
                  marginRight: '-70px' // Adjust this value to move the QR code to the right
                }}>
                  <Image src="/xay.png" alt="X-Ray" width={150} height={150} />

                </div>




              </di>



            </div>
            <div className='text-center  '>

              <span className=' y'>

                <h2 className=" text-gray-500">

                  <br className="mb-2" />
                  ຖະນົນ ກຳແພງເມືອງ ບ້ານດອນກອຍ ເມືອງໄຊເສດຖາ ນະຄອນຫຼວງວຽງຈັນ
                  <br className="mb-2" />

                  ອີເມວ : hospitalsetthathirath@gmail.com
                  <br className="mb-2" />
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
          box-shadow: 0 0 0.5cm rgba(0,0,0,0.0);
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

