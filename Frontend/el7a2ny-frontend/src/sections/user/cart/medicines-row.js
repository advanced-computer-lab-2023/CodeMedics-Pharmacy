import PropTypes from 'prop-types';
import { Fragment } from 'react';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpTrayIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import MinusIcon from '@heroicons/react/24/solid/MinusIcon';
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
  Collapse ,
  TextField,
  MenuItem 
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export const  Row = (props) => {
    const { row: medicine , handleAddOne , handleMinusOne} = props;
    const [open, setOpen] = useState(false);
    const router = useRouter();
    return (
      <Fragment>
        <TableRow>
          <TableCell>
            <Stack >
              <Stack direction="row" spacing={4}>
                <Avatar 
                    src={`/assets/products/${medicine.picture}`} 
                    sx={{
                        width: 120 , 
                        height:120 , 
                        borderRadius: '10%',
                    }}
                >
                    {getInitials(medicine.name)}
                </Avatar> 
                <Stack sx={{pt: 4}}>
                  <Typography variant="h6" >
                    {medicine.medicineName}
                  </Typography>
                  <Typography variant="subtitle2" >
                    For {medicine.medicalUse}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1" >
              {medicine.price} EGP
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1" >
              {medicine.quantity}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1" >
              {medicine.price * medicine.quantity} EGP
            </Typography>
          </TableCell>
          <TableCell>
            <Tooltip title="Add one">
              <IconButton 
                children ={(
                  <SvgIcon fontSize="small" variant="contained">
                    <PlusIcon />
                  </SvgIcon>
                )}
                color="primary"
                onClick={() => {
                  handleAddOne(medicine.medicineID)
                }}
              >
              </IconButton >
            </Tooltip>
            <Tooltip title="Delete one">
              <IconButton 
                children ={(
                  <SvgIcon fontSize="small" variant="contained">
                    <MinusIcon />
                  </SvgIcon>
                )}
                color="primary"
                onClick={() => {handleMinusOne(medicine.medicineID)}}
              >
              </IconButton >
            </Tooltip>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  };