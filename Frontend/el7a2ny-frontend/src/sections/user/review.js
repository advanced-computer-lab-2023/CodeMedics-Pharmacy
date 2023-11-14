import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { set } from 'lodash';
import { Button, Container, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import { display } from '@mui/system';
const products = [
  {
    name: 'Product 1',
    Description: 'A nice thing',
    price: 9.99,
    num: 1,
  },
  {
    name: 'Product 2',
    Description: 'Another thing',
    price: 3.45,
    num: 1,
  },
  {
    name: 'Product 3',
    Description: 'Something else',
    price: 6.51,
    num: 1,
  },
  {
    name: 'Product 4',
    Description: 'Best thing of all',
    price: 14.11,
    num: 1,
  },
  { name: 'Shipping', Description: '', price: 0, Quantity: 0 },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const getDiscount = (username) => {
  // TODO: get the discount according to the user's health package
  return 0;
}

const calculateTotal = (products) => {
  let total = 0;
  products.forEach((product) => {
    total += product.price;
  });
  return total;
};

export default function Review() {
  const router = useRouter();
  const [orderedProducts, setOrderedProducts] = useState(products);
  const userName = Cookies.get('username');
  const Orderaddress = {AddressLine: '1 MUI Drive', City: 'Reactville', PostalCode: '99999'};
  // const [pack, setPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(calculateTotal(products));
  console.log("in the review component");
  useEffect(() => {
    axios.get(`http://localhost:8000/getCart?username=${userName}`, {
      withCredentials: true
    }).then(response => {
      console.log("I am here");
      // setOrderedProducts(response.data);
      // setTotal(calculateTotal(response.data));
      setOrderedProducts(products);
      setTotal(calculateTotal(products));
      setIsLoading(false); 
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const handleProceedToPayment = () => {
    // Implement logic for proceeding to payment
    router.push('/user/payment', );
    console.log('Proceeding to payment...');
  };
  const styles = `
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 80vh;
    }

    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;


  return (
    isLoading ? (
      <div>
      <style>{styles}</style>
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
    ) : (
      <React.Fragment>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}></Paper>
      <Typography variant="h4" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {orderedProducts.map((product) => (
          <ListItem key={product.name} sx={{ display: 'flex', alignItems: 'center', py: 1, px: 0 }}>
          {product.name !== 'Shipping' && (
            <React.Fragment>
              <ListItemText primary={product.name} secondary={product.Description} />
              <ListItemText primary={product.num + "x"} sx={{ minWidth: '20px', py: 0, px: 2, textAlign: 'center' }} />
              <Typography variant="body2">{product.price}</Typography>
            </React.Fragment>
          )}
        </ListItem>
        
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>

      </Grid>
      <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
      <Button variant="contained"  color="primary" style={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
      }} onClick={
        handleProceedToPayment
      }>
        Proceed to Payment
      </Button>
      </div>
      </Container>
    </React.Fragment>
    
    )
  );
}