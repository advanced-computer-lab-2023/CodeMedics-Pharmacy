import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/pharmacist/layout';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Page = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8001/pharmacist/getPharmacistMessages', { withCredentials: true });
      
      // Log the entire response to see its structure
      console.log('Response:', response);
  
      // Assuming the messages are nested under the "Messages" property
      const messages = response.data.Messages;
  
      // Log the messages to check their structure
      console.log('Messages:', messages);
  
      // Set notifications
      setNotifications(messages.reverse());
    } catch (error) {
      console.log(error);
    }
  };
  
  

  useEffect(() => {
    // Fetch notifications initially
    fetchNotifications();

    // Set up interval to fetch notifications every 1 minutes (adjust as needed)
    const intervalId = setInterval(fetchNotifications, 1 * 60 * 1000);

    // Clean up interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Head>
        <title>El7a2ny Clinic</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h3" gutterBottom>
            Notifications
          </Typography>
          {notifications.map((notification, index) => (
            <Box
              key={index}
              sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Notification Message */}
              <Typography variant="body1" gutterBottom>
                {notification.content}
              </Typography>

              {/* Date and Time */}
              <Typography variant="caption" color="textSecondary" sx={{ marginTop: '8px' }}>
                {new Date(notification.timestamp).toLocaleDateString()}{' '}
                {new Date(notification.timestamp).toLocaleTimeString()}
              </Typography>
            </Box>
          ))}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;