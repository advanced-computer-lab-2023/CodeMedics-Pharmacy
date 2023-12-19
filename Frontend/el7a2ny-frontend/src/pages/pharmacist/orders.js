import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { Box, Button, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { ordersApi } from '../../api/orders';
import { useMounted } from '../../hooks/use-mounted';
import { usePageView } from '../../hooks/use-page-view';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/pharmacist/layout';
import { OrderDrawer } from '../../sections/order/Pharmacist/order-drawer';
import { OrderListContainer } from '../../sections/order/Pharmacist/order-list-container';
import { OrderListSearch } from '../../sections/order/Pharmacist/order-list-search';
import { OrderListTable } from '../../sections/order/Pharmacist/order-list-table';
import { useSelection } from 'src/hooks/use-selection';
import { applyPagination } from 'src/utils/apply-pagination';
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



const useOrder = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data, page, rowsPerPage]
  );
};

const useOrderId = (order) => {
  return useMemo(
    () => {
      return order.map((customer) => customer.id);
    },
    [order]
  );
};


const Page = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
    
  const useOrders = (search) => {
    const isMounted = useMounted();
    const [state, setState] = useState({
      orders: [],
      ordersCount: 0
    });

    const getOrders = useCallback(async () => {
      try {
        const response = await axios.get('http://localhost:8001/pharmacist/getOrders', { withCredentials: true });

        if (isMounted()) {
          setState({
            orders: response.data,
            ordersCount: response.data.length
          });
        }
      } catch (err) {
        console.error(err);
      }
    }, [search, isMounted]);

    useEffect(() => {
      getOrders();
    },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [search]);

    return state;
  };

 
  const rootRef = useRef(null);
  const { search, updateSearch } = useSearch();
  const { orders, ordersCount } = useOrders(search);
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const tableOrders = useOrder(data, page, rowsPerPage);
  const tableOrdersIds = useOrderId(tableOrders);

  useEffect(() => {
    axios.get('http://localhost:8001/pharmacist/getOrders', { withCredentials: true })
      .then((response) => {
        setAllData(response.data);
        setData(response.data);
        setFilteredData(response.data);
        setSearchData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setShowError(true);
        setErrorMessage(error.message);
      });

  }, []);

  

  const [drawer, setDrawer] = useState({
    isOpen: false,
    data: undefined
  });
  const currentOrder = useMemo(() => {
    if (!drawer.data) {
      return undefined;
    }

    return allData.find((order) => order.id === drawer.data);
  }, [drawer, allData]);

  usePageView();

  const handleSearchChange = (str) => {
    setSearchData(allData.filter((order) => order.number.toString().toLowerCase().includes(str)));
  };

  const handleFiltersChange = (filters) => {
    console.log('filter changed ', filters);
    if (filters.status == undefined) {
      setFilteredData(allData);
    }
    else if (filters.status == 'ordered') {
      setFilteredData(allData.filter((order) => order.status == 'ordered'));
    }
    else if (filters.status == 'completed') {
      setFilteredData(allData.filter((order) => order.status == 'completed'));
    }
    else if (filters.status == 'canceled') {
      setFilteredData(allData.filter((order) => order.status == 'canceled'));
    }
    else {
      setFilteredData(allData);
    }
  };

  useEffect(() => {
    handleData();
  }, [searchData, filteredData]);

  const handleData = () => {
    console.log('filteredData ', filteredData);
    setData(allData.filter((order) => filteredData.includes(order) && searchData.includes(order))); //  
  }

  const handleSortChange = useCallback((sortDir) => {
    updateSearch((prevState) => ({
      ...prevState,
      sortDir
    }));
  }, []);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleOrderOpen = useCallback((orderId) => {
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
  return (
    <>
      <Head>
        <title>
          Orders
        </title>
      </Head>
      <Message condition={showError} setCondition={setShowError} title={"Error"} message={errorMessage} buttonAction={"Close"} />
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
              onSearchChange={handleSearchChange}
              sortBy={search.sortBy}
              sortDir={search.sortDir}
            />
            <Divider />
            {data.length > 0 && <OrderListTable
              onOrderSelect={handleOrderOpen}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              orders={tableOrders}
              ordersCount={data.length}
              page={page}
              rowsPerPage={rowsPerPage}
            />}
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
