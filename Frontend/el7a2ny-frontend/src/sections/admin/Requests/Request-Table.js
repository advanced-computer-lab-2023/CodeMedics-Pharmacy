import PropTypes from 'prop-types';
import Xmark from '@heroicons/react/24/solid/XMarkIcon';
import Check from '@heroicons/react/24/solid/CheckIcon';
import {
  Avatar,
  Box,
  Card,
  Checkbox, IconButton,
  Stack, SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useState } from 'react';
import React from 'react';
import 'reactjs-popup/dist/index.css';
import { Row } from './Request-row';

export const RequestTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                </TableCell>
                <TableCell >
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Degree
                </TableCell>
                <TableCell>
                  Requested at
                </TableCell>
                <TableCell>
                  Documents
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((request,index) => {
                return (
                  <Row key={request.id} row={request} index={index}/>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
// <TableCell>
//   <IconButton
//     color="#B42318"
//     onClick={() => {
//     }}
//   >
//     <SvgIcon fontSize="medium">
//       <Xmark/>
//     </SvgIcon>
//   </IconButton>
//   <IconButton
//     color="primary"
//     onClick={() => {
//     }}
//   >
//     <SvgIcon fontSize="medium">
//       <Check/>
//     </SvgIcon>
//   </IconButton>
// </TableCell>

RequestTable.propTypes = {
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
