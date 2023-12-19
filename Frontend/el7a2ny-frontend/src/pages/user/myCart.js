import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, TextField, Divider, Alert } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/user/layout';
import { MedicinesTable } from 'src/sections/user/cart/medicines-table';
import { CustomersSearch } from 'src/sections/user/cart/medicines-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { set } from 'nprogress';
import { bool } from 'prop-types';
import Message from 'src/components/Message';

const Page = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState(false);
  const router = useRouter();
  const username = Cookies.get('username');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    try {
      axios.get(`http://localhost:8001/patient/getCart?username=${username}`, {}) // done new Route
        .then((res) => {
          return res['data'];
        })
        .then((data) => {
          setData(data);
        });
    } catch (err) {
      console.log(err);
      setShowError(true);
      setErrorMessage(err.response.data.message);
    }
  }, []);

  const updateCart = async (productID, quantity) => {
    try {
      await axios.patch(`http://localhost:8001/patient/updateMedicine`, { // done new Route
        Username: username,
        productID: productID,
        quantity,
      })
        .then((res) => {
          return res['data'];
        })
        .then((data) => {
          console.log(data);
        });
    } catch (err) {
      console.log(err);
      setShowError(true);
      setErrorMessage(err.response.data.message);
    }
  };

  const handleAddOne = (productID) => {
    const newCart = data.map((item) => {
      if (item.medicineID === productID) {
        if (item.maxQuantity - 1 < 0) {
          setAlert(true);
        }
        else {
          updateCart(productID, 1);
          item.quantity += 1;
          item.maxQuantity -= 1;
        }
      }
      return item;
    });
    console.log(newCart.length);
    setData(newCart);
  };

  const handleMinusOne = (productID) => {
    const newCart = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].medicineID === productID) {
        console.log(data[i].medicineID);
        data[i].quantity -= 1;
        data[i].maxQuantity += 1;
        updateCart(productID, -1);
        if (data[i].quantity > 0) {
          newCart.push(data[i]);
        }
      }
      else {
        newCart.push(data[i]);
      }
    }
    setData(newCart);
  };

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

  return (
    <>
      <Head>
        <title>
          My Cart
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
            {alert && <Box sx={{ pl: 40, pr: 65 }}>
              <Alert severity="warning" onClose={() => { setAlert(false) }}>
                <strong>Warning!</strong> No Enough Items in Stock
              </Alert>
            </Box>}
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  My Cart
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                </Stack>
              </Stack>

            </Stack>
            <MedicinesTable
              count={data.length}
              items={data}
              handleAddOne={handleAddOne}
              handleMinusOne={handleMinusOne}
            />
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
