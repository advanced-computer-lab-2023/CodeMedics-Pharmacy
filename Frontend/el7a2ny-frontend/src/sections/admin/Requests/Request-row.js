import PropTypes from 'prop-types';
import { Fragment } from 'react';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpTrayIcon';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import AdjustmentsVerticalIcon from '@heroicons/react/24/solid/AdjustmentsVerticalIcon';
import ArrowDownTrayIcon from '@heroicons/react/24/solid/ArrowDownTrayIcon';
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
  Collapse,
  TextField,
  MenuItem
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
const axios = require('axios');
import FileSaver from 'file-saver';
export const Row = (props) => {
  const { row: request, index: index } = props;
  const [open, setOpen] = useState(false);
  const router = useRouter();
  console.log(request.DateOfBirth);
  const HandleAccept = () => {
    axios.post('http://localhost:8001/acceptPharmacist', {
      Username: request.Username,
      Email: request.Email
    })
         .then((res) => {
           if (res.status == 200) {
             console.log('Accepted');
             router.refresh();
           }
         })
         .catch((err) => {
           console.log(err);
         });
  };
  const HandleReject = () => {
    axios.post('http://localhost:8001/rejectPharmacist', {
      Username: request.Username,
      Email: request.Email
    })
         .then((res) => {
           if (res.status == 200) {
             router.refresh();
           }
         })
         .catch((err) => {
           console.log(err);
         });
  };
  const handleFileDownload = (fileName) => {
    FileSaver.saveAs(`/assets/products/${fileName}`, `${fileName}`);
  };
  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell padding="normal">
          <IconButton
            color="primary"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <SvgIcon>
              {!open ? <ChevronRightIcon/> : <ChevronDownIcon/>}
            </SvgIcon>
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography variant="h7">
            {request.Name}
          </Typography>
        </TableCell>
        <TableCell>
          {request.Email}
        </TableCell>
        <TableCell>
          {request.Degree}
        </TableCell>
        <TableCell>
          {request.createdAt.substring(0, request.createdAt.indexOf('T'))}
        </TableCell>
        <TableCell>
          <Tooltip title="National ID">
            <IconButton
              color="primary"
              onClick={() => handleFileDownload(request.IDDocument)}
            >
              <SvgIcon fontSize="small">
                <ArrowDownTrayIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Working License">
            <IconButton
              color="primary"
              onClick={() => handleFileDownload(request.workingLicense)}
            >
              <SvgIcon fontSize="small">
                <ArrowDownTrayIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Pharmacy Degree">
            <IconButton
              color="primary"
              onClick={() => handleFileDownload(request.pharmacyDegree)}
            >
              <SvgIcon fontSize="small">
                <ArrowDownTrayIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ ml: 20, mt: 3, mb: 3, position: 'relative', textAlign: 'left' }}>
              <Typography variant="h6" gutterBottom component="div">
                Medicne Details
              </Typography>
              <Stack direction="row" spacing={5} sx={{ mt: 3 }}>
                <Avatar
                  src={`/assets/avatars/${index}.png`}
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '10%'
                  }}
                >
                  {getInitials(request.Name)}
                </Avatar>
                <Stack spacing={2} sx={{ width: 250 }}>
                  <TextField
                    // error = {!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    // helperText={formik.touched.name && formik.errors.name}
                    label="Affiliation"
                    name="affiliation"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    value={request.affiliation}
                  />
                  <TextField
                    // error = {!!(formik.touched.activeIngredient && formik.errors.activeIngredient)}
                    fullWidth
                    // helperText={formik.touched.activeIngredient && formik.errors.activeIngredient}
                    label="Username"
                    name="Username"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    value={request.Username}
                  />
                </Stack>
                <Stack spacing={2} sx={{ width: 200 }}>
                  <TextField
                    // error = {!!(formik.touched.price && formik.errors.price)}
                    fullWidth
                    // helperText={formik.touched.price && formik.errors.price}
                    label="Date of birth"
                    name="Date of birth"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    value={request.DateOfBirth}
                  />
                  <TextField
                    // error = {!!(formik.touched.availableQuantity && formik.errors.availableQuantity)}
                    fullWidth
                    // helperText={formik.touched.availableQuantity && formik.errors.availableQuantity}
                    label="Hourly rate"
                    name="hourlyRate"
                    // onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    value={request.HourlyRate}
                  />
                </Stack>
                <Stack spacing={2} direction="column" sx={{ pt: 2 }}>
                  <Button
                    size="large"
                    sx={{ height: 40, backgroundColor: '#0B815A' }}
                    type="submit"
                    variant="contained"
                    onClick={HandleAccept}
                  >
                    Accept
                  </Button>
                  <Button
                    size="large"
                    sx={{ height: 40, borderColor: '#B42318', color: '#B42318' }}
                    variant="outlined"
                    type="submit"
                    onClick={HandleReject}
                  >
                    Reject
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};