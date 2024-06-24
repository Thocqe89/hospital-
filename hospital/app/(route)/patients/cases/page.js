// "use client";
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import GlobalApi from '@/app/_utils/GlobalApi';
// import styled from 'styled-components';
// import { Button } from 'flowbite-react';
// import DataTable from 'react-data-table-component';
// import { FolderOutput, PencilIcon, UserRoundPlus } from 'lucide-react';
// import Link from 'next/link';
// import { canAccess } from '@/lib/utils';
// import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

// function AllCase({ params }) {
//   const router = useRouter();
//   const { id } = params;  // Use params to get the id from the URL
//   const { user } = useKindeBrowserClient();
//   const [emailData, setEmailData] = useState(null);
//   console.log(user)
//   useEffect(() => {
//     if (user && user.email) {
//       // Fetch email data from the API when the component mounts
//       GlobalApi.getEmail(user.email)
//         .then(response => {
//           console.log('API Response:', response); // Log the entire response object
//           const emailList = response.data.data
//           // console.log(emailList)
//           const foundEmail = emailList.find(item => item.attributes.email
//             === user.email);
//             console.log(foundEmail)
//           setEmailData(foundEmail);
//         })
//         .catch(error => {
//           console.error('Error fetching email:', error);
//         });
//     }
//   }, [user]); 

//   const TextField = styled.input`
//     height: 32px;
//     width: 200px;
//     border-radius: 3px;
//     border-top-left-radius: 5px;
//     border-bottom-left-radius: 5px;
//     border-top-right-radius: 0;
//     border-bottom-right-radius: 0;
//     border: 1px solid #0D7A68;
//     padding: 0 32px 0 16px;
    
//     &:hover {
//       cursor: pointer;
//     }
//   `;

//   const ClearButton = styled(Button)`
//     border-top-left-radius: 0;
//     border-bottom-left-radius: 0;
//     border-top-right-radius: 5px;
//     border-bottom-right-radius: 5px;
//     height: 30px;
//     width: 33px;
//     text-align: center;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   `;

//   const FilterComponentContainer = styled.div`
//     display: flex;
//     align-items: center;
//   `;

//   const FilterButton = styled(Button)`
//     background-color: #0D7A68;
//     color: white;
//     border-radius: 6px;
//     padding: 3px 3px;
//     margin-left: 6px;
//   `;

//   const FilterComponent = ({ filterText, onFilter, onClear }) => (
//     <FilterComponentContainer>
//       <TextField
//         id="search"
//         type="text"
//         placeholder="ຊອກຫາຂໍ້ມູນ"
//         aria-label="Search Input"
//         value={filterText}
//         onChange={onFilter}
//       />
//               {emailData &&canAccess("newpatients",emailData.attributes.role_1.data.attributes.code)&&<Link href="patients/add" passHref>
//         <FilterButton>
//           <div className="flex items-center space-x-2">
//             <UserRoundPlus className="h-5 w-5" />
//             <span>ເພີ່ມຂໍ້ມູນຄົນເຈັບ</span>
//           </div>
//         </FilterButton>
//       </Link>}
//     </FilterComponentContainer>
//   );

 

//   const handleEdit = (row) => {
//     console.log('Edit button clicked for row:', row);
//   };

//   const Filtering = () => {
//     const [filterText, setFilterText] = useState('');
//     const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
//     const [patients, setPatients] = useState([]);
//     const [cases, setCases] = useState([]);
//     const { user } = useKindeBrowserClient();
//   const [emailData, setEmailData] = useState(null);
//   console.log(user)
//   useEffect(() => {
//     if (user && user.email) {
//       // Fetch email data from the API when the component mounts
//       GlobalApi.getEmail(user.email)
//         .then(response => {
//           console.log('API Response:', response); // Log the entire response object
//           const emailList = response.data.data
//           // console.log(emailList)
//           const foundEmail = emailList.find(item => item.attributes.email
//             === user.email);
//             console.log(foundEmail)
//           setEmailData(foundEmail);
//         })
//         .catch(error => {
//           console.error('Error fetching email:', error);
//         });
//     }
//   }, [user]); 

//     useEffect(() => {
//       // Fetch patients data
//       GlobalApi.getPatiented()
//         .then(response => {
//           console.log('Patients API Response:', response);
//           setPatients(response.data.data);
//         })
//         .catch(error => {
//           console.error('Error fetching patients:', error);
//         });

