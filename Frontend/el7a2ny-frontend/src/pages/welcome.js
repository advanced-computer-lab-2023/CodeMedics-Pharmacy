import React from 'react';
import { redirect, useRouter } from 'next/navigation';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';

const Page = () => {
  return (
    <div
      style={{
        backgroundImage: `url("/assets/Welcomee.png")`, // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end', // Align to the bottom
        alignItems: 'center', // Align to the center horizontally
        paddingBottom: '10rem', // Add padding to create space from the bottom
      }}
    >
      {/* <h1 style={{ color: 'white' }}>Welcome to Your App</h1> */}
      <div
        style={{
          display: 'flex',
          gap: '1rem', // Adjust the gap between the buttons
        }}
      >
        <Button
          fullWidth
          size="large"
          href="/auth/login"
          sx={{
            backgroundColor: 'white', // White background
            color: 'black', // Text color
            fontSize: '1rem', // Increase the font size for larger buttons
            '&:hover': {
              backgroundColor: '#8FE2ED', // Change background color on hover to #8FE2ED
              color: 'white', // Change text color on hover to white
            },
          }}
        >
          Login
        </Button>
        <Button
          fullWidth
          size="large"
          href="/auth/register"
          sx={{
            backgroundColor: 'white', // White background
            color: 'black', // Text color
            fontSize: '1rem', // Increase the font size for larger buttons
            '&:hover': {
              backgroundColor: '#8FE2ED', // Change background color on hover to #8FE2ED
              color: 'white', // Change text color on hover to white
            },
          }}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Page;
