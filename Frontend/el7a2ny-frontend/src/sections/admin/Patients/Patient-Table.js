import PropTypes from 'prop-types';
import { format } from 'date-fns';
import IdentificationIcon from '@heroicons/react/24/solid/IdentificationIcon';
import Xmark from '@heroicons/react/24/solid/XMarkIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
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
import { getInitials } from 'src/utils/get-initials';
import { useState } from 'react';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { indigo } from '../../../theme/colors';
import { PatientEmergencyPopup } from './PatientEmergency-Popup';
import { PatientDeletePopup } from './Patient-DeletePopup';

export const PatientTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0
  } = props;

  const [activeEmergencyContactId, setActiveEmergencyContactId] = useState(null);
  const [isOpenDelete, setOpenDelete] = useState(null);
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Gender
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Date of Birth
                </TableCell>
                <TableCell>
                  Wallet
                </TableCell>
                <TableCell>
                  Emergency Contact
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                //const createdAt = format(customer.createdAt, 'dd/MM/yyyy');
                const Name = customer.FirstName + ' ' + customer.LastName;
                const relation = customer.EmergencyContacts.EmergencyContactRelation;
                const fullName = customer.EmergencyContacts.EmergencyContactName;
                const mobileNumber = customer.EmergencyContacts.EmergencyContactNumber;
                return (
                  <TableRow hover key={customer.id}>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={customer.avatar}>
                          {getInitials(customer.Name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {Name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {customer.Email}
                    </TableCell>
                    <TableCell>
                      {customer.Gender}
                    </TableCell>
                    <TableCell>
                      {customer.Number}
                    </TableCell>
                    <TableCell>
                      {customer.Username}
                    </TableCell>
                    <TableCell>
                      {customer.DateOfBirth}
                    </TableCell>
                    <TableCell>
                      {customer.Wallet}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setActiveEmergencyContactId(customer.Username);
                        }}
                      >
                        <SvgIcon fontSize="large">
                          <IdentificationIcon/>
                        </SvgIcon>
                      </IconButton>
                      {fullName}
                      <PatientEmergencyPopup
                        items={
                          {
                            fullName: fullName,
                            mobileNumber: mobileNumber,
                            relation: relation
                          }
                        }
                        width={'25%'} height={'15vh'}
                        isOpenEmergencyContact={activeEmergencyContactId === customer.Username}
                        onClose={() => setActiveEmergencyContactId(null)}/>

                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setOpenDelete(customer.Username);
                        }}
                      >
                        <SvgIcon fontSize="small">
                          <Xmark/>
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        color="primary"
                      >
                        <SvgIcon fontSize="small">
                          <PencilIcon/>
                        </SvgIcon>
                      </IconButton>
                      <PatientDeletePopup width={'25%'} height={'15vh'}
                                          isOpenDelete={isOpenDelete === customer.Username}
                                          items={customer.Username} onClose={() => setOpenDelete(null)}
                                          username={customer.Username}/>
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

PatientTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number
};
