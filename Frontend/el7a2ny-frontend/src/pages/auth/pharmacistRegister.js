import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography, SvgIcon, Alert } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import axios from 'axios';
//import { error } from 'console';
import DocumentArrowUpIcon from '@heroicons/react/24/solid/DocumentArrowUpIcon';
import React from 'react';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      Name: '',
      Username: '',
      Password: '',
      Email: '',
      DateOfBirth: '',
      HourlyRate: '',
      affiliation: '',
      Degree: '',
      IDDocument: null,
      pharmacyDegree: null,
      workingLicense: null,
      Submit: null
    }, validationSchema: Yup.object({
      Name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      Username: Yup
        .string()
        .max(255)
        .required('Username is required'),
      Password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      Email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      DateOfBirth: Yup
        .date()
        .required('Date of birth is required'),
      HourlyRate: Yup
        .number()
        .required('Hourly rate is required'),
      affiliation: Yup
        .string()
        .required('Affiliation is required'),
      Degree: Yup
        .string()
        .required('Degree is required'),
      IDDocument: Yup
        .mixed()
        .test('fileRequired', 'National ID is required', value => value !== null),
      pharmacyDegree: Yup
        .mixed()
        .test('fileRequired', 'Pharmacy Degree is required', value => value !== null),
      workingLicense: Yup
        .mixed()
        .test('fileRequired', 'Pharmacy License is required', value => value !== null)
    }), onSubmit: async (values, helpers) => {

      try {
        const formData = new FormData();
        formData.append('Name', values.Name);
        formData.append('Username', values.Username);
        formData.append('Password', values.Password);
        formData.append('Email', values.Email);
        formData.append('DateOfBirth', values.DateOfBirth);
        formData.append('HourlyRate', values.HourlyRate);
        formData.append('affiliation', values.affiliation);
        formData.append('Degree', values.Degree);
        formData.append('IDDocument', values.IDDocument);
        formData.append('pharmacyDegree', values.pharmacyDegree);
        formData.append('workingLicense', values.workingLicense);
        console.log('IDDocument ------> ',values.IDDocument);
        // const body = {
        //   'Name': values.Name,
        //   'Username': values.Username,
        //   'Password': values.Password,
        //   'Email': values.Email,
        //   'DateOfBirth': values.DateOfBirth,
        //   'HourlyRate': values.HourlyRate,
        //   'affiliation': values.affiliation,
        //   'Degree': values.Degree,
        //   'IDDocument': values.IDDocument,
        //   'pharmacyDegree': values.pharmacyDegree,
        //   'workingLicense': values.workingLicense
        //
        // };

        await axios.post('http://localhost:8001/pharmacist/register', formData, 
        { // done new Route
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        })
                   .then((res) => {
                     return res['data'];
                   })
                   .then((data) => {
                     router.push('/auth/login');
                   });
      } catch (err) {
        console.log(err.response.data.message)
        if (err.response.status == 400) { setShowErrorAlert(true);}
        helpers.setStatus({ success: false });
        helpers.setErrors({ Submit: err.response.data.error });
        helpers.setSubmitting(false);
      }
    }
  });

  return (<>
    <Head>
      <title>
        Pharmacist Register
      </title>
    </Head>
    <Box
      sx={{
        flex: '1 1 auto', alignItems: 'center', display: 'flex', justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          maxWidth: 550, px: 3, py: '100px', width: '100%'
        }}
      >
        <div>
          <Stack
            spacing={1}
            sx={{ mb: 3 }}
          >
            <Typography variant="h4">
              Register as Pharmacist
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              Already have an account?
              &nbsp;
              <Link
                component={NextLink}
                href="/auth/login"
                underline="hover"
                variant="subtitle2"
              >
                Log in
              </Link>
            </Typography>
            {showErrorAlert && (
              <Alert severity="error">Please choose a different Username or Email!</Alert>
            )}
          </Stack>
          <form
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Stack spacing={3}>
              <TextField
                error={!!(formik.touched.Name && formik.errors.Name)}
                fullWidth
                helperText={formik.touched.Name && formik.errors.Name}
                label="Name"
                name="Name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.Name}
              />
              <TextField
                error={!!(formik.touched.Username && formik.errors.Username)}
                fullWidth
                helperText={formik.touched.Username && formik.errors.Username}
                label="Username"
                name="Username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.Username}
              />
              <TextField
                error={!!(formik.touched.Password && formik.errors.Password)}
                fullWidth
                helperText={formik.touched.Password && formik.errors.Password}
                label="Password"
                name="Password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.Password}
              />
              <TextField
                error={!!(formik.touched.Email && formik.errors.Email)}
                fullWidth
                helperText={formik.touched.Email && formik.errors.Email}
                label="Email Address"
                name="Email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.Email}
              />
              <TextField
                error={!!(formik.touched.DateOfBirth && formik.errors.DateOfBirth)}
                fullWidth
                helperText={formik.touched.DateOfBirth && formik.errors.DateOfBirth}
                label="Date of Birth"
                name="DateOfBirth"
                onBlur={formik.handleBlur}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value.length <= 10) { // Limit the total length to 10 characters
                    // Allow only digits (0-9) in the "yyyy" part
                    const yyyy = value.slice(0, 4).replace(/[^0-9]/g, '');

                    // Ensure "mm" and "dd" are not affected
                    const mmdd = value.slice(4);

                    // Combine the parts and format
                    const formattedValue = `${yyyy}${mmdd}`;

                    // Update the formik value
                    formik.setFieldValue('DateOfBirth', formattedValue);
                  }
                }}
                type="date"
                value={formik.values.DateOfBirth}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                error={!!(formik.touched.HourlyRate && formik.errors.HourlyRate)}
                fullWidth
                helperText={formik.touched.HourlyRate && formik.errors.HourlyRate}
                label="Hourly Rate (EGP)"
                name="HourlyRate"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
                value={formik.values.HourlyRate}
              />
              <TextField
                error={!!(formik.touched.affiliation && formik.errors.affiliation)}
                fullWidth
                helperText={formik.touched.affiliation && formik.errors.affiliation}
                label="Affiliation"
                name="affiliation"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.affiliation}
              />
              <TextField
                error={!!(formik.touched.Degree && formik.errors.Degree)}
                fullWidth
                helperText={formik.touched.Degree && formik.errors.Degree}
                label="Degree"
                name="Degree"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.Degree}
              />
              <label htmlFor="IDDocument">
                <Button
                  component="span"
                  fullWidth
                  size="medium"
                  sx={{
                    mt: 3, backgroundColor: '#F8F8F8', // Blue color
                    '&:hover': {
                      backgroundColor: '#F1F1F1' // Darker blue color on hover
                    }
                  }}
                  endIcon={(<SvgIcon fontSize="small">
                    <DocumentArrowUpIcon/>
                  </SvgIcon>)}
                >
                  Upload National ID
                </Button>
                {formik.submitCount
                  > 0
                  && !formik.values.IDDocument
                  && formik.touched.IDDocument
                  && (<Typography color="error"
                                  variant="body2" sx={{ mt: 1 }}>
                    National ID is required
                  </Typography>)}
                {formik.touched.IDDocument && formik.errors.IDDocument && (
                  <Typography color="error"
                              variant="body2"
                              sx={{ mt: 1 }}/>)}
                {formik.values.IDDocument && (<Typography variant="body2" sx={{ mt: 1 }}>
                  {formik.values.IDDocument.name}
                </Typography>)}
                <input
                  id="IDDocument"
                  name="IDDocument"
                  type="file"
                  accept=".jpg, .jpeg, .png, .pdf"
                  onChange={(event) => {
                    console.log('IDDocument ------> ',event.currentTarget.files[0]);
                    formik.setFieldValue('IDDocument', event.currentTarget.files[0]);
                  }}
                  style={{ display: 'none' }}
                />
              </label>

              <label htmlFor="pharmacyDegree">
                <Button
                  component="span"
                  fullWidth
                  size="medium"
                  sx={{
                    mt: 3, backgroundColor: '#F8F8F8', // Blue color
                    '&:hover': {
                      backgroundColor: '#F1F1F1' // Darker blue color on hover
                    }
                  }}
                  endIcon={(<SvgIcon fontSize="small">
                    <DocumentArrowUpIcon/>
                  </SvgIcon>)}
                >
                  Upload Pharmacy Degree
                </Button>
                {formik.submitCount
                  > 0
                  && !formik.values.pharmacyDegree
                  && formik.touched.pharmacyDegree
                  && (<Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    Medical Degree is required
                  </Typography>)}
                {formik.touched.pharmacyDegree && formik.errors.pharmacyDegree && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}/>)}
                {formik.values.pharmacyDegree && (<Typography variant="body2" sx={{ mt: 1 }}>
                  {formik.values.pharmacyDegree.name}
                </Typography>)}
                <input
                  id="pharmacyDegree"
                  name="pharmacyDegree"
                  type="file"
                  accept=".jpg, .jpeg, .png, .pdf"
                  onChange={(event) => {
                    formik.setFieldValue('pharmacyDegree', event.currentTarget.files[0]);
                  }}
                  style={{ display: 'none' }}
                />
              </label>
              <label htmlFor="workingLicense">
                <Button
                  component="span"
                  fullWidth
                  size="medium"
                  sx={{
                    mt: 3, backgroundColor: '#F8F8F8', // Blue color
                    '&:hover': {
                      backgroundColor: '#F1F1F1' // Darker blue color on hover
                    }
                  }}
                  endIcon={(<SvgIcon fontSize="small">
                    <DocumentArrowUpIcon/>
                  </SvgIcon>)}
                >
                  Upload Pharmacy License
                </Button>
                {formik.submitCount
                  > 0
                  && !formik.values.workingLicense
                  && formik.touched.workingLicense
                  && (<Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    Medical License is required
                  </Typography>)}
                {formik.touched.workingLicense && formik.errors.workingLicense && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}/>)}
                {formik.values.workingLicense && (<Typography variant="body2" sx={{ mt: 1 }}>
                  {formik.values.workingLicense.name}
                </Typography>)}
                <input
                  id="workingLicense"
                  name="workingLicense"
                  type="file"
                  accept=".jpg, .jpeg, .png, .pdf"
                  onChange={(event) => {
                    formik.setFieldValue('workingLicense', event.currentTarget.files[0]);
                  }}
                  style={{ display: 'none' }}
                />
              </label>
            </Stack>
            {formik.errors.Submit && (<Typography
              color="error"
              sx={{ mt: 3 }}
              variant="body2"
            >
              {formik.errors.Submit}
            </Typography>)}
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              Continue
            </Button>
          </form>
        </div>
      </Box>
    </Box>
  </>);
};

Page.getLayout = (page) => (<AuthLayout>
  {page}
</AuthLayout>);

export default Page;
