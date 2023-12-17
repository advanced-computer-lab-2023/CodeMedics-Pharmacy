import PropTypes from 'prop-types';
import numeral from 'numeral';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import { MoreMenu } from '../../../components/more-menu';
import { Scrollbar } from '../../../components/scrollbar';

export const OverviewTopSelling = (props) => {
  const { products } = props;

  return (
    <Card>
      <CardHeader
        action={<MoreMenu />}
        title="Top Selling Products"
      />
      <Scrollbar>
        <Table sx={{ minWidth: 300 }}>
          <TableBody>
            {products.map((product, index) => {
              const sales = numeral(product.totalQuantity).format('0,0');

              return (
                <TableRow
                  hover
                  key={product.id}
                >
                  <TableCell>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                    >
                      {product.image
                        ? (
                          <Box
                            sx={{
                              alignItems: 'center',
                              backgroundColor: 'neutral.50',
                              backgroundImage: `url('/assets/products/${product.picture}')`,
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              borderRadius: 1,
                              display: 'flex',
                              height: 80,
                              justifyContent: 'center',
                              overflow: 'hidden',
                              width: 80
                            }}
                          />
                        )
                        : (
                          <Box
                            sx={{
                              alignItems: 'center',
                              backgroundColor: (theme) => theme.palette.mode === 'dark'
                                ? 'neutral.700'
                                : 'neutral.50',
                              borderRadius: 1,
                              display: 'flex',
                              height: 80,
                              justifyContent: 'center',
                              width: 80
                            }}
                          >
                            <SvgIcon>
                              <Image01Icon />
                            </SvgIcon>
                          </Box>
                        )}
                      <div>
                        <Typography variant="subtitle2">
                          {product.medicineName}
                        </Typography>
                        <Typography
                          color="text.secondary"
                          variant="body2"
                        >
                           {product.totalAmount} EGP
                        </Typography>
                      </div>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="success.main"
                      variant="subtitle2"
                    >
                      {sales}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      noWrap
                      variant="body2"
                    >
                      Item Sold
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'dark'
                          ? 'neutral.700'
                          : 'neutral.200',
                        borderRadius: 1.5,
                        px: 1,
                        py: 0.5,
                        display: 'inline-block'
                      }}
                    >
                      <Typography variant="subtitle2">
                        #{index + 1}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
        >
          See All
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewTopSelling.propTypes = {
  products: PropTypes.array.isRequired
};
