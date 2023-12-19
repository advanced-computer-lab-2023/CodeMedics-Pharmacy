import Head from 'next/head';
import { Box, Container, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/admin/layout';
import { OverviewTotalSales } from 'src/sections/overview/Admin/overview-total-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalPatients } from 'src/sections/overview/Admin/overview-total-patients';
import { OverviewTotalCompletedOrders } from 'src/sections/overview/Admin/overview-total-completed-orders';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TotalSalesChart } from '../../sections/overview/Admin/TotalSalesChart';
import { OverviewTopSelling } from '../../sections/overview/Admin/overview-top-selling';
import { OverviewFilter } from '../../sections/overview/Admin/FilterTableAdmin';

const Page = () => {
  const [currentMonth, setCurrentMonth] = useState([]);
  const [data, setData] = useState([]);
  const [totalSalesArray, setTotalSalesArray] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [Products, setProducts] = useState([]);
  const [filter, setFilter] = useState('none');
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8001/admin/getSalesPerYear', { withCredentials: true })
         .then((response) => {

           setCurrentMonth(response.data['currentMonth']);
           setData(response.data['pastMonths']);

         }).catch((error) => {
      console.log(error);
    });
  }, []);// Months API CALL
  useEffect(() => {
    axios.get('http://localhost:8001/admin/getSalesDataByMedicine', { withCredentials: true })
         .then((response) => {
           // Sort the response.data array based on the "totalQuantity" property in descending order
           const sortedData = response.data.sort((a, b) => b.totalQuantity - a.totalQuantity);

           setProducts(sortedData);
         })
         .catch((error) => {
           console.log(error);
         });
  }, []); // Products API CALL
  useEffect(() => {
    const salesArray = Object.values(data).map(month => month.totalSales);
    setTotalSalesArray([...salesArray.reverse(), totalSales]);
  }, [data]); // Total Sales Array
  useEffect(() => {
    if (filter !== 'none') {
      // If filter is one of the medicines, update filterData with the values of that medicine
      const filteredMedicine = Products.filter((medicine) => medicine.medicineName === filter);
      const modifiedFilteredData = filteredMedicine.map(({
        availableQuantity,
        totalQuantity,
        totalAmount
      }) => [
        availableQuantity,
        totalQuantity,
        totalAmount
      ]);
      setFilterData(modifiedFilteredData.flat());
    } else {
      // If filter is 'None', set filterData to an empty array or handle it as needed
      setFilterData([]);
    }
  }, [filter, Products]); // Filter Medicine Data

  const totalPatients = currentMonth[0]?.totalPatients ?? 0;
  const totalSales = currentMonth[0]?.totalSales ?? 0;
  const totalCompletedOrders = currentMonth[0]?.totalCompletedOrders ?? 0;

  const totalPatientsLastMonth = data['Last Month']?.totalPatients ?? 1;
  const totalSalesLastMonth = data['Last Month']?.totalSales ?? 1;
  const totalCompletedOrdersLastMonth = data['Last Month']?.totalCompletedOrders ?? 1;

  const SalesDifference = totalSales / totalSalesLastMonth;
  const PatientsDifference = totalPatients / totalPatientsLastMonth;
  const CompletedOrdersDifference = totalCompletedOrders / totalCompletedOrdersLastMonth;
  const months = [];

  if (data) {
    const keys = Object.keys(data);

    for (const month of keys) {
      months.push(month);
    }
  }

  const currentDate = new Date();
  const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });

// Get the last month name
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(currentDate.getMonth() - 1);
  const lastMonthName = lastMonthDate.toLocaleString('default', { month: 'long' });

// Iterate through months array and replace labels
  const labels = months.reverse().map(label => {
    if (label === 'Last Month') {
      return lastMonthName;
    } else {
      return label;
    }
  });
  if (currentMonth && !labels.includes(currentMonthName)) {
    labels.push(currentMonthName);
  }

  if (!totalSalesArray.length || !filterData) {
    return null;
  }

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
              <TotalSalesChart
                chartSeries={[
                  {
                    name: 'This year',
                    data: totalSalesArray
                  }
                ]}
                months={labels}
              /></Grid>
            <Grid
              xs={12}
              lg={4}
            >
              <OverviewTopSelling products={Products}/>
            </Grid>
            <Grid xs={12}
                  lg={12}>
              <OverviewFilter
                setFilter={setFilter}
                filter={filter}
                Data={filterData}
              >

              </OverviewFilter>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
    ;
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

