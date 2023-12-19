import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography,TextField } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/pharmacist/layout';
import { MedicinesTable } from 'src/sections/pharmacist/medicines/medicines-table';
import { CustomersSearch } from 'src/sections/pharmacist/medicines/medicines-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { useRouter } from 'next/navigation';
import Message from 'src/components/Message';
import Cookies from 'js-cookie';
import axios from 'axios';
import { set } from 'nprogress';
import { bool } from 'prop-types';

const now = new Date();

const useMedicines = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data, page, rowsPerPage]
  );
};

const useMedicineIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [filteredData , setFilteredData] = useState([]);
  const [allData , setAllData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useMedicines(data, page, rowsPerPage);
  const customersIds = useMedicineIds(customers);
  const customersSelection = useSelection(customersIds);
  const router = useRouter();
  const [auth , setAuth] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8001/medicine/viewMedicinesPharmacist') // done new Route
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if(data.medicines){
        setData(data['medicines']);
        setAllData(data['medicines']);
        setSearchData(data['medicines']);
        setFilteredData(data['medicines']);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
        setErrorMessage(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    handleData();
  }, [searchData , filteredData]);


  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleData = () => {
    setData(allData.filter((medicine) => filteredData.includes(medicine) && searchData.includes(medicine)));
  }

  const handleSearch = (str) => {
    if(str === ""){
      setSearchData(allData);
    }
    else{
      setSearchData(allData.filter((medicine) => medicine.name.toLowerCase().includes(str.toLowerCase())));
    }
  }

  const handleFilter  = (str)  => {
    if(str === "None"){
      setFilteredData(allData);
    }
    else{
      setFilteredData(allData.filter((medicine) => medicine.medicalUse === (str)));
    }
  }

  return (
    <>
      <Head>
        <title>
          Medicines
        </title>
      </Head>
      <Message condition={showError} setCondition={setShowError} message={errorMessage} title="Error" buttonAction="Close" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Medicines
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={() => router.push('/pharmacist/addMedicine')}
                >
                  Add Medicine
                </Button>
              </div>
            </Stack>
            <CustomersSearch data={data} handleSearch={handleSearch} handleFilter={handleFilter}/>
            { <MedicinesTable
              count={data.length}
              items={customers}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
