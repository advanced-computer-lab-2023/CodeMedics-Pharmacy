import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import Cookies from 'js-cookie';
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
} from '@mui/material';
import axios from 'axios';
import Message from 'src/components/Message';

export const OverviewLatestProducts = (props) => {
  const { products: initialProducts = [], sx } = props;
  const [products, setProducts] = useState(initialProducts);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [viewingAlternatives, setViewingAlternatives] = useState(false);
  const username = Cookies.get("username");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // console.log(username);
  const handleQuantityChange = (event, productId) => {
    const updatedQuantities = { ...selectedQuantities };
    updatedQuantities[productId] = event.target.value;
    setSelectedQuantities(updatedQuantities);
  };

  const handleViewAlternatives = async (activeIngredient) => {
    try {
      const alternatives = [];
      for(let i = 0; i<products.length; i++){
        const currentProduct = products[i];
        if(currentProduct.availableQuantity > 0 && currentProduct.activeIngredients[0] === activeIngredient){
          alternatives.push(currentProduct);
        }
      }
      setProducts(alternatives);
      setViewingAlternatives(true);
    } catch (error) {
      console.error('Error fetching alternative medicines:', error);
      setShowError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleBackToAllMedicines = () => {
    // Reset products to the initial state and set viewingAlternatives to false
    setProducts(initialProducts);
    setViewingAlternatives(false);
  };

 
  return (
    <CardContent>
      <Message condition={showError} setCondition={setShowError} message={errorMessage} title="Error" buttonAction="Close" />
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={2}
      >
        {products.map((product, index) => {

            // console.log(product);
            const isOutOfStock = product.availableQuantity === 0;

            const handleAddToCart = (productID) => {
                const quantity = selectedQuantities[productID];
                
                console.log("in CART");
                console.log(quantity);
                console.log(productID);
                if (quantity) {
                  addToCartApiCall(username, productID, quantity);
                }else addToCartApiCall(username, productID, 1);

              };
            
              const addToCartApiCall = (username, productId, quantity) => {
                fetch(`http://localhost:8001/patient/updateMedicine`, { // done new Route
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    Username: username,
                    productID: productId,
                    quantity,
                  }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    console.log('Product added to cart:', data);
                  })
                  .catch((error) => {
                    console.error('Error adding product to cart:', error);
                  });
              };
            

          return (
            <Card
              key={product._id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <ListItem
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  textAlign: 'center',
                }}
              >
                <ListItemAvatar>
                  {product.Picture ? (
                    <Box
                      component="img"
                      src={`/assets/products/${product.Picture}`}
                      sx={{
                        borderRadius: '70%',
                        height: 130,
                        width: 130,
                        objectFit: 'contain',
                        margin: '0 auto',
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        borderRadius: '50%',
                        backgroundColor: 'neutral.200',
                        height: 120,
                        width: 120,
                      }}
                    />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  primaryTypographyProps={{ variant: 'subtitle1' }}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItemText
                secondary={product.price + "$"}
                primaryTypographyProps={{variant: 'subtitle2'}}
                secondaryTypographyProps={{variant: 'body2'}}
                />
                <ListItemText
                secondary={product.Description}
                primaryTypographyProps={{variant: 'subtitle2'}}
                secondaryTypographyProps={{variant: 'body2'}}
                />
              <CardActions>
              {isOutOfStock ? (
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    // You can implement the logic for "View Alternatives" here
                    onClick={() => {handleViewAlternatives(product.activeIngredients[0]);}}
                  >
                    View Alternatives
                  </Button>
                ) : (
                  <>
                    <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      onClick={() => {
                        handleAddToCart(product._id);
                      }}
                    >
                      Add to Cart
                    </Button>
                <Box sx={{ marginRight: 8 }} /> {/* Add space between the select and the button */}
                <FormControl variant="outlined" size="small" sx={{ minWidth: 80 }}>
                  <InputLabel id={`quantity-label-${product._id}`}>Quantity</InputLabel>
                  <Select
                    labelId={`quantity-label-${product._id}`}
                    id={`quantity-${product._id}`}
                    value={selectedQuantities[product._id] || 1}
                    onChange={(event) => handleQuantityChange(event, product._id)}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
                </>
                )}
              </CardActions>
            </Card>
          );
        })}
      </Box>
      {viewingAlternatives && (
        <Box mt={2} textAlign="center">
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={handleBackToAllMedicines}
          >
            Back to All Medicines
          </Button>
        </Box>
      )}
    </CardContent>
  );
};

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
};
