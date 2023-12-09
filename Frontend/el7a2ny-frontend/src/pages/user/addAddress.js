import Head from 'next/head';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Box, Button, Container, Stack, SvgIcon, Typography , TextField ,CardContent,Card,FormControlLabel , Checkbox} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/user/layout';
import axios from 'axios';
import DocumentArrowUpIcon from '@heroicons/react/24/solid/DocumentArrowUpIcon';


const Page = () => {
  const router = useRouter();
  const username = Cookies.get('username');
  
    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            city: '',
            zipCode: '',
            submit: null
        },
        validationSchema: Yup.object({
            name: Yup
            .string()
            .max(255)
            .required('Name is required'),
            address: Yup
            .string()
            .max(255)
            .required('Address is required'),
            city: Yup
            .string()
            .max(255)
            .required('City is required'),
            zipCode: Yup
            .string()
            .max(255)
            .required('Zip Code is required'),
        }),
        onSubmit: async (values, helpers) => {
          try {
            const body = {
                "Name": values.name,
                "AddressLine": values.address,
                "City": values.city,
                "PostalCode": values.zipCode,
                "PatientUsername": username,
                "username": username
            }
            console.log('here -111111> ');
              await axios.put('http://localhost:8001/patient/addAddress' , body) // done new Route
              .then((res) => { 
                  return res.data;
                })
                .then((data) => {
                  console.log('here -->>>>> ' , data);
                  router.push('/user/address');
                });
          } catch (err) {
            console.log('here ====> ',err)
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
          Add Address
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
          <Stack spacing={3}>
            <Stack
              justifyContent="space-between"
              spacing={4}
              maxWidth={800}
            >
                <Typography variant="h4">
                  Add Address
                </Typography>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Card>
                <CardContent>
              <Stack spacing={3} >
                <Stack spacing={3} direction="row">
                    <TextField
                    error = {!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="Full Name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    />
                    <TextField
                    error = {!!(formik.touched.address && formik.errors.address)}
                    fullWidth
                    helperText={formik.touched.address && formik.errors.address}
                    label="Address Line"
                    name="address"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    />
                    <TextField
                    error = {!!(formik.touched.city && formik.errors.city)}
                    fullWidth
                    helperText={formik.touched.city && formik.errors.city}
                    label="City"
                    name="city"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    />
                </Stack>
                <Stack spacing={3}>
                    <Stack spacing={3} direction="row">
                        <TextField
                        error = {!!(formik.touched.zipCode && formik.errors.zipCode)}
                        fullWidth
                        helperText={formik.touched.zipCode && formik.errors.zipCode}
                        label="Zip Code"
                        name="zipCode"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.zipCode}
                        />
                    </Stack>
                </Stack>
                </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
              </CardContent>
              </Card>
            </form>
            </Stack>
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
