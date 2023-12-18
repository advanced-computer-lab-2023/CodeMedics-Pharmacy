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

export const OrdersSummary = (props) => {

    return (
        <Stack sx={{  }}>
            <Card sx={{ height: 500, width: 400 }}>
                <CardContent>

                </CardContent>
            </Card>
        </Stack>
    );
};