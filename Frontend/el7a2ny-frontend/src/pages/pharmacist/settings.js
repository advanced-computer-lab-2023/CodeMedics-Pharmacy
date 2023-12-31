import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { SettingsNotifications } from 'src/sections/settings/settings-notifications';
import { SettingsPassword } from 'src/sections/settings/settings-password';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/pharmacist/layout';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Page = () => {
  const router = useRouter();
  const [auth , setAuth] = useState(false);

  return(
  <>
    <Head>
      <title>
        El7a2ny Virtual Pharmacy
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
          <Typography variant="h4">
            Settings
          </Typography>

          <SettingsPassword />
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
