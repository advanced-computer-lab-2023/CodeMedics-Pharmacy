import { Dialog } from '@mui/material';
import React from 'react';

import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

<<<<<<< HEAD
const Message = ({condition, setCondition, title, message, isError, buttonAction , onClick }) => {
=======
const Message = ({condition, setCondition, title, message, isError, buttonAction }) => {
>>>>>>> cb69dacee2f201edcf0651fecb6d2b3469291438
    console.log(condition);
    console.log(title, message, buttonAction);
  return (
    (<div>
        <Dialog open={condition} onClose={() => {{
              setCondition(false);
              }}}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
                {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClick == null ? () => {
              setCondition(false);
              } : onClick}>{buttonAction}</Button>
          </DialogActions>
        </Dialog>
      </div>)
  );
};

export default Message;