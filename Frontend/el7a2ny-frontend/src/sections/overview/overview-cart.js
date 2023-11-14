import { use, useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import Cookies from 'js-cookie';
import axios from 'axios';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CardMedia

} from '@mui/material';
import { useRouter } from 'next/router';
const username = Cookies.get('username');

export const OverviewLatestOrders = ({ orders, sx }) => {
  const [cart, setCart] = useState(orders);
  const router = useRouter();
  const username = Cookies.get('username');
  useEffect(() => {
    fetch(`http://localhost:8000/getCart?username=${username}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Updated Cart:', data);
        setCart(data);
      })
      .catch((error) => {
        console.error('Error fetching updated cart:', error);
      });
  }, [cart]); 

  const handleIncrement = (productID) => {
    const quantity = 1;
    updateCart(productID, quantity);
  };

  const handleDecrement = (productID) => {
    const quantity = -1;
    updateCart(productID, quantity);
  };

  const updateCart = (productID, quantity) => {
    fetch(`http://localhost:8000/updateMedicine`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Username: username,
        productID: productID,
        quantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product Changed in cart:', data);
      })
      .catch((error) => {
        console.error('Error updating product quantity:', error);
      });
  };

  const handleProceedToCheckout = () => {
    console.log(username);
    router.push('/user/review');
    // axios.get(`http://localhost:8000/user/checkValidity`, { username: username })
    //   .then((res) => {
    //     return res['data'];
    //   })
    //   .then((data) => {
    //     router.push('/user/review');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     alert(err.message);
    //     window.location.reload();
    //   });

  };

  return (
    <CardContent>
      {cart.map((product) => (
        <Card
          key={product.medicineID}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={product.picture || 'placeholder_image_url'} // Use a placeholder image URL if the actual image is not available
            alt={product.medicineName}
            style={{
              objectFit: 'contain', // Ensure the image covers the entire container
              marginBottom: '8px', // Add some spacing between image and content
            }}
          />
          <CardContent>
            <Typography variant="h6">{product.medicineName}</Typography>
            <Typography variant="body2">Quantity: {product.quantity}</Typography>
            <Typography variant="body2">Total Price: ${product.price * product.quantity}</Typography>
          </CardContent>

          <CardActions>
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={() => handleIncrement(product.medicineID)}
            >
              +
            </Button>
            <Button
              color="secondary"
              variant="contained"
              size="small"
              onClick={() => handleDecrement(product.medicineID)}
            >
              -
            </Button>
          </CardActions>
        </Card>
      ))}
      <Divider />

      {/* Proceed to Checkout Button */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleProceedToCheckout}
        sx={{ marginTop: 2 }}
      >
        Proceed to Checkout
      </Button>
    </CardContent>
  );
};

OverviewLatestOrders.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
};
