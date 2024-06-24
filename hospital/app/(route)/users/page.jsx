"use client";
import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi'; // Import GlobalApi
import styled from 'styled-components';
import { Button } from 'flowbite-react';
import DataTable from 'react-data-table-component';
import { ArrowDownToLine, Cog, FolderOutput, PencilIcon, User, UserCog, UserPlus, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { canAccess } from '@/lib/utils';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #0D7A68;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 30px;
  width: 33px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterComponentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FilterButton = styled(Button)`
  background-color: #0D7A68;
  color: white;
  border-radius: 6px;
  padding: 3px 3px;
  margin-left: 6px;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <FilterComponentContainer>
    <TextField
      id="search"
      type="text"
      placeholder="ຊອກຫາຂໍ້ມູນ"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />

    {/* <Link href="users/AddNew" passHref>
      <FilterButton>
        <div className="flex items-center space-x-2">
        <UserPlus className="h-5 w-5" />
          <span>ເພີ່ມຜູ້ໃຊ້</span>
        </div>
      </FilterButton>
    </Link> */}
    
      <FilterButton>
        <div className="flex items-center space-x-2">
        <User className="h-5 w-5" />
          <span>ຂໍ້ມູນພະນັກງານ</span>
        </div>
      </FilterButton>
   
  </FilterComponentContainer>
);


const handleEdit = (row) => {
  console.log('Edit button clicked for row:', row);
};

const customStyles = {
  cells: {
    style: {
      wordWrap: 'break-word', // Ensure that long content wraps to the next line
      maxWidth: '300px', // Set a maximum width for the cells
    },
  },
};

const Filtering = () => {
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [getDoctorlist, setGetDoctorlist] = useState([]);
  const { user } = useKindeBrowserClient();
  const [emailData, setEmailData] = useState(null);
  console.log(user)
  useEffect(() => {
    if (user && user.email) {
      // Fetch email data from the API when the component mounts
      GlobalApi.getEmail(user.email)
        .then(response => {
          console.log('API Response:', response); // Log the entire response object
          const emailList = response.data.data
          // console.log(emailList)
          const foundEmail = emailList.find(item => item.attributes.email
            === user.email);
            console.log(foundEmail)
          setEmailData(foundEmail);
        })
        .catch(error => {
          console.error('Error fetching email:', error);
        });
    }
  }, [user]); 
  useEffect(() => {
    // Fetch doctor data from the API when the component mounts
    GlobalApi.getDoctorlist()
      .then(response => { // Log the entire response object
        setGetDoctorlist(response.data.data); // Set the fetched data to the doctor list state
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  console.log('getDoctorlist:', getDoctorlist); // Log doctor list before rendering the table

  // Filter doctors based on search query
  const filteredItems = getDoctorlist.filter(doctor => {
    const { first_name, phone_number, email } = doctor.attributes;
    const searchRegex = new RegExp(filterText, 'i'); // Case-insensitive search

    return (
      searchRegex.test(first_name) ||
   

      searchRegex.test(phone_number) ||

      searchRegex.test(email)

    );
  }).map(doctor => ({ ...doctor.attributes, id: doctor.id })); // Flatten the structure for the DataTable

  console.log("=> filteredItems", filteredItems);

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle]);
  const columns = [
    {
      name: 'ຊື້',
      selector: row => row.first_name,
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ນາມສະກຸນ',
      selector: row => row.last_name,
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#027B84',
      },
    },
    {
      name: 'ເພດ',
      selector: row => row.gender,
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ບ້ານ',
      selector: row => row.village,
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ເມືອງ',
      selector: row => row.district,
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ແຂວງ',
      selector: row => row.province,
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ປະເທດ',
      selector: row => row.country,
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ວັນ/ເດືອນ/ປີເກີດ',
      selector: row => row.date_of_birth,
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ເບີຕິດຕໍ່',
      selector: row => row.phone_number,
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ຈົບຈາກ',
      selector: row => row.graduation_at,
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ຈົບໃນປີ',
      selector: row => row.graduation_date,
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ປີປະສົບການ',
      selector: row => row.experience_year,
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ອີເມວ',
      selector: row => row.email,
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ລະຫັດຜ່ານ',
      selector: row => row.password,
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#f44336',
      },
    },
    {
      name: 'ສ້າງວັນທີ',
      selector: row => row.createdAt,
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ຕຳແໜ່ງ',
      selector: row => row.role_1?.data?.attributes?.status || 'N/A',
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ພະແນກ',
      selector: row => row.employees.data[0]?.attributes.name,
      sortable: true,
      wrap: true,
      width: '200px', // Set a specific width for the column
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: '',
      cell: row => (
        <>
        {emailData &&canAccess("patientsCasesButtonNew",emailData.attributes.role_1.data.attributes.code)&&<Link href={`/users/${row.id}`} passHref>
            <Button
              onClick={() => handleEdit(row)}
              style={{ backgroundColor: 'transparent', color: '#0D7A68', border: 'none', padding: '0', cursor: 'pointer' }}
            >
              <UserCog className="group-hover:text-red-500 group-hover:scale-125 transition-transform duration-200" size={22} />
            </Button>
          </Link>}
          
  
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  
  ];

  return (
    <DataTable
      title={<span style={{ color: '#0D7A68' }} className="text-3xl font-bold">ຂໍ້ມູນພະນັກງານ</span>}
      columns={columns}
      data={filteredItems}
      pagination
      paginationResetDefaultPage={resetPaginationToggle}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      selectableRows
      persistTableHead
      customStyles={{
        headCells: {
          style: {
            color: '#0D7A68',
            backgroundColor: '#C6C4C4',
            fontSize: '15px',
            fontWeight: 'bold', // Set the color of the header cell text
          },
        },
        rows: {
          highlightOnHoverStyle: {
            backgroundColor: '#D7E7F2',
            borderBottomColor: '#FFFFFF',
            borderRadius: '25px',
            outline: '1px solid #FFFFFF',
          },
        },
      }}
    />
  );
};

export default Filtering;
