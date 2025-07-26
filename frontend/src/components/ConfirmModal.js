import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ConfirmationModal = ({ open, title, content, onConfirm, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="body1">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2">{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          <Typography variant="button">Cancel</Typography>
        </Button>
        <Button onClick={onConfirm} color="primary" variant='contained' autoFocus>
          <Typography variant="button">Yes</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
