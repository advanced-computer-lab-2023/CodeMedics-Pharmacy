import { Dialog } from '@mui/material';
import React from 'react';

import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const Message = ({condition, setCondition, title, message, isError, buttonAction , onClick }) => {
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