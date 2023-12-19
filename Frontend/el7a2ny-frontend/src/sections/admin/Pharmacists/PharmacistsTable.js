import PropTypes from 'prop-types';
import { format } from 'date-fns';
import IdentificationIcon from '@heroicons/react/24/solid/IdentificationIcon';
import Xmark from '@heroicons/react/24/solid/XMarkIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import { PharmacistDeletePopup } from './Pharmacist-DeletePopup';
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
  Typography,
  Button
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useState } from 'react';
import React from 'react';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import Message from 'src/components/Message';

export const PharmacistsTable = (props) => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const [isOpenDelete, setOpenDelete] = useState(null);

  const addSalary = async (username) => {
    try {
      await axios.patch(`http://localhost:8001/pharmacist/addSalary?username=${username}`);
      window.alert("Salary added successfully");
    } catch (err) {
      setShowError(true);
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <Card>
      <Message condition={showError} setCondition={setShowError} message={errorMessage} title="Error" buttonAction="Close" />
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  Name
                </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  HourlyRate
                </TableCell>
                <TableCell>
                  affiliation
                </TableCell>
                <TableCell>
                  Date of Birth
                </TableCell>
                <TableCell>
                  Degree
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
                <TableCell align="center">
                  Add Salary
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer, index) => {
                const isSelected = selected.includes(customer.id);
                const originalDate = new Date(customer.DateOfBirth);
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                const formattedDate = originalDate.toLocaleDateString('en-GB', options);

                //const createdAt = format(customer.createdAt, 'dd/MM/yyyy');
                return (
                  <TableRow
                    hover
                    key={customer.Username}
                    selected={isSelected}
                  >
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={`/assets/avatars/${index}.png`}>
                          {getInitials(customer.Name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {customer.Name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.Username}
                    </TableCell>
                    <TableCell>
                      {customer.Email}
                    </TableCell>
                    <TableCell>
                      {customer.HourlyRate}
                    </TableCell>
                    <TableCell>
                      {customer.affiliation}
                    </TableCell>
                    <TableCell>
                      {formattedDate}
                    </TableCell>
                    <TableCell>
                      {customer.Degree}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setOpenDelete(customer.Username);
                        }}
                      >
                        <SvgIcon fontSize="small">
                          <Xmark />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => {
                        }}
                      >
                        <SvgIcon fontSize="small">
                          <PencilIcon />
                        </SvgIcon>
                      </IconButton>
                      <PharmacistDeletePopup width={'25%'} height={'15vh'}
                        isOpenDelete={isOpenDelete === customer.Username}
                        items={customer.Name}
                        onClose={() => setOpenDelete(null)}
                        username={customer.Username} />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => { addSalary(customer.Username); }}
                      >
                        Add Salary
                      </Button>
                    </TableCell>
                  </TableRow>
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

PharmacistsTable.propTypes = {
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
