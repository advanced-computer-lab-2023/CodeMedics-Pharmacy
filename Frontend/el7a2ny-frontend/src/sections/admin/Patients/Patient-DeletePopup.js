import PropTypes from 'prop-types';
import {
  Box, Button,
  Card, SvgIcon,
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
const axios = require('axios');
export const PatientDeletePopup = (props) => {
  const {
    width = '25%',
    height = '15vh',
    items = 'user',
    isOpenDelete = false, // Set a default value here
    username = '',
    onClose
  } = props;

  const onRemovePatient = async (username) => {
    try {
      const removeResponse = await axios.delete('http://localhost:8001/removePatient', {
        data: { Username: username },
      });
    } catch (error) {
      console.error('Error removing Pharmacist:', error);
      throw error;
    }
  };
  const router=useRouter();
  const handleRemoveClick = async () => {
    try {
      await onRemovePatient(username);
    } catch (error) {
      // Handle errors appropriately
      console.error('Error removing patient:', error);
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
      <Box sx={{ minWidth: 300 }}>
        <Typography variant="h5" paragraph={true}>
          Are you sure you want to delete {items}?
        </Typography>
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          padding: '10px'
        }}>
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
          </Button></div>
      </Box>

    </Popup>
  )
    ;
};

PatientDeletePopup.propTypes = {
  items: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  isOpenDelete: PropTypes.bool,
  setisOpenDelete: PropTypes.func
};
