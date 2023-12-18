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

export const ExistingAddress = (props) => {
    const { addresses , setPhase} = props;
    return (
        <Stack spacing={3}>
            {addresses.length > 0 && <TextField
                sx={{ width: 200 }}
                id="myAddress"
                select
                label="My Addresses"
                defaultValue={addresses[0].value}
                helperText=""
                onChange={(str) => { console.log(str.target.value) }}
            > {addresses.map((option) => (
                <MenuItem key={option.value} value={option.value} >
                    {option.label}
                </MenuItem>
            ))}
            </TextField>}
            <Button
                variant="contained"
                onClick={() => { setPhase(2);}}
                sx={{ width: 200 }}
            >
                Continue
            </Button>
        </Stack>
    );
};