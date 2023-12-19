import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/pharmacist/layout';
import { AccountProfilePharmacist } from 'src/sections/account/account-profile-pharmacist';
import { AccountProfileDetailsPharmacist } from 'src/sections/account/account-profile-details-pharmacist';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Message from 'src/components/Message';
import Cookies from 'js-cookie';


const Page = () => {
  
  const [values, setValues] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const username = Cookies.get('username');
  useEffect(() => {
    axios.get(`http://localhost:8001/getMePharmacist?username=${username}`, {withCredentials: true})
      .then((req) => {
        setValues(req.data);
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
        setErrorMessage(err.response.data.message);
      });
  }, []);

  return(
  <>
    <Head>
      <title>
        My Account
      </title>
    </Head>
    <Message condition={showError} setCondition={setShowError} title={"Error"} message={errorMessage} buttonAction={"Close"} />
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
              {Object.keys(values).length !==0 && <AccountProfilePharmacist user={values}/>}
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
              {Object.keys(values).length !==0 && <AccountProfileDetailsPharmacist values={values} setValues={setValues} />}
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
