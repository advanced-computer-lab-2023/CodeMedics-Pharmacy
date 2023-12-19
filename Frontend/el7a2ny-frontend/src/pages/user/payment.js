import Head from 'next/head';
import * as React from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import ArrowSmallLeftIcon from '@heroicons/react/24/solid/ArrowSmallLeftIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import ShieldCheckIcon from '@heroicons/react/24/solid/ShieldCheckIcon';
import PaymentForm from 'src/sections/user/PaymentForm';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  MenuItem,
  FormLabel,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/user/layout';
import axios from 'axios';
import { deepOrange } from '@mui/material/colors';
import { BillingAddress } from 'src/sections/user/Checkout/billingAddress';
import { PaymentMethod } from 'src/sections/user/Checkout/paymentMethod';
import { OrdersSummary } from 'src/sections/user/Checkout/ordersSummary';
import Message from 'src/components/Message';



const Page = () => {
  const router = useRouter();
  
  const [value, setValue] = useState('Credit Card');
  const [phase , setPhase] = useState(new URLSearchParams(window.location.search).get('phase') ||'1');
  const [credit, setCredit] = useState(true);
  const username = Cookies.get('username');
  const [addresses, setAddresses] = useState([]);
  const [address , setAddress] = useState(null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if(phase == '1'){
  console.log('here ----> in phase 1', address);
  }
  else{
    console.log('here ----> in phase 2', address);
  }
  useEffect(() => {
    fetch(`http://localhost:8001/patient/getAddress?username=${username}`) // done new Route
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const dt = [];
        for (let i = 0; i < data.length; i++) {
          const x = data[i].AddressLine2 ? ' , ' + data[i].AddressLine2 +' ': '';
          dt.push({ value: data[i]._id, label: `${data[i].FirstName} ${data[i].LastName} , Address: ${data[i].AddressLine} ${x}, City: ${data[i].City} , Postal Code: ${data[i].PostalCode}` });
        }
        setAddress(dt[0].value);
        setAddresses(dt);
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
        setErrorMessage(err.message);
      });
  }, []);
  
  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value == 'Credit Card') {
      setCredit(true);
    }
    else {
      setCredit(false);
    }
  };

  const handleWithWallet = () => {
    try {
      axios.post(`http://localhost:8001/patient/ifPaymentDone?username=${username}&address=${address}`, { type: value}); // done new Route
      console.log('here --->');
      router.push('/user/orders?username=' + username);
    } catch (err) {
      console.log('here ---> 11  ');
      console.log(err);
      setShowError(true);
      setErrorMessage(err.message);
    }
  }


  return (
    <>
      <Head>
        <title>
          Checkout
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
        <Container maxWidth="xl" >
          <Stack spacing={10} sx={{ pl: 10 }} direction="row">
            <Stack
              
              spacing={3}
              sx={{ width: 500 }}
            >
              <Typography variant="h3">
                Checkout
              </Typography>
              {phase === '1' && <BillingAddress addresses={addresses} setPhase={setPhase} setAddress={setAddress}/>}
              {phase === '2' && <PaymentMethod value={value} handleChange={handleChange} credit={credit} setPhase={setPhase} address={address}/>}
              {/* {console.log('phase in the design: ', phase)} */}
              <Stack>
              <Stack direction="row" spacing={2}>
                <SvgIcon sx={{ color: 'success.light' }}>
                  <ShieldCheckIcon />
                </SvgIcon>
                <Typography variant="h8" sx={{ pt: 0, }}>
                  Secure Checkout
                </Typography>
              </Stack>
              <Typography variant="h10" sx={{ pt: 0, }}>
                Your purchases are secured by our amazing platform service
              </Typography>
              </Stack>
              {!credit && <Button
                variant="contained"
                onClick={() => { handleWithWallet() }}
                sx={{ width: 180, height: 50 }}
              >
                Pay Order
              </Button>}
            </Stack>
            {/* <OrdersSummary /> */}
          </Stack>
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
