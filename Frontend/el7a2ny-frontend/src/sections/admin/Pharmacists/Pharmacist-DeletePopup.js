import PropTypes from 'prop-types';
import {
  Box, Button,
  Card, Stack, SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRouter } from 'next/navigation';
import Message from 'src/components/Message';

const axios = require('axios');
export const PharmacistDeletePopup = (props) => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    width = '25%',
    height = '15vh',
    items = 'user',
    isOpenDelete = false, // Set a default value here
    username = '',
    onClose
  } = props;

  const onRemovePharmacist = async (username) => {
    try {
      console.log(username + ' of api call');
      const removeResponse = await axios.delete('http://localhost:8001/admin/removePharmacist', { // done new Route
        data: { Username: username }
      });
      console.log('Pharmacist removed successfully.');
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.message);
    }
  };
  const router = useRouter();
  const handleRemoveClick = async () => {
    try {
      console.log(username + ' button handle');
      await onRemovePharmacist(username);
    } catch (error) {
      setShowError(true);
      setErrorMessage(error.message);
    }
    onClose();
    router.refresh();
  };

  return (
    <Popup
      open={isOpenDelete}
      closeOnDocumentClick
      onClose={onClose}
      overlayStyle={{ // Apply styles to the overlay
        backgroundColor: 'transparent', // Semi-transparent white background
        backdropFilter: isOpenDelete ? 'blur(2px)' : 'none', // Apply a blur filter to the background when Popup is open
        transition: 'backdrop-filter 0.3s ease-out' // Add a smooth transition
      }}
      contentStyle={{ // Apply custom styles to the Popup content
        background: '#F5F7FF',
        width: width, // Set the width to 50% of the screen width
        height: height,
        padding: '20px',
        borderRadius: '10px',
        border: '5px solid #ccc'
      }}
    >
      <Message condition={showError} setCondition={setShowError} message={errorMessage} title="Error" buttonAction="Close" />
      <Box sx={{ minWidth: 300 }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h6" paragraph={true}>
            Are you sure you want to delete {items}?
          </Typography>
         <Stack direction="row" spacing={0.1} >
            <Button style={{ marginRight: '10px' }}
                    startIcon={<SvgIcon fontSize="small"><CheckIcon/></SvgIcon>}
                    variant="contained"
                    onClick={handleRemoveClick}
            >
              Remove
            </Button>
            <Button
              startIcon={<SvgIcon fontSize="small"><CancelIcon/></SvgIcon>}
              variant="contained"
              onClick={() => onClose()}>

              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>

    </Popup>
  )
    ;
};

PharmacistDeletePopup.propTypes = {
  items: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  isOpenDelete: PropTypes.bool,
  setisOpenDelete: PropTypes.func
};
