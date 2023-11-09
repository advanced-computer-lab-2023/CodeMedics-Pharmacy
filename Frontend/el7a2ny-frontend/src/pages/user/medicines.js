import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/user/layout';
import { OverviewLatestProducts } from 'src/sections/overview/overview-medicines';
import axios from 'axios';

const now = new Date();

const Page = ({ medicines }) => (
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
        <Grid container spacing={3}>
          <Grid xs={20} md={20} lg={15}>
            <OverviewLatestProducts products={medicines} sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export async function getServerSideProps() {
  try {
    // Fetch data from the provided API
    const response = await axios.get('http://localhost:8000/Medicines');
    const medicines = response.data;

    return {
      props:  medicines ,
    };
  } catch (error) {
    console.error('Error fetching medicines:', error);
    return {
      props: { medicines: [] }, // Return an empty array in case of an error
    };
  }
}

export default Page;
