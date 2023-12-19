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

export const NewAddress = (props) => {
    const { setPhase,setAddress } = props;
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            streetAddress: '',
            streetAddressline2: '',
            state: '',
            postalCode: '',

        },
        validationSchema: Yup.object({
            firstName: Yup
                .string()
                .max(255)
                .required('Name is required'),
            lastName: Yup
                .string()
                .max(255)
                .required('Name is required'),
            streetAddress: Yup
                .string()
                .max(255)
                .required('Available Quantity is required'),
            streetAddressline2: Yup
                .string()
                .max(255),
            state: Yup
                .string()
                .max(255)
                .required('Medical Use is required'),
            postalCode: Yup
                .string()
                .max(255)
                .required('Active Ingredient is required'),
        }),
        onSubmit: async (values, helpers) => {
            try {
                const body = {
                    "FirstName": values.firstName,
                    "LastName": values.lastName,
                    "AddressLine": values.streetAddress,
                    "AddressLine2": values.streetAddressline2,
                    "City": values.state,
                    "PostalCode": values.postalCode,
                }
                await axios({
                    method: 'POST',
                    url: 'http://localhost:8001/patient/addAddress',
                    data: body,
                    withCredentials: true,
                })
                    .then((res) => {
                        setAddress(res.data.address._id);
                        setPhase('2');
                    })
            } catch (err) {
                console.log('here ====> ', err)
                helpers.setStatus({ success: false });
                helpers.setErrors({ Submit: err.response.data.message });
                helpers.setSubmitting(false);
            }
        }
    });
    return (
        <form
            noValidate
            onSubmit={formik.handleSubmit}
        >
            <Stack spacing={3} >
                <Stack spacing={3} direction="row">
                    <TextField
                        error={!!(formik.touched.firstName && formik.errors.firstName)}
                        fullWidth
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        label="First Name"
                        name="firstName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />
                    <TextField
                        error={!!(formik.touched.lastName && formik.errors.lastName)}
                        fullWidth
                        helperText={formik.touched.lastName && formik.errors.lastName}
                        label="Last Name"
                        name="lastName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    />
                </Stack>
                <Stack spacing={3} direction="row">
                    <TextField
                        error={!!(formik.touched.streetAddress && formik.errors.streetAddress)}
                        fullWidth
                        helperText={formik.touched.streetAddress && formik.errors.streetAddress}
                        label="Street Address"
                        name="streetAddress"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.streetAddress}
                    />
                    <TextField
                        error={!!(formik.touched.streetAddressline2 && formik.errors.streetAddressline2)}
                        fullWidth
                        helperText={formik.touched.streetAddressline2 && formik.errors.streetAddressline2}
                        label="Street Line 2 (optional)"
                        name="streetAddressline2"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.streetAddressline2}
                    />
                </Stack>
                <Stack spacing={3} direction="row" maxWidth={312.5}>
                    <TextField
                        error={!!(formik.touched.state && formik.errors.state)}
                        fullWidth
                        helperText={formik.touched.state && formik.errors.state}
                        label="State"
                        name="state"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.state}
                    />
                    <TextField
                        error={!!(formik.touched.postalCode && formik.errors.postalCode)}
                        fullWidth
                        helperText={formik.touched.postalCode && formik.errors.postalCode}
                        label="Zip code"
                        name="postalCode"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.postalCode}
                    />
                </Stack>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ width: 200 }}
                >
                    Continue
                </Button>
            </Stack>
        </form>
    );
};