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
import { NewAddress } from './newAddress';
import { ExistingAddress } from './existingAddress';


export const BillingAddress = (props) => {
    const { addresses , setPhase={setPhase} } = props;
    const [value, setValue] = React.useState('New Address');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <Stack spacing={3}>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>1</Avatar>
                    <Typography variant="h6" sx={{ pt: 1, }}>
                        Billing Address
                    </Typography>
                </Stack>
                {addresses.length > 0 && <FormControl sx={{pl:1.5}}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="New Address" control={<Radio />} label="New Address" />
                        <FormControlLabel value="Existing Address" control={<Radio />} label="Existing Address" />

                    </RadioGroup>
                </FormControl>}
            </Stack>

            {value == 'Existing Address' && <ExistingAddress addresses={addresses} setPhase={setPhase}/>}
            {value == 'New Address' && <NewAddress setPhase={setPhase}/>}
        </Stack>
    );
};