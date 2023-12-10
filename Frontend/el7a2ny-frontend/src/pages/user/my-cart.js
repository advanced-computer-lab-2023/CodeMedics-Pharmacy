import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/user/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-cart';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import Cookies from 'js-cookie';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


const now = new Date();
const username = Cookies.get('username');

const getCart = async (username) => {
    
};

const Page = () => {
    const [cart, setCart] = React.useState(null);
    const router = useRouter();

    const handleProceedToPayment = () => {
        router.push('/user/payment', );
      };

    React.useEffect(() => {
        try {
            axios.get(`http://localhost:8001/patient/getCart?username=${username}`, {}) // done new Route
                .then((res) => {
                    return res['data'];
                })
                .then((data) => {
                    setCart(data);
                });
        } catch (err) {
            // console.log(err);
        }
    }, []);

    return (
        <>
            <Head>
                <title>El7a2ny Pharmacy</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                {cart && <Container maxWidth="xl">
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            xs={20}
                            md={20}
                            lg={15}
                        >
                            <OverviewLatestOrders
                            handleProceedToPayment={handleProceedToPayment}
                                orders={cart}
                                sx={{ height: '100%' }}
                            />
                        </Grid>
                    </Grid>
                </Container>}
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