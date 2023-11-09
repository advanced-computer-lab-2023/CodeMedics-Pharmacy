import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
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

export const OverviewLatestProducts = (props) => {
  const { products = [], sx } = props;

  // Create a map to store selected quantities for each product
  const [selectedQuantities, setSelectedQuantities] = useState({});

  const handleQuantityChange = (event, productId) => {
    const updatedQuantities = { ...selectedQuantities };
    updatedQuantities[productId] = event.target.value;
    setSelectedQuantities(updatedQuantities);
  };

  return (
    <CardContent>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={2}
      >
        {products.map((product, index) => {
          const ago = formatDistanceToNow(product.updatedAt);

          const handleAddToCart = () => {
            // Implement the Add to Cart logic here
          };

          return (
            <Card
              key={product.id}
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
                  {product.image ? (
                    <Box
                      component="img"
                      src={product.image}
                      sx={{
                        borderRadius: '50%',
                        height: 120,
                        width: 120,
                        objectFit: 'cover',
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
                  secondary={`Updated ${ago} ago`}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <CardActions>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Box sx={{ marginRight: 8 }} /> {/* Add space between the select and the button */}
                <FormControl variant="outlined" size="small" sx={{ minWidth: 80 }}>
                  <InputLabel id={`quantity-label-${product.id}`}>Quantity</InputLabel>
                  <Select
                    labelId={`quantity-label-${product.id}`}
                    id={`quantity-${product.id}`}
                    value={selectedQuantities[product.id] || 1}
                    onChange={(event) => handleQuantityChange(event, product.id)}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
              </CardActions>
            </Card>
          );
        })}
      </Box>
      <Divider />
    </CardContent>
  );
};

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
};
