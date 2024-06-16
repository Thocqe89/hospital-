"use client";
import React, { useEffect, useState } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi'; // Import GlobalApi
import styled from 'styled-components';
import { Button } from 'flowbite-react';
import DataTable from 'react-data-table-component';
import { FolderOutput, Paperclip, PencilIcon, Sparkles, TicketCheck, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { Pencil } from 'lucide';

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
    <Link href="patients/add" passHref>
      <FilterButton>
        <div className="flex items-center space-x-2">
          <UserRoundPlus className="h-5 w-5" />
          <span>ເພີ່ມຂໍ້ມູນຄົນເຈັບ</span>
        </div>
      </FilterButton>
    </Link>
    <Link href="/search/ພະເເນກຄົນເຈັບສຸກເສີນ" legacyBehavior>
      <FilterButton>
        <div className="flex items-center space-x-2">
        <TicketCheck className="h-5 w-5" />
                    <span>ຈອງຄິວ</span>
        </div>
      </FilterButton>
    </Link>

  </FilterComponentContainer>
  
);

const columns = [
  {
    name: 'ຊື້',
    selector: row => row.first_name,
    sortable: true,
    style: {
      color: '#0D7A68',
    },
  },
  {
    name: 'ນາມສະກຸນ',
    selector: row => row.last_name,
    sortable: true,
    style: {
      color: '#0D7A68',
    },
  },
  {
    name: 'ເພດ',
    selector: row => row.gender,
    sortable: true,
    style: {
      color: '#0D7A68',
    },
  },
  {
    name: 'ບ້ານ',
    selector: row => row.village,
    sortable: true,
    style: {
      color: '#0D7A68',
    },
  },
  {
    name: 'ເມືອງ',
    selector: row => row.district,
    sortable: true,
    style: {
      color: '#0D7A68',
    },
  },
  {
    name: 'ແຂວງ',
    selector: row => row.province,
    sortable: true,
    style: {
      color: '#0D7A68',
    },
  },
  {
    name: 'ປະເທດ',
    selector: row => row.country,
    sortable: true,
    style: {
      color: '#0D7A68',
    },
  },
  {
    name: 'ວັນ/ເດືອນ/ປີເກີດ',
    selector: row => row.date_of_birth,
    sortable: true,
    style: {
      color: '#0D7A68',
    },
  },
  {
    name: 'ເລກທີເອກະສານຍືນຍັນໂຕຕົນ',
    selector: row => row.identify_familybook_passport,
    sortable: true,
    style: {
      color: '#0D7A68',
    },
  },
  {
    name: 'ອາການແພ້',
    selector: row => row.disease_diagnoses,
    sortable: true,
    style: {
      color: '#0D7A68',
    },
  },
  {
    name: 'ເບີຕິດຕໍ່',
    selector: row => row.phone_number,
    sortable: true,
    style: {
      color: '#0D7A68',
    },
  },
  // {
  //   name: 'ຊື້ຜູ້ສາມາດຕໍ່ສຸກເສີນ',
  //   selector: row => row.emergency_name,
  //   sortable: true,
  //   style: {
  //     color: '#0D7A68',
  //   },
  // },
  // {
  //   name: 'ເບີໂທຜູ້ສາມາດຕິດຕໍ່ສຸກເສີນ',
  //   selector: row => row.emergency_phone_number,
  //   sortable: true,
  //   style: {
  //     color: '#0D7A68',
  //   },
  // },
  // {
  //   name: 'ຊື້ບໍລິສັດປະກັນໄພ',
  //   selector: row => row.insurance_name,
  //   sortable: true,
  //   style: {
  //     color: '#0D7A68',
  //   },
  // },
  // {
  //   name: 'ວັນທີ/ເດືອນ/ເລີ່ມປະກັນໄພ',
  //   selector: row => row.insurance_strat_date,
  //   sortable: true,
  //   style: {
  //     color: '#0D7A68',
  //   },
  // },
  // {
  //   name: 'ວັນທີ/ເດືອນ/ປີໝົດອາຍຸປະກັນໄພ',
  //   selector: row => row.insurance_end_date,
  //   sortable: true,
  //   style: {
  //     color: '#0D7A68',
  //   },
  // },
  // {
  //   name: 'ຈ່າຍວັນທີ່',
  //   selector: row => row.prayment_date,
  //   sortable: true,
  //   style: {
  //     color: '#0D7A68',
  //   },
  // },
  // {
  //   name: 'ລາຄາທັງມົດ',
  //   selector: row => `${row.prayment_amount} K`,
  //   sortable: true,
  //   style: {
  //     color: '#0D7A68',
  //     fontWeight: 'bold',
  //   },
  // },
  {
    name: '',
    cell: row => (
      <>
        <Link href={`/patients/${row.id}`} passHref>
          <Button
            onClick={() => handleEdit(row)}
            style={{ backgroundColor: 'transparent', color: '#0D7A68', border: 'none', padding: '0', cursor: 'pointer' }}
          >
            <PencilIcon className="group-hover:text-red-500 group-hover:scale-125 transition-transform duration-200" size={22} />
          </Button>
        </Link>
        <Link href={`/patients/cases/${row.id}`} passHref>
          <Button
            style={{ backgroundColor: 'transparent', color: '#0D7A68', border: 'none', padding: '0', cursor: 'pointer' }}
            
          >
           <FolderOutput className="group-hover:text-red-500 group-hover:scale-125 transition-transform duration-200" size={22} />
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
  console.log('Edit button clicked for row:', row);
};

const Filtering = () => {
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    GlobalApi.getPatiented()
      .then(response => {
        console.log('API Response:', response);
        setPatients(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  const filteredItems = patients.filter(patient => {
    const { first_name, identify_familybook_passport, phone_number } = patient.attributes;
    const searchRegex = new RegExp(filterText, 'i');
    return (
      searchRegex.test(first_name) ||
      searchRegex.test(identify_familybook_passport) ||
      searchRegex.test(phone_number)
    );
  }).map(patient =>({... patient.attributes,id:patient.id}));

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

  return (
    <DataTable
      title={<span style={{ color: '#0D7A68' }} className="text-3xl font-bold">ຂໍ້ມູນຄົນເຈັບ</span>}
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