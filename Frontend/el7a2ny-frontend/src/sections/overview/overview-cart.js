// import { useEffect, useState } from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import PropTypes from 'prop-types';
// import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
// import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
// import Cookies from 'js-cookie';
// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   Divider,
//   IconButton,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   SvgIcon,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Typography,
// } from '@mui/material';

// export const OverviewLatestProducts = (props) => {
//   const { products = [], sx } = props;
  
//   return (
//     <CardContent>
//       <Box
//         display="grid"
//         gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
//         gap={2}
//       >
//         {products.map((product, index) => {
            
//           return (
//             <Card
//               key={product.medicineID}
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 height: '100%',
//                 textAlign: 'center',
//                 alignItems: 'center',
//               }}
//             >
//               <ListItem
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                   height: '100%',
//                   textAlign: 'center',
//                 }}
//               >
//                 <ListItemAvatar>
//                   {product.Picture ? (
//                     <Box
//                       component="img"
//                       src={product.Picture}
//                       sx={{
//                         borderRadius: '70%',
//                         height: 130,
//                         width: 130,
//                         objectFit: 'cover',
//                         margin: '0 auto',
//                       }}
//                     />
//                   ) : (
//                     <Box
//                       sx={{
//                         borderRadius: '50%',
//                         backgroundColor: 'neutral.200',
//                         height: 120,
//                         width: 120,
//                       }}
//                     />
//                   )}
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary={product.medicineName}
//                   primaryTypographyProps={{ variant: 'subtitle1' }}
//                   secondaryTypographyProps={{ variant: 'body2' }}
//                 />
//               </ListItem>
//               <ListItemText
//                 secondary={product.price}
//                 primaryTypographyProps={{variant: 'subtitle2'}}
//                 secondaryTypographyProps={{variant: 'body2'}}
//                 />

//               <CardActions>
//                 <Button
//                   color="primary"
//                   variant="contained"
//                   size="small"
//                   //onClick= //
//                 >
//                   Add to Cart
//                 </Button>
//                 <Box sx={{ marginRight: 8 }} /> {/* Add space between the select and the button */}
//                 <FormControl variant="outlined" size="small" sx={{ minWidth: 80 }}>
//                   <InputLabel id={`quantity-label-${product.medicineID}`}>Quantity</InputLabel>
//                   <Select
//                     labelId={`quantity-label-${product.medicineID}`}
//                     id={`quantity-${product.medicineID}`}
//                     value={selectedQuantities[product.medicineID] || 1}
//                     //onChange={(event) => handleQuantityChange(event, product.medicineID)}
//                   >
//                     <MenuItem value={1}>1</MenuItem>
//                     <MenuItem value={2}>2</MenuItem>
//                     <MenuItem value={3}>3</MenuItem>
//                     {/* Add more options as needed */}
//                   </Select>
//                 </FormControl>
//               </CardActions>
//             </Card>
//           );
//         })}
//       </Box>
//       <Divider />
//     </CardContent>
//   );
// };

// OverviewLatestProducts.propTypes = {
//   products: PropTypes.array,
//   sx: PropTypes.object,
// };
