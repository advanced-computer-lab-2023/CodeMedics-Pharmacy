import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/user/layout';
import { AccountProfile } from 'src/sections/patient/account-profile';
import { AccountProfileDetails } from 'src/sections/patient/account-profile-details';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';


const username = Cookies.get('username');

const Page = () => {
  const [values, setValues] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8001/getMe?username=${username}`)
      .then((req) => {
        console.log(req.data);
        setValues(req.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return(
  <>
    <Head>
      <title>
        My Account
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Account
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile data={values}/>
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
