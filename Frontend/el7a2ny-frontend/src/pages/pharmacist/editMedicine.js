import Head from 'next/head';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { Box, Button, Container, Stack, SvgIcon, Typography , TextField } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/pharmacist/layout';
import axios from 'axios';



const Page = ({}) => {
    const router = useRouter();

    // useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get('data');
    const medicine = JSON.parse(decodeURIComponent(encodedData));
    console.log(medicine);
    const formik = useFormik({
        initialValues: {
            name: medicine['name'],
            price: medicine['price'],
            availableQuantity: medicine['availableQuantity'],
            description: medicine['Description'],
            activeIngredient: medicine['activeIngredients'][0],
            medicalUse: medicine['medicalUse'],
            picture: medicine['Picture'],
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
              await axios.patch('http://localhost:8000/ditMedicine' , body)
              .then((res) => { 
                if(res.status != 200){
                  throw new Error(res.data.message); 
                }
                  return res['data'];
                })
                .then((data) => {
                    router.replace('/pharmacist/medicines');
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
          Edit Medicine
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
                  Edit Medicine
                </Typography>
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
                    label="Name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    />
                    <TextField
                    error = {!!(formik.touched.price && formik.errors.price)}
                    fullWidth
                    helperText={formik.touched.price && formik.errors.price}
                    label="Price"
                    name="price"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    />
                    <TextField
                    error = {!!(formik.touched.availableQuantity && formik.errors.availableQuantity)}
                    fullWidth
                    helperText={formik.touched.availableQuantity && formik.errors.availableQuantity}
                    label="Available Quantity"
                    name="availableQuantity"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.availableQuantity}
                    />
                </Stack>
                <Stack spacing={3}>
                    <Stack spacing={3} direction="row">
                        <TextField
                        error = {!!(formik.touched.activeIngredient && formik.errors.activeIngredient)}
                        fullWidth
                        helperText={formik.touched.activeIngredient && formik.errors.activeIngredient}
                        label="Active Ingredient"
                        name="activeIngredient"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.activeIngredient}
                        />
                        <TextField
                        error = {!!(formik.touched.medicalUse && formik.errors.medicalUse)}
                        fullWidth
                        helperText={formik.touched.medicalUse && formik.errors.medicalUse}
                        label="Medical Use"
                        name="medicalUse"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.medicalUse}
                        />
                    </Stack>
                    <TextField
                    error = {!!(formik.touched.description && formik.errors.description)}
                    fullWidth
                    helperText={formik.touched.description && formik.errors.description}
                    label="Description"
                    name="description"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    />
                    <TextField
                    error = {!!(formik.touched.picture && formik.errors.picture)}
                    fullWidth
                    helperText={formik.touched.picture && formik.errors.picture}
                    label="Picture"
                    name="picture"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.picture}
                    />
                </Stack>
              </Stack>
              {formik.errors.Submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.Submit}
                </Typography>
              )}
              <Button
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Edit
              </Button>
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
