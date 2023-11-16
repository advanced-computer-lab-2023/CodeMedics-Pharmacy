import Head from 'next/head';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Box, Button, Container, Stack, SvgIcon, Typography , TextField ,CardContent,Card,FormControlLabel , Checkbox} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/pharmacist/layout';
import axios from 'axios';
import DocumentArrowUpIcon from '@heroicons/react/24/solid/DocumentArrowUpIcon';



const Page = () => {
  const router = useRouter();
  const [auth , setAuth] = useState(false);

  useEffect(() => {
    if(!Cookies.get('token')) 
      router.replace('/auth/login');
    else{
        axios.post('http://localhost:8000/auth',{
          "token": Cookies.get('token'),
          "type": 'pharmacist'
        }).then((res) => {
          return res;
        })
        .then((data) => {
          setAuth(true);
        })
        .catch((err) => {
          router.replace('/pharmacist/404');
        });
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
            otc: true,
            picture: null,
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
            .number()
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
            otc: Yup
            .boolean(),
            picture: Yup
            .mixed()
            .test('fileRequired', 'Picture is required', value => value !== null),
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
                "otc": values.otc,
            };
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('availableQuantity', values.availableQuantity);
            formData.append('Description', values.description);
            formData.append('activeIngredients', values.activeIngredient);
            formData.append('medicalUse', values.medicalUse);
            formData.append('Picture', values.picture);
            formData.append('otc', values.otc);
            console.log(formData);

              await axios.post('http://localhost:8000/addMedicine' , formData , { 
                headers: {
                'Content-Type': 'multipart/form-data',
              },})
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
          Add Medicine
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
                  Add Medicine
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
                    <FormControlLabel 
                      control={
                        <Checkbox 
                          defaultChecked={formik.values.otc} 
                          onChange={ () => formik.values.otc = !formik.values.otc}
                        />
                      } 
                      label="Over The Counter" 
                    />
                    <Stack sx={{pl:0,pr:60}}>
                    <label htmlFor="picture">
                    <Button
                    component="span"
                    fullWidth
                    size="medium"
                    sx={{
                      mt: 3,
                      backgroundColor: '#F8F8F8', // Blue color
                      '&:hover': {
                        backgroundColor: '#F1F1F1', // Darker blue color on hover
                      },
                    }}
                    endIcon={(
                    <SvgIcon fontSize="small">
                      <DocumentArrowUpIcon/>
                    </SvgIcon>
                  )}
                  >
                    Upload Picture   
                  </Button>
                  {formik.submitCount > 0 && !formik.values.picture && formik.touched.picture && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                      Picture is required
                    </Typography>
                  )}
                  {formik.touched.picture && formik.errors.picture && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}/>
                  )}
                  {formik.values.picture && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {formik.values.picture.name}
                    </Typography>
                  )}
                  <input
                    id="picture"
                    name="picture"
                    type="file"
                    accept=".jpg, .jpeg, .png, .pdf"
                    onChange={(event) => {
                      formik.setFieldValue('picture', event.currentTarget.files[0]);
                    }}
                    style={{ display: 'none' }}
                  />
                </label>
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
