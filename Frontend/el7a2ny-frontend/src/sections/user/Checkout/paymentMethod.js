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


export const PaymentMethod = (props) => {
    const {value , handleChange , credit , address} = props;
    
    return (
        <Stack>
            <Stack direction="row" spacing={2}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>2</Avatar>
                <Typography variant="h6" sx={{ pt: 1, }}>
                    Payment Method
                </Typography>
            </Stack>
            <FormControl sx={{ml: 1.5}}>
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="Credit Card" control={<Radio />} label="Credit Card" />
                    <FormControlLabel value="Cash On Delivery" control={<Radio />} label="Cash On Delivery" />
                    <FormControlLabel value="Wallet" control={<Radio />} label="My Wallet" />

                </RadioGroup>
            </FormControl>
            {credit && <PaymentForm address={address}/>}
        </Stack>
    );
};