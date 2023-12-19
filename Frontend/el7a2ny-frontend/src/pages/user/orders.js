import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/user/layout';
import { OverviewTotalSales } from 'src/sections/overview/Admin/overview-total-sales';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalPatients } from 'src/sections/overview/Admin/overview-total-patients';
import { OverviewTotalCompletedOrders } from 'src/sections/overview/Admin/overview-total-completed-orders';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { set } from 'lodash';
import Message from 'src/components/Message';
const now = new Date();


const Orders = () => {

  const[myOrders, setMyOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const username = Cookies.get('username');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    axios.get(`http://localhost:8001/patient/getOrders?username=`+username) // done new Route
      .then((res) => {
        return res['data'];
      })
      .then((data) => {
        setMyOrders(data.orders);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
        setErrorMessage(err.response.data.message);
      });
  }, []);


  const styles = `
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

  return (
   isLoading ? (
    <div>
      <style>{styles}</style>
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
   ):(
    <>
    <Head>
      <title>
        El7a2ny Pharmacy
      </title>
    </Head>
    <Message condition={showError} setCondition={handleClose} message={errorMessage} title="Error" buttonAction="Close" />
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
  ));
}

Orders.getLayout = (Orders) => (
    <DashboardLayout>
      {Orders}
    </DashboardLayout>
  );
  
  export default Orders;