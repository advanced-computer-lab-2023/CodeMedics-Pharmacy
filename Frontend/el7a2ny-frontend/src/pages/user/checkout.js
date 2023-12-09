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

  const handleChange = (event) => {
    setValue(event.target.value);
    if(event.target.value == 'creditCard'){
      setCredit(true);
    }
    else{
      setCredit(false);
    }
  };

    useEffect(() => {
      try{
       axios.get('http://localhost:8001/getAddress' , body)
              .then((res) => { 
                  return res['data'];
                })
                .then((data) => {
                  console.log(data);
                });
          } catch (err) {
            console.log(err)
            helpers.setStatus({ success: false });
            helpers.setErrors({ Submit: err.response.data.message});
            helpers.setSubmitting(false);
          }
    },[]);

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            availableQuantity: '',
            description: '',
            activeIngredient: '',
            medicalUse: '',
            picture: '',
            submit: null
        },
        validationSchema: Yup.object({
            name: Yup
            .string()
            .max(255)
            .required('Name is required'),
            price: Yup
            .number()
            .required('Price is required'),
            availableQuantity: Yup
            .string()
            .max(255)
            .required('Available Quantity is required'),
            description: Yup
            .string()
            .max(255)
            .required('Description is required'),
            medicalUse: Yup
            .string()
            .max(255)
            .required('Medical Use is required'),
            activeIngredient: Yup
            .string()
            .max(255)
            .required('Active Ingredient is required'),
            picture: Yup
            .string()
            .max(255)
            .required('Picture is required'),
        }),
        onSubmit: async (values, helpers) => {
          try {
            const body = {
                "name": values.name,
                "price": values.price,
                "availableQuantity": values.availableQuantity,
                "Description": values.description,
                "activeIngredients": values.activeIngredient,
                "medicalUse": values.medicalUse,
                "Picture": values.picture,
            };
              await axios.post('http://localhost:8001/addMedicine' , body)
              .then((res) => { 
                if(res.status != 200){
                  throw new Error(res.data.message); 
                }
                  return res['data'];
                })
                .then((data) => {
                    router.push('/pharmacist/medicines');
                });
          } catch (err) {
            console.log(err)
            helpers.setStatus({ success: false });
            helpers.setErrors({ Submit: err.response.data.message});
            helpers.setSubmitting(false);
          }
        }
      });
  

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
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3} >
                <Stack spacing={3} direction="row">
                    <TextField
                    error = {!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="First Name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    />
                    <TextField
                    error = {!!(formik.touched.price && formik.errors.price)}
                    fullWidth
                    helperText={formik.touched.price && formik.errors.price}
                    label="Last Name"
                    name="price"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    />
                </Stack>
                    <Stack spacing={3} direction="row">
                        <TextField
                        error = {!!(formik.touched.activeIngredient && formik.errors.activeIngredient)}
                        fullWidth
                        helperText={formik.touched.activeIngredient && formik.errors.activeIngredient}
                        label="Street Address"
                        name="activeIngredient"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.activeIngredient}
                        />
                        <TextField
                        error = {!!(formik.touched.medicalUse && formik.errors.medicalUse)}
                        fullWidth
                        helperText={formik.touched.medicalUse && formik.errors.medicalUse}
                        label="Street Line 2 (optional)"
                        name="medicalUse"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.medicalUse}
                        />
                    </Stack>
                    <Stack spacing={3} direction="row" maxWidth={312.5}>
                        <TextField
                        error = {!!(formik.touched.activeIngredient && formik.errors.activeIngredient)}
                        fullWidth
                        helperText={formik.touched.activeIngredient && formik.errors.activeIngredient}
                        label="State"
                        name="activeIngredient"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.activeIngredient}
                        />
                        <TextField
                        error = {!!(formik.touched.medicalUse && formik.errors.medicalUse)}
                        fullWidth
                        helperText={formik.touched.medicalUse && formik.errors.medicalUse}
                        label="Zip code"
                        name="medicalUse"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.medicalUse}
                        />
                    </Stack>
                </Stack>
                </form>
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
                {credit && <Stack
                    spacing={3}
                    sx = {{width: 312.5}}
                >
                    <TextField
                        error = {!!(formik.touched.activeIngredient && formik.errors.activeIngredient)}
                        fullWidth
                        helperText={formik.touched.activeIngredient && formik.errors.activeIngredient}
                        label="Name On Card"
                        name="activeIngredient"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.activeIngredient}
                    />
                    <TextField
                        error = {!!(formik.touched.activeIngredient && formik.errors.activeIngredient)}
                        fullWidth
                        helperText={formik.touched.activeIngredient && formik.errors.activeIngredient}
                        label="Card Number"
                        name="activeIngredient"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.activeIngredient}
                    />
                    <Stack spacing={3} direction="row" maxWidth={312.5}>
                        <TextField
                        error = {!!(formik.touched.activeIngredient && formik.errors.activeIngredient)}
                        fullWidth
                        helperText={formik.touched.activeIngredient && formik.errors.activeIngredient}
                        label="Expire Date"
                        name="activeIngredient"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.activeIngredient}
                        />
                        <TextField
                        error = {!!(formik.touched.medicalUse && formik.errors.medicalUse)}
                        fullWidth
                        helperText={formik.touched.medicalUse && formik.errors.medicalUse}
                        label="CCV"
                        name="medicalUse"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.medicalUse}
                        />
                    </Stack>
                </Stack>}
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
                    <Button
                        endIcon={(
                            <SvgIcon fontSize="small">
                            <ArrowRightIcon />
                            </SvgIcon>
                        )}
                        variant="contained"
                        onClick={() => {}}
                        sx = {{width : 180 , height : 50}}
                        >
                            Complete Order
                    </Button>
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
