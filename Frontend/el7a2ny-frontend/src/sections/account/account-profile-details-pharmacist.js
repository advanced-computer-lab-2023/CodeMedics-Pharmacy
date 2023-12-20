import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
  MenuItem,
  Stack,
  Unstable_Grid2 as Grid
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';

export const AccountProfileDetailsPharmacist = ({ values, setValues }) => {

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      FirstName: values.Name,
      Username: values.Username,
      Password: '',
      Email: values.Email,
      Number: values.Number,
      DateOfBirth: values.DateOfBirth,
    },
    validationSchema: Yup.object({
      FirstName: Yup
        .string()
        .max(255)
        .required('Name is required'),
      Username: Yup
        .string()
        .max(255)
        .required('Username is required'),
      Password: Yup
        .string()
        .max(255),
      Email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      DateOfBirth: Yup
        .date()
        .required('Date of birth is required'),
      Number: Yup
        .string()
        .max(255)
        .required('Number is required'),
      
    }),
    onSubmit: async (values, helpers) => {
      try {
        const body = {
          "FirstName": values.FirstName,
          "Username": values.Username,
          "Password": values.Password,
          "Email": values.Email,
          "DateOfBirth": values.DateOfBirth,
          "Number": values.Number,
          "Gender": values.Gender,
          
        };
        await axios('http://localhost:8000/patient/updateMe', {
          method: 'PATCH',
          data: body,
          withCredentials: true
        })
          .then((res) => {
            if (res.status != 200) {
              throw new Error(res.data.message);
            }
            return res['data'];
          })
          .then((data) => {
            router.push('/auth/login');
          });
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ Submit: err.response.data.message });
        helpers.setSubmitting(false);
      }
    }
  });
  return (
    <div>
      <form
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Card>
          <CardHeader
            subheader=""
            title="Profile"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    error={!!(formik.touched.FirstName && formik.errors.FirstName)}
                    fullWidth
                    helperText={formik.touched.FirstName && formik.errors.FirstName}
                    label="FirstName"
                    name="FirstName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.FirstName}
                    disabled
                  />
                </Grid>
            
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    error={!!(formik.touched.Username && formik.errors.Username)}
                    fullWidth
                    helperText={formik.touched.Username && formik.errors.Username}
                    label="Username"
                    name="Username"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.Username}
                    disabled
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
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
                    disabled
                  />
                </Grid>
                
                
                <Grid
                  xs={12}
                  md={6}
                >
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
                        formik.setFieldValue("DateOfBirth", formattedValue);
                      }
                    }}
                    disabled
                    type="date"
                    value={formik.values.DateOfBirth}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                
                
                
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          
        </Card>
      </form>
      
    </div>
  );
};
