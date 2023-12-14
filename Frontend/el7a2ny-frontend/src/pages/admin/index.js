import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/admin/layout';
import { OverviewTotalSales } from 'src/sections/overview/Admin/overview-total-sales';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalPatients } from 'src/sections/overview/Admin/overview-total-patients';
import { OverviewTotalCompletedOrders } from 'src/sections/overview/Admin/overview-total-completed-orders';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import axios from 'axios';
import { useEffect, useState } from 'react';

const now = new Date();
let currentMonth;
let data;
const Page = () => {
  const [currentMonth, setCurrentMonth] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8001/admin/SalesPerMonth', { withCredentials: true })
         .then((response) => {

           setCurrentMonth(response.data['currentMonth']);
           setData(response.data['pastMonths']);

         }).catch((error) => {
      console.log(error);
    });
  }, []);
  const totalPatients = currentMonth[0]?.totalPatients;
  const totalSales = currentMonth[0]?.totalSales;
  const totalCompletedOrders = currentMonth[0]?.totalCompletedOrders;
  const totalPatientsLastMonth = data['Last Month']?.totalPatients;
  const totalSalesLastMonth = data['Last Month']?.totalSales;
  const totalCompletedOrdersLastMonth = data['Last Month']?.totalCompletedOrders;
  const SalesDifference = totalSales / totalSalesLastMonth;
  const PatientsDifference = totalPatients / totalPatientsLastMonth;
  const CompletedOrdersDifference = totalCompletedOrders / totalCompletedOrdersLastMonth;
  return (
    <>
      <Head>
        <title>
          Overview
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
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalSales
                difference={SalesDifference.toFixed(2) * 100}
                positive={SalesDifference > 1}
                sx={{ height: '100%' }}
                value={(totalSales / 1000) + 'k'}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalPatients
                difference={PatientsDifference.toFixed(2) * 100}
                positive={PatientsDifference > 1}
                sx={{ height: '100%' }}
                value={totalPatients}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTasksProgress
                sx={{ height: '100%' }}
                value={75.5}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalCompletedOrders
                sx={{ height: '100%' }}
                positive={CompletedOrdersDifference > 1}
                value={totalCompletedOrders}
                difference={CompletedOrdersDifference.toFixed(2) * 100}
              />
            </Grid>
            <Grid
              xs={12}
              lg={8}
            >
              <OverviewSales
                chartSeries={[
                  {
                    name: 'This year',
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                  },
                  {
                    name: 'Last year',
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                  }
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>

            <Grid
              xs={12}
              md={12}
              lg={8}
            >
              <OverviewLatestOrders
                orders={[
                  {
                    id: 'f69f88012978187a6c12897f',
                    ref: 'DEV1049',
                    amount: 30.5,
                    customer: {
                      name: 'Ekaterina Tankova'
                    },
                    createdAt: 1555016400000,
                    status: 'pending'
                  },
                  {
                    id: '9eaa1c7dd4433f413c308ce2',
                    ref: 'DEV1048',
                    amount: 25.1,
                    customer: {
                      name: 'Cao Yu'
                    },
                    createdAt: 1555016400000,
                    status: 'delivered'
                  },
                  {
                    id: '01a5230c811bd04996ce7c13',
                    ref: 'DEV1047',
                    amount: 10.99,
                    customer: {
                      name: 'Alexa Richardson'
                    },
                    createdAt: 1554930000000,
                    status: 'refunded'
                  },
                  {
                    id: '1f4e1bd0a87cea23cdb83d18',
                    ref: 'DEV1046',
                    amount: 96.43,
                    customer: {
                      name: 'Anje Keizer'
                    },
                    createdAt: 1554757200000,
                    status: 'pending'
                  },
                  {
                    id: '9f974f239d29ede969367103',
                    ref: 'DEV1045',
                    amount: 32.54,
                    customer: {
                      name: 'Clarke Gillebert'
                    },
                    createdAt: 1554670800000,
                    status: 'delivered'
                  },
                  {
                    id: 'ffc83c1560ec2f66a1c05596',
                    ref: 'DEV1044',
                    amount: 16.76,
                    customer: {
                      name: 'Adam Denisov'
                    },
                    createdAt: 1554670800000,
                    status: 'delivered'
                  }
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>
          </Grid>
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