//       // Fetch cases data
//       GlobalApi.getcases()
//         .then(response => {
//           console.log('Cases API Response:', response);
//           setCases(response.data.data);
//         })
//         .catch(error => {
//           console.error('Error fetching cases:', error);
//         });
//     }, []);

//     // Filter cases based on the ID passed in the URL
//     const filteredItems = cases.filter(caseItem => caseItem.id === id);

//     const subHeaderComponentMemo = React.useMemo(() => {
//       const handleClear = () => {
//         if (filterText) {
//           setResetPaginationToggle(!resetPaginationToggle);
//           setFilterText('');
//         }
//       };

//       return (
//         <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
//       );
//     }, [filterText, resetPaginationToggle]);
//     const columns = [
//       // Define your columns here
//       {
//         name: 'ຊື້',
//         selector: row => row.first_name,
//         sortable: true,
//         style: {
//           color: '#0D7A68',
//         },
//       },
//       {
//         name: 'ນາມສະກຸນ',
//         selector: row => row.last_name,
//         sortable: true,
//         style: {
//           color: '#0D7A68',
//         },
//       },
//       {
//         name: 'ເພດ',
//         selector: row => row.gender,
//         sortable: true,
//         style: {
//           color: '#0D7A68',
//         },
//       },
//       {
//         name: 'ບ້ານ',
//         selector: row => row.village,
//         sortable: true,
//         style: {
//           color: '#0D7A68',
//         },
//       },
//       {
//         name: 'ເມືອງ',
//         selector: row => row.district,
//         sortable: true,
//         style: {
//           color: '#0D7A68',
//         },
//       },
//       {
//         name: 'ແຂວງ',
//         selector: row => row.province,
//         sortable: true,
//         style: {
//           color: '#0D7A68',
//         },
//       },
//       {
//         name: 'ປະເທດ',
//         selector: row => row.country,
//         sortable: true,
//         style: {
//           color: '#0D7A68',
//         },
//       },
//       {
//         name: 'ວັນ/ເດືອນ/ປີເກີດ',
//         selector: row => row.date_of_birth,
//         sortable: true,
//         style: {
//           color: '#0D7A68',
//         },
//       },
//       {
//         name: 'ເລກທີເອກະສານຍືນຍັນໂຕຕົນ',
//         selector: row => row.identify_familybook_passport,
//         sortable: true,
//         style: {
//           color: '#0D7A68',
//         },
//       },
//       {
//         name: 'ອາການແພ້',
//         selector: row => row.disease_diagnoses,
//         sortable: true,
//         style: {
//           color: '#0D7A68',
//         },
//       },
//       {
//         name: 'ເບີຕິດຕໍ່',
//         selector: row => row.phone_number,
//         sortable: true,
//         style: {
//           color: '#0D7A68',
//         },
//       },
//       {
//         name: '',
//         cell: row => (
//           <>
//         <Link href={`/patients/${row.id}`} passHref>
//               <Button
//                 onClick={() => handleEdit(row)}
//                 style={{ backgroundColor: 'transparent', color: '#0D7A68', border: 'none', padding: '0', cursor: 'hover' }}
//               >
//                 <PencilIcon className="hover:text-red-500" size={22} />
//               </Button>
//             </Link>
//             <Link href={`/patients/cases/${row.id}`} passHref>
//               <Button
//                 style={{ backgroundColor: 'transparent', color: '#0D7A68', border: 'none', padding: '0', cursor: 'hover' }}
//               >
//                 <FolderOutput className="hover:text-red-600"  size={22} />
//               </Button>
//             </Link>
//           </>
//         ),
//         ignoreRowClick: true,
//         allowOverflow: true,
//         button: true,
//       },
//     ];

//     return (
//       <DataTable
//         title={<span style={{ color: '#0D7A68' }} className="text-3xl font-bold">ຂໍ້ມູນຄົນເຈັບ</span>}
//         columns={columns}
//         data={filteredItems}
//         pagination
//         paginationResetDefaultPage={resetPaginationToggle}
//         subHeader
//         subHeaderComponent={subHeaderComponentMemo}
//         selectableRows
//         persistTableHead
//         customStyles={{
//           headCells: {
//             style: {
//               color: '#0D7A68',
//               backgroundColor: '#C6C4C4',
//               fontSize: '15px',
//               fontWeight: 'bold',
//             },
//           },
//         }}
//       />
//     );
//   };

//   return <Filtering />;
// }

// export default AllCase;
