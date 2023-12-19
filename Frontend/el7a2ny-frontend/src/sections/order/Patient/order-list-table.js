import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import { subDays, subHours } from 'date-fns';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { SeverityPill } from '../../../components/severity-pill';

const statusMap = {
  canceled: 'error',
  complete: 'success',
  completed: 'success',
  ordered: 'warning',
  pending: 'info',
  rejected: 'error'
};

export const OrderListTable = (props) => {
  const {
    onOrderSelect,
    onPageChange,
    onRowsPerPageChange,
    orders,
    ordersCount,
    page,
    rowsPerPage,
    ...other
  } = props;

  return (
    <div {...other}>
      <Table>
        <TableBody>
          {orders.map((order) => {
            const dateObject = new Date(order.createdAt);
            const milliseconds = dateObject.getTime() + 3600000;
            const createdAt = subHours(milliseconds, 1);
            const createdAtMonth = format(createdAt, 'LLL').toUpperCase();
            const createdAtDay = format(createdAt, 'd');
            const totalAmount = numeral(order.amount).format(`${order.currency}0,0.00`);
            const statusColor = statusMap[order.status] || 'warning';

            return (
              <TableRow
                hover
                key={order.id}
                onClick={() => onOrderSelect?.(order.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: (theme) => theme.palette.mode === 'dark'
                        ? 'neutral.800'
                        : 'neutral.200',
                      borderRadius: 2,
                      maxWidth: 'fit-content',
                      ml: 3,
                      p: 1
                    }}
                  >
                    <Typography
                      align="center"
                      variant="subtitle2"
                    >
                      {createdAtMonth}
                    </Typography>
                    <Typography
                      align="center"
                      variant="h6"
                    >
                      {createdAtDay}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle2">
                      {order.number}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      Total of
                      {' '}
                      {order.totalAmount}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <SeverityPill color={statusColor}>
                    {order.status}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={ordersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{justifyContent:"center", display: 'flex'}}
      />
    </div>
  );
};

OrderListTable.propTypes = {
  onOrderSelect: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  orders: PropTypes.array.isRequired,
  ordersCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
