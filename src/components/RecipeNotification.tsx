import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

interface RecipeNotificationProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export default function RecipeNotification({ open, message, onClose }: RecipeNotificationProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={500}
      message={message}
      onClose={onClose}
     />
  );
}