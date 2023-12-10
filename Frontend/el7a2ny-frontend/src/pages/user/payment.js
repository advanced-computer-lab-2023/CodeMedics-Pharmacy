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
    Typography , 
    TextField , 
    Radio , 
    RadioGroup, 
    FormControl, 
    FormControlLabel, 
    MenuItem,
    FormLabel ,  
    Avatar,
    Card,
    CardContent,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/user/layout';
import axios from 'axios';
import { deepOrange } from '@mui/material/colors';



const Page = () => {
  const router = useRouter();

  const [value, setValue] = React.useState('creditCard');
  const [credit , setCredit] = React.useState(true);
  const username = Cookies.get('username');
  const [addresses , setAddresses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8001/patient/getAddress?username=${username}`) // done new Route
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const dt = [];
        for(let i=0; i<data.length; i++){
          dt.push({value : data[i]._id , label : `${data[i].Name} , Address: ${data[i].AddressLine} , City: ${data[i].City} , Postal Code: ${data[i].PostalCode}`});
        }
        setAddresses(dt);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
    if(event.target.value == 'creditCard'){
      setCredit(true);
    }
    else{
      setCredit(false);
    }
  };
  
  const handleWithWallet =() =>{
      try{
        axios.post(`http://localhost:8001/patient/ifPaymentDone?username=${username}`, {type: 'Wallet'}); // done new Route
        console.log('here --->');
        router.push('/user/orders?username='+username);   
      }catch(err){
        console.log('here ---> 11  ');
        console.log(err);
      }
  }
  

  return (
    <>
      <Head>
        <title>
          Checkout
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl" >
          <Stack spacing={10} sx = {{pl : 15 }} direction="row">
            <Stack
              justifyContent="space-between"
              spacing={4}
              sx = {{width : 650}}
            >
                 <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowSmallLeftIcon />
                    </SvgIcon>
                  )}
                  onClick={() => router.push('/user/medicines')}
                  sx = {{width : 90}}
                >
                  Back
                </Button>
                <Typography variant="h3">
                  Checkout
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Avatar sx={{bgcolor : 'primary.main'}}>1</Avatar>
                    <Typography variant="h6" sx={{pt: 1,}}>
                    Billing Address
                    </Typography>
                </Stack>
                {addresses.length > 0 && <TextField
                  sx={{ width: 200 }}
                  id="myAddress"
                  select
                  label="My Addresses"
                  defaultValue={addresses[0].value}
                  helperText=""
                  onChange={(str) => {console.log(str.target.value)}}
                > {addresses.map((option) => (
                    <MenuItem key={option.value} value={option.value} >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>}
                <Stack direction="row" spacing={2}>
                    <Avatar sx={{bgcolor : 'primary.main'}}>2</Avatar>
                    <Typography variant="h6" sx={{pt: 1,}}>
                        Payment Method
                    </Typography>
                </Stack>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
                        <FormControlLabel value="cashOnDelivery" control={<Radio />} label="Cash On Delivery" />
                        <FormControlLabel value="myWallet" control={<Radio />} label="My Wallet" />
                        
                    </RadioGroup>
                </FormControl>
                {credit && <PaymentForm></PaymentForm>}
                <Stack direction="row" spacing={2}>
                <SvgIcon sx = {{color: 'success.light'}}>
                            <ShieldCheckIcon />
                          </SvgIcon>
                    <Typography variant="h8" sx={{pt:0 ,}}>
                        Secure Checkout
                    </Typography>
                </Stack>
                    <Typography variant="h10" sx={{pt:0 ,}}>
                Your purchases are secured by our amazing platform service 
                    </Typography>
                    {!credit && <Button
                        variant="contained"
                        onClick={() => {handleWithWallet()}}
                        sx = {{width : 180 , height : 50}}
                        >
                            Pay Order
                    </Button>}
            </Stack>
            <Stack sx={{pt: 25}}>
            <Card sx={{height : 500 , width: 400}}>
                <CardContent>

                </CardContent>
            </Card>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};



export default Page;
