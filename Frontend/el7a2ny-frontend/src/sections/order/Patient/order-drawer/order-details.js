import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import {
  Button,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery
} from '@mui/material';
import { PropertyList } from '../../../../components/property-list';
import { PropertyListItem } from '../../../../components/property-list-item';
import { SeverityPill } from '../../../../components/severity-pill';
import { Scrollbar } from '../../../../components/scrollbar';
import { subDays, subHours } from 'date-fns';
import axios from 'axios';
import  Message  from 'src/components/Message';
import { useState } from 'react';

const statusMap = {
  canceled: 'error',
  complete: 'success',
  completed: 'success',
  ordered: 'warning',
  pending: 'info',
  rejected: 'error'
};

export const OrderDetails = (props) => {
  const { onApprove, onEdit, onReject, order } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const align = lgUp ? 'horizontal' : 'vertical';
  const items = order.items || [];
  const dateObject = new Date(order.createdAt);
  const milliseconds = dateObject.getTime() + 3600000;
  const createdAt1 = subHours(milliseconds, 1);
  const createdAt = format(createdAt1, 'dd/MM/yyyy HH:mm');
  const statusColor = statusMap[order.status];
  const totalAmount = numeral(order.totalAmount).format(`${order.currency}0,0.00`);
  const [message, setMessage] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleComplete = () => {
    axios.patch(`http://localhost:8001/patient/cancelOrder`, {orderId: order.id}, {withCredentials: true})
    .then((res) => {
      setMessage(true);
    })
    .catch((err) => {
      console.log(err);
      setShowError(true);
      setErrorMessage(err.response.data.message);
    });
  };

  const handleCancel = async (orderId) => {
    try{
    await axios.patch(`http://localhost:8001/patient/cancelOrder?orderId=${orderId}`); // done new Route
    window.location.reload();
    } catch (error) {
      console.error('Error removing Pharmacist:', error);

    }
  };

  return (
    <Stack spacing={6}>
      <Message condition={message} setCondition={setMessage} title={"Success"} message={"Order Canceled Successfully"} buttonAction={"Ok"} onClick={() => {setMessage(false);window.location.reload()}}/>
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Typography variant="h6">
            Details
          </Typography>
          {/* <Button
            color="inherit"
            onClick={onEdit}
            size="small"
            startIcon={(
              <SvgIcon>
                <Edit02Icon />
              </SvgIcon>
            )}
          >
            Edit
          </Button> */}
        </Stack>
        <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="ID"
            value={order.id}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Number"
            value={order.number}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Customer"
          >
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {order.customer.name}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {order.customer.address1}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {order.customer.city}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {order.customer.country}
            </Typography>
          </PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Date"
            value={createdAt}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Payment Method"
            value={order.paymentMethod}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Total Amount"
            value={totalAmount}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Status"
          >
            <SeverityPill color={statusColor}>
              {order.status}
            </SeverityPill>
          </PropertyListItem>
        </PropertyList>
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          justifyContent="flex-end"
          spacing={2}
        >
          {order.status === 'ordered' && <Button
            color="error"
            onClick={handleComplete}
            size="small"
            variant="outlined"
          >
            Cancel
          </Button>}
        </Stack>
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h6">
          Medicines
        </Typography>
        <Scrollbar>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  Medicine
                </TableCell>
                <TableCell>
                  Quantity
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                const unitAmount = numeral(item.unitAmount).format(`${item.currency}0,0.00`);

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.name}
                    </TableCell>
                    <TableCell>
                    {item.quantity}
                    </TableCell>
                    <TableCell>
                      {unitAmount}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar>
      </Stack>
    </Stack>
  );
};

OrderDetails.propTypes = {
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  // @ts-ignore
  order: PropTypes.object
};
