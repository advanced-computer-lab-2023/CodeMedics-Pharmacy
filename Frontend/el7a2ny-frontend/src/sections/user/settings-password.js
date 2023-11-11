import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';

const username = Cookies.get('username');

export const SettingsPassword = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      submit: null
    },
    validationSchema: Yup.object({
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
        confirmPassword: Yup
        .string()
        .max(255)
        .required('Confirmation Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),
    onSubmit: async (values, helpers) => {
      if (values.password !== values.confirm) {
        
      }else{
        try {
            const body = {"email": values.email, "password": values.password};
            await axios.post('http://localhost:8000/login' , body)
              .then((res) => { 
                console.log(res);
                return res['data'];
              })
              .then((data) => {
                Cookies.set('token', data['token']);
                if (data['Type'] === 'Patient') {
                  Cookies.set('username', data['patient']['username']);
                  router.push(`/user/medicines`);
                } else if (data['Type'] === 'Pharmacist') {
                  Cookies.set('username', data['pharmacist']['username']);
                  router.push(`/pharmacist`);
                } else if (data['Type'] === 'Admin') {
                  Cookies.set('username', data['admin']['username']);
                  router.push(`/admin`);
                }
              });
        } catch (err) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.response.data.message });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (values.password !== values.confirm) {
        console.error('Passwords do not match');
        return;
      }
      try {
        const response = await fetch('http://localhost:8000/changePassword', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            newPassword: values.password,
          }),
        });
        if (response.ok) {
          console.log('Password updated successfully');
        } else {
          console.error('Failed to update password');
        }
      } catch (error) {
        console.error('An error occurred while updating the password', error);
      }
    },
    [values.password, values.confirm]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              label="Password (Confirm)"
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" onClick={() => {console.log("Clicked Update")}}>
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
