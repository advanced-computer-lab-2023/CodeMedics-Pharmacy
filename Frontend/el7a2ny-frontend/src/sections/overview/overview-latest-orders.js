import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import axios from 'axios';
import Message from 'src/components/Message';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};


function formatDate(inputDate) {
  const date = new Date(inputDate);
  
  // Get day, month, and year
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  // Construct the formatted date string
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export const OverviewLatestOrders = (props) => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { orders, sx } = props;
  const handleCancel = async (orderId) => {
    try{
    await axios.patch(`http://localhost:8001/patient/cancelOrder?orderId=${orderId}`); // done new Route
    window.location.reload();
    } catch (error) {
      console.error('Error removing Pharmacist:', error);
      setShowError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <Card sx={sx}>
      <Message condition={showError} setCondition={handleClose} message={errorMessage} title="Error" buttonAction="Close" />
      <CardHeader title="Latest Orders" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Status
                </TableCell>
                <TableCell sortDirection="desc">
                  Date
                </TableCell>
                <TableCell>
                  Amount
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const createdAt = formatDate(order.createdAt);
                return (
                  <TableRow
                    hover
                    key={order._id}
                  >
                    <TableCell>
                      {order.status}
                    </TableCell>
                    <TableCell>
                      {order.createdAt}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.status]}>
                        {order.amount}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      <Button 
                        color="inherit"
                        size="small"
                        variant="contained"
                        style={{  backgroundColor: 'rgba(255, 0, 0, 0.6)', color: 'white', 
                        ...(order.status !== 'Ordered' ? { backgroundColor: 'gray', color: 'white' } : {}),
                      }}
                        onClick={() => handleCancel(order._id)}
                        disabled={order.status !== 'Ordered'}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
