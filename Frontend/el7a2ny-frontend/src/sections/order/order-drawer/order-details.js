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
import { PropertyList } from '../../../components/property-list';
import { PropertyListItem } from '../../../components/property-list-item';
import { SeverityPill } from '../../../components/severity-pill';
import { Scrollbar } from '../../../components/scrollbar';

const statusMap = {
  canceled: 'warning',
  complete: 'success',
  pending: 'info',
  rejected: 'error'
};

export const OrderDetails = (props) => {
  const { onApprove, onEdit, onReject, order } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const align = lgUp ? 'horizontal' : 'vertical';
  const items = order.items || [];
  const createdAt = format(order.createdAt, 'dd/MM/yyyy HH:mm');
  const statusColor = statusMap[order.status];
  const totalAmount = numeral(order.totalAmount).format(`${order.currency}0,0.00`);

  return (
    <Stack spacing={6}>
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
          <Button
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
          </Button>
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
            label="Promotion Code"
            value={order.promotionCode}
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
          <Button
            onClick={onApprove}
            size="small"
            variant="contained"
          >
            Approve
          </Button>
          <Button
            color="error"
            onClick={onReject}
            size="small"
            variant="outlined"
          >
            Reject
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h6">
          Line items
        </Typography>
        <Scrollbar>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Billing Cycle
                </TableCell>
                <TableCell>
                  Amount
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
                      {' '}
                      x
                      {' '}
                      {item.quantity}
                    </TableCell>
                    <TableCell>
                      {item.billingCycle}
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
