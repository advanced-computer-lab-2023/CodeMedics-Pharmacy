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

import Cookies from 'js-cookie';

const username = Cookies.get('username');

export const SettingsPassword = () => {
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

      // Check if password and confirm match
      if (values.password !== values.confirm) {
        console.error('Passwords do not match');
        return;
      }

      if(values.password.length === 0){
        console.error("No Password was provided");
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
          // Optionally, you can perform additional actions after a successful update
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
