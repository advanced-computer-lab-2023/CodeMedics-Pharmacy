import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/user/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const now = new Date();

const Orders = () => {

  const[myOrders, setMyOrders] = useState([]);
  const username = Cookies.get('username');
  useEffect(() => {
    axios.get(`http://localhost:8000/getOrders`, {username: username})
      .then((res) => {
        return res['data'];
      })
      .then((data) => {
        setMyOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Head>
        <title>
          El7a2ny Pharmacy
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
          <Grid
            container
            spacing={3}
          >
   
            <Grid
              xs={20}
              md={20}
              lg={15}
            >
  
              <OverviewLatestOrders
                orders={myOrders}
                sx={{ height: '100%' }}
              />
              
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

Orders.getLayout = (Orders) => (
    <DashboardLayout>
      {Orders}
    </DashboardLayout>
  );
  
  export default Orders;