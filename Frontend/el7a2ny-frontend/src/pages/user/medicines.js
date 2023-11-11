import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/user/layout';
import { OverviewLatestProducts } from 'src/sections/overview/overview-medicines';
import { CustomersSearch } from 'src/sections/user/medicines/medicines-search';
import axios from 'axios';
import { useEffect, useState } from 'react';


const now = new Date();

const Page = ({ medicines }) => {
  const [data, setData] = useState(medicines);
  const [searchData, setSearchData] = useState(medicines);
  const [filteredData , setFilteredData] = useState(medicines);



  useEffect(() => {
    handleData();
  }, [searchData , filteredData]);

  const handleData = () => {
    setData(medicines.filter((medicine) => filteredData.includes(medicine) && searchData.includes(medicine)));
  }

  const handleSearch = (str) => {
    if(str === ""){
      setSearchData(medicines);
    }
    else{
      setSearchData(medicines.filter((medicine) => medicine.name.toLowerCase().includes(str.toLowerCase())));
    }
  }

  const handleFilter  = (str)  => {
    if(str === "None"){
      setFilteredData(medicines);
    }
    else{
      setFilteredData(medicines.filter((medicine) => medicine.medicalUse === (str)));
    }
  }
  return(
  <>
    <Head>
      <title>El7a2ny Pharmacy</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
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
        <CustomersSearch data={data} handleSearch={handleSearch} handleFilter={handleFilter}/>
        <Grid container spacing={3}>
          <Grid xs={20} md={20} lg={15}>
            <OverviewLatestProducts products={data} sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export async function getServerSideProps() {
  try {
    // Fetch data from the provided API
    const response = await axios.get('http://localhost:8000/Medicines');
    const medicines = response.data;

    return {
      props: medicines,
    };
  } catch (error) {
    console.error('Error fetching medicines:', error);
    return {
      props: { medicines: [] }, // Return an empty array in case of an error
    };
  }
}

export default Page;
