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
  Collapse ,
  TextField,
  MenuItem 
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export const  Row = (props) => {
    const { row: medicine } = props;
    const [open, setOpen] = useState(false);
    const router = useRouter();
    return (
      <Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell padding="normal">
          <IconButton 
              children ={(
                <SvgIcon>
                  {!open?  <ChevronRightIcon /> : <ChevronDownIcon />}
                </SvgIcon>
              )}
              color="primary"
              onClick={() => {
                setOpen(!open);
              }}
            >
            </IconButton>
          </TableCell>
          <TableCell>
            <Typography variant="h7" >
              {medicine.name}
            </Typography>
          </TableCell>
          <TableCell>
            {medicine.price}
          </TableCell>
          <TableCell>
            {medicine.medicalUse}
          </TableCell>
          <TableCell>
            {medicine.Description}
          </TableCell>
          <TableCell>
            <Tooltip title="Edit Medicine">
              <IconButton 
                children ={(
                  <SvgIcon fontSize="small">
                    <PencilIcon />
                  </SvgIcon>
                )}
                color="primary"
                onClick={() => {
                  const encodedData = encodeURIComponent(JSON.stringify(medicine));
                  router.push(`/pharmacist/editMedicine?data=${encodedData}`);
                }}
              >
              </IconButton >
              </Tooltip>
            </TableCell>
        </TableRow>
        <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                    Medicne Details
                </Typography>
                <Stack direction="row" spacing={10} sx={{mt: 3,}}>
                    <Avatar 
                        src={medicine.Picture} 
                        sx={{
                            width: 120 , 
                            height:120 , 
                            borderRadius: '10%',
                        }}
                    >
                        {getInitials(medicine.name)}
                    </Avatar>
                    <Stack spacing={2}>
                    <TextField
                        // error = {!!(formik.touched.name && formik.errors.name)}
                        fullWidth
                        // helperText={formik.touched.name && formik.errors.name}
                        label="Name"
                        name="name"
                        // onBlur={formik.handleBlur}
                        // onChange={formik.handleChange}
                        value={medicine.name}
                    />
                    <TextField
                        // error = {!!(formik.touched.activeIngredient && formik.errors.activeIngredient)}
                        fullWidth
                        // helperText={formik.touched.activeIngredient && formik.errors.activeIngredient}
                        label="Active Ingredient"
                        name="activeIngredient"
                        // onBlur={formik.handleBlur}
                        // onChange={formik.handleChange}
                        value={medicine.activeIngredients[0]}
                        />
                    </Stack>
                    <Stack spacing={2}>
                    <TextField
                        // error = {!!(formik.touched.price && formik.errors.price)}
                        fullWidth
                        // helperText={formik.touched.price && formik.errors.price}
                        label="Price"
                        name="price"
                        // onBlur={formik.handleBlur}
                        // onChange={formik.handleChange}
                        value={medicine.price}
                    />
                    <TextField
                        // error = {!!(formik.touched.availableQuantity && formik.errors.availableQuantity)}
                        fullWidth
                        // helperText={formik.touched.availableQuantity && formik.errors.availableQuantity}
                        label="Available Quantity"
                        name="availableQuantity"
                        // onBlur={formik.handleBlur}
                        // onChange={formik.handleChange}
                        value={medicine.availableQuantity}
                    />
                    </Stack>
                    <Stack spacing={2}>
                        <TextField
                            // error = {!!(formik.touched.medicalUse && formik.errors.medicalUse)}
                            fullWidth
                            // helperText={formik.touched.medicalUse && formik.errors.medicalUse}
                            label="Medical Use"
                            name="medicalUse"
                            // onBlur={formik.handleBlur}
                            // onChange={formik.handleChange}
                            value={medicine.medicalUse}
                            />
                        <TextField
                            // error = {!!(formik.touched.description && formik.errors.description)}
                            fullWidth
                            // helperText={formik.touched.description && formik.errors.description}
                            label="Description"
                            name="description"
                            // onBlur={formik.handleBlur}
                            // onChange={formik.handleChange}
                            value={medicine.Description}
                        />
                    </Stack>
                </Stack>
                <Stack spacing={2} direction="row" sx={{mt: 3}}>
                    <Button
                        size="large"
                        sx={{  height: 40}}
                        type="submit"
                        variant="contained"
                    >
                        Update
                    </Button>
                    <Button
                        size="large"
                        sx={{  height: 40 , borderColor: 'primary' }}
                        variant='outlined'
                        type='submit'
                        onClick={() => {setOpen(!open)}}
                    >
                        Cancle
                    </Button>
                </Stack>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  };