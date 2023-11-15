import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, TextField, Divider } from '@mui/material';
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

const Page = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const username = Cookies.get('username');

  useEffect(() => {
    try {
      axios.get(`http://localhost:8000/getCart?username=${username}`, {})
        .then((res) => {
          return res['data'];
        })
        .then((data) => {
          setData(data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const updateCart = async () => {
    try {
      await axios.patch(`http://localhost:8000/updateMedicine`, {
      Username: username,
      productID: productID,
      quantity,})
          .then((res) => {
              return res['data'];
          })
          .then((data) => {
              console.log(data);
          });
  } catch (err) {
      console.log(err);
  }
  };  

  const handleAddOne = (productID) => {
    const newCart = data.map((item) => {
      if (item._id === productID) {
        item.quantity += 1;
        updateCart(productID, item.quantity);
      }
      return item;
    });
    setCart(newCart);
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
