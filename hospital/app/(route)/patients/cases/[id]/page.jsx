"use client"
import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi'; // Import GlobalApi
import styled from 'styled-components';
import { Button } from 'flowbite-react';
import DataTable from 'react-data-table-component';
import { Banknote, FileText, Folders, PencilIcon, View } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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
  
    &:hover {
      cursor: pointer;
    }
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

const FilterComponent = ({ filterText, onFilter, onClear, id }) => (
  <FilterComponentContainer>
    <TextField
      id="search"
      type="text"
      placeholder="ຊອກຫາຂໍ້ມູນ"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <Link href={`/patients/cases/${id}/newcases`} passHref>
      <FilterButton>
        <div className="flex items-center space-x-2">
          <Folders className="h-5 w-5" />
          <span>ເພີ່ມການຮັກສາ</span>
        </div>
      </FilterButton>
    </Link>
  </FilterComponentContainer>
);

const columns = [
  {
    name: 'ຊື້ຄົນເຈັບ',
    selector: row => row.patientName,
    sortable: true,
    style: {
      color: '#0D7A68',
    },
  },
  {
    name: 'ອາການ',
    selector: row => row.symptom,
    sortable: true,
    style: {
      color: '#0D7A68',
    },
  },
  {
    name: 'ການຮັກສາ',
    selector: row => row.treatment,
    sortable: true,
    style: {
      color: '#0D7A68',
    },
  },
  {
    name: 'ຍາ ແລະ ອຸປະກອນການຮັກສາ',
    selector: row => row.medical_detail,
    sortable: true,
    style: {
      color: '#0D7A68',
    },
  },
  // {
  //   name: 'Updated At',
  //   selector: row => row.updatedAt,
  //   sortable: true,
  //   style: {
  //     color: '#0D7A68',
  //   },
  // },
  {
    name: 'Created At',
    selector: row => row.createdAt,
    sortable: true,
    style: {
      color: '#0D7A68',
    },
  },
  {
    name: 'ທ່ານໝໍ',
    selector: row => row.userName,
    sortable: true,
    style: {
      color: '#0D7A68',
      textAlign: 'center',
    },
  },
  {
    name: '',
    cell: row => (
      <>
        <Link href={`/patients/cases/${row.id}/Print`} passHref>
          <Button
            style={{ backgroundColor: 'transparent', color: '#0D7A68', border: 'none', padding: '0', cursor: 'hover' }}
          >
            <FileText className="group-hover:text-red-500 group-hover:scale-125 transition-transform duration-200" size={22} />
          </Button>
        </Link>


        {/* <Link href={`/patients/${row.id}`} passHref>
          <Button
            onClick={() => handleEdit(row)}
            style={{ backgroundColor: 'transparent', color: '#0D7A68', border: 'none', padding: '0', cursor: 'pointer' }}
          >
            <PencilIcon className="group-hover:text-red-500 group-hover:scale-125 transition-transform duration-200" size={22} />
          </Button>
        </Link> */}

        <Link href={`/patients/cases/${row.id}/edit`} passHref>
          <Button
            onClick={() => handleEdit(row)}
            style={{ backgroundColor: 'transparent', color: '#0D7A68', border: 'none', padding: '0', cursor: 'pointer' }}
          >
            <Banknote className="group-hover:text-red-500 group-hover:scale-125 transition-transform duration-200" size={22} />
          </Button>
        </Link>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

const handleEdit = (row) => {
  console.log('Edit button =>:', row);
};

const Filtering = () => {
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [cases, setCases] = useState([]);
  const { id } = useParams();
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
    if (id) {
      GlobalApi.getcasesByUserId(id)
        .then(response => {
          // console.log('API Response:', response); // Log the entire response
          setCases(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching cases:', error);
        });
    }
  }, [id]);

  const filteredItems = cases.filter(caseItem => {
    const { medical_detail, symptom, treatment, patient_1_, user_1s } = caseItem.attributes;
    const searchRegex = new RegExp(filterText, 'i');
    return (
      searchRegex.test(medical_detail) ||
      searchRegex.test(symptom) ||
      searchRegex.test(treatment) ||
      (patient_1_?.data?.attributes?.first_name && searchRegex.test(patient_1_.data.attributes.first_name)) ||
      (user_1s?.data?.some(user => searchRegex.test(user.attributes.first_name)))
    );
  }).map(caseItem => {
    const { patient_1_, user_1s,payment } = caseItem.attributes;
    return {
      id: caseItem.id,
      patientName: patient_1_?.data?.attributes?.first_name || '',
      userName: user_1s?.data?.length > 0 ? user_1s.data[0].attributes.first_name : '',
      symptom: caseItem.attributes.symptom,
      treatment: caseItem.attributes.treatment,
      medical_detail: caseItem.attributes.medical_detail,
      updatedAt: caseItem.attributes.updatedAt,
      createdAt: caseItem.attributes.createdAt,
      prayment_amount: caseItem?.attributes?.prayment_amount || '',

    };
  });

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} id={id} />
    );
  }, [filterText, resetPaginationToggle, id]);
  const columns = [
    {
      name: 'ຊື້ຄົນເຈັບ',
      selector: row => row.patientName,
      sortable: true,
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ອາການ',
      selector: row => row.symptom,
      sortable: true,
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ການຮັກສາ',
      selector: row => row.treatment,
      sortable: true,
      style: {
        color: '#0D7A68',
      },
    },
    {
      name: 'ຍາ ແລະ ອຸປະກອນການຮັກສາ',
      selector: row => row.medical_detail,
      sortable: true,
      style: {
        color: '#0D7A68',
      },
    },
    // {
    //   name: 'Updated At',
    //   selector: row => row.updatedAt,
    //   sortable: true,
    //   style: {
    //     color: '#0D7A68',
    //   },
    // },
    {
      name: 'Created At',
      selector: row => row.createdAt,
      sortable: true,
      style: {
        color: '#0D7A68',
      },
    },
    // {
    //   name: 'ທ່ານໝໍ',
    //   selector: row => row.first_name,
    //   sortable: true,
    //   style: {
    //     color: '#0D7A68',
    //     textAlign: 'center',
    //   },
    // },
    {
      name: 'ລວມລາຍຈ່າຍ',
      selector: row => row.prayment_amount,
      sortable: true,
      style: {
        color: '#0D7A68',
        textAlign: 'center',
        fontWeight: 'bold', // Make the text bold
      },
    },
    {
      name: '',
      cell: row => (
        <>
        


          {/* <Link href={`/patients/${row.id}`} passHref>
            <Button
              onClick={() => handleEdit(row)}
              style={{ backgroundColor: 'transparent', color: '#0D7A68', border: 'none', padding: '0', cursor: 'pointer' }}
            >
              <PencilIcon className="group-hover:text-red-500 group-hover:scale-125 transition-transform duration-200" size={22} />
            </Button>
          </Link> */}

          {emailData && canAccess("patientsEdit", emailData.attributes.role_1.data.attributes.code) && <Link href={`/patients/cases/${row.id}/edit`} passHref>
            <Button
              onClick={() => handleEdit(row)}
              style={{ backgroundColor: 'transparent', color: '#0D7A68', border: 'none', padding: '0', cursor: 'pointer' }}
            >
              <Banknote className="group-hover:text-red-500 group-hover:scale-125 transition-transform duration-200" size={22} />
            </Button>
          </Link>}

          {emailData && canAccess("patientsCasesButtonPrint", emailData.attributes.role_1.data.attributes.code) && <Link href={`/patients/cases/${row.id}/Print`} passHref>
            <Button
              style={{ backgroundColor: 'transparent', color: '#0D7A68', border: 'none', padding: '0', cursor: 'hover' }}
            >
              <FileText className="group-hover:text-red-500 group-hover:scale-125 transition-transform duration-200" size={22} />
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
      title={<span style={{ color: '#0D7A68' }} className="text-3xl font-bold">ປະຫວັດການປີ່ນປົວ</span>}
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
            fontWeight: 'bold',
          },
        },
      }}
    />
  );
};

export default Filtering;
