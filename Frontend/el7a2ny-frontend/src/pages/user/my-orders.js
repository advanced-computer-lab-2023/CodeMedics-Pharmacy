import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { Box, Button, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { ordersApi } from '../../api/orders';
import { useMounted } from '../../hooks/use-mounted';
import { usePageView } from '../../hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/pharmacist/layout';
import { OrderDrawer } from '../../sections/order/Pharmacist/order-drawer'; //Patient
import { OrderListContainer } from '../../sections/order/Pharmacist/order-list-container'; //Patient
import { OrderListSearch } from '../../sections/order/Pharmacist/order-list-search'; //Patient
import { OrderListTable } from '../../sections/order/Pharmacist/order-list-table';//Patient
import axios from 'axios';
import Message from 'src/components/Message';
const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      query: undefined,
      status: undefined
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'createdAt',
    sortDir: 'desc'
  });

  return {
    search,
    updateSearch: setSearch
  };
};


const Page = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const rootRef = useRef(null);
  const { search, updateSearch } = useSearch();
  let { orders, ordersCount } = useOrders(search);
  const [drawer, setDrawer] = useState({
    isOpen: false,
    data: undefined
  });
  const currentOrder = useMemo(() => {
    if (!drawer.data) {
      return undefined;
    }

    return orders.find((order) => order.id === drawer.data);
  }, [drawer, orders]);

  usePageView();

  const useOrders = (search) => {
    const isMounted = useMounted();
    const [state, setState] = useState({
      orders: [],
      ordersCount: 0
    });
  
    const getOrders = useCallback(async () => {
      try {
        const response = await axios.get('http://localhost:8001/pharmacist/getOrders' , {withCredentials: true});
  
        if (isMounted()) {
          setState({
            orders: response.data,
            ordersCount: response.data.length
          });
        }
      } catch (err) {
        console.error(err);
        setShowError(true);
        setErrorMessage(err.response.data.message);
      }
    }, [search, isMounted]);
  
    useEffect(() => {
        getOrders();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [search]);
  
    return state;
  };

  const handleFiltersChange = useCallback((filters) => {
    updateSearch((prevState) => ({
      ...prevState,
      filters
    }));
  }, [updateSearch]);

  const handleSortChange = useCallback((sortDir) => {
    updateSearch((prevState) => ({
      ...prevState,
      sortDir
    }));
  }, [updateSearch]);

  const handlePageChange = useCallback((event, page) => {
    updateSearch((prevState) => ({
      ...prevState,
      page
    }));
  }, [updateSearch]);

  const handleRowsPerPageChange = useCallback((event) => {
    updateSearch((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10)
    }));
  }, [updateSearch]);

  const handleOrderOpen = useCallback((orderId) => {
    // Close drawer if is the same order

    if (drawer.isOpen && drawer.data === orderId) {
      setDrawer({
        isOpen: false,
        data: undefined
      });
      return;
    }

    setDrawer({
      isOpen: true,
      data: orderId
    });
  }, [drawer]);

  const handleOrderClose = useCallback(() => {
    setDrawer({
      isOpen: false,
      data: undefined
    });
  }, []);
//   useEffect(() => {
//     axios.get('http://localhost:8001/Pharmacist/getOrders', { withCredentials: true })
//          .then((response) => {
//            console.log(response.data)
//            orders=response.data.flat();
//            ordersCount=response.data.length;
//
//          }).catch((error) => {
//       console.log(error);
//     });
//   }, []);// Months API CALL
// console.log(orders);
  return (
    <>
      <Head>
        <title>
          Orders
        </title>
      </Head>
      <Message condition={showError} setCondition={setShowError} message={errorMessage} title="Error" buttonAction="Close" /> 
      <Divider />
      <Box
        component="main"
        ref={rootRef}
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: 'flex',
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0
          }}
        >
          <OrderListContainer open={drawer.isOpen}>
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Typography variant="h4">
                    Orders
                  </Typography>
                </div>
                {/* <div>
                 <Button
                 startIcon={(
                 <SvgIcon>
                 <PlusIcon />
                 </SvgIcon>
                 )}
                 variant="contained"
                 >
                 Add
                 </Button>
                 </div> */}
              </Stack>
            </Box>
            <Divider />
            <OrderListSearch
              onFiltersChange={handleFiltersChange}
              onSortChange={handleSortChange}
              sortBy={search.sortBy}
              sortDir={search.sortDir}
            />
            <Divider />
            <OrderListTable
              onOrderSelect={handleOrderOpen}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              orders={orders}
              ordersCount={ordersCount}
              page={search.page}
              rowsPerPage={search.rowsPerPage}
            />
          </OrderListContainer>
          <OrderDrawer
            container={rootRef.current}
            onClose={handleOrderClose}
            open={drawer.isOpen}
            order={currentOrder}
          />
        </Box>
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
