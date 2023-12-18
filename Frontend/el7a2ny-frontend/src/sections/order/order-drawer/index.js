import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import { Box, Drawer, IconButton, Stack, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import { OrderDetails } from './order-details';
import { OrderEdit } from './order-edit';

export const OrderDrawer = (props) => {
  const { container, onClose, open, order } = props;
  const [isEditing, setIsEditing] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const handleEditOpen = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  let content = null;

  if (order) {
    content = (
      <div>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{
            px: 3,
            py: 2
          }}
        >
          <Typography
            color="inherit"
            variant="h6"
          >
            {order.number}
          </Typography>
          <IconButton
            color="inherit"
            onClick={onClose}
          >
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Box
          sx={{
            px: 3,
            py: 4
          }}
        >
          {!isEditing
            ? (
              <OrderDetails
                onApprove={onClose}
                onEdit={handleEditOpen}
                onReject={onClose}
                order={order}
              />
            )
            : (
              <OrderEdit
                onCancel={handleEditCancel}
                onSave={handleEditCancel}
                order={order}
              />
            )}
        </Box>
      </div>
    );
  }

  if (lgUp) {
    return (
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          sx: {
            position: 'relative',
            width: 500
          }
        }}
        SlideProps={{ container }}
        variant="persistent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      hideBackdrop
      ModalProps={{
        container,
        sx: {
          pointerEvents: 'none',
          position: 'absolute'
        }
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: 400,
          pointerEvents: 'auto',
          position: 'absolute'
        }
      }}
      SlideProps={{ container }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

OrderDrawer.propTypes = {
  container: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  // @ts-ignore
  order: PropTypes.object
};
