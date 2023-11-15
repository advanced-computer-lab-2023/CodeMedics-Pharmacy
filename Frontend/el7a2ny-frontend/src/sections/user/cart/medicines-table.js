import PropTypes from 'prop-types';
import { Fragment } from 'react';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpTrayIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import AdjustmentsVerticalIcon from '@heroicons/react/24/solid/AdjustmentsVerticalIcon';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Button,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  SvgIcon,
  TableRow,
  IconButton,
  Tooltip,
  Typography,
  Divider,
  Collapse ,
  TextField,
  MenuItem 
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {Row} from './medicines-row';




export const MedicinesTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;
  const router = useRouter()

  return (
    <Card>
      <Scrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell >
                  Medicines
                </TableCell> 
                <TableCell >
                  Price
                </TableCell>   
                <TableCell >
                  Quantity
                </TableCell>
                <TableCell >
                  Amount
                </TableCell>
                <TableCell />    
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((medicine) => {
                return (
                  <Row key={medicine._id} row={medicine}/>
                );
              })}
            </TableBody>
          </Table>
          <Divider/>
          <Box sx={{pt:3 , pl:60}} align="center">
            <Typography variant="subtitle1">
              Total Amount: 1000 $
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'flex-end',
              p: 3
            }}
          >
            <Stack>
            <Button
              color="primary"
              endIcon={
                <SvgIcon fontSize="small">
                  <ChevronRightIcon />
                </SvgIcon>
              }
              sx={{ mr: 1 }}
              variant="contained"
            >
              Proceed to Checkout
            </Button>
            </Stack>
            </Box>
        </Box>
      </Scrollbar>
    </Card>
  );
};

MedicinesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
