import { FC, useState } from 'react';
import { Snackbar, IconButton, SnackbarContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const StyledSnackbarContent = styled(SnackbarContent)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  '&.MuiSnackbarContent-root.Mui-error': {
    backgroundColor: theme.palette.error.main,
  },
  '&.MuiSnackbarContent-root.Mui-warning': {
    backgroundColor: theme.palette.warning.main,
  },
  '&.MuiSnackbarContent-root.Mui-info': {
    backgroundColor: theme.palette.info.main,
  },
  display: 'flex',
  alignItems: 'center',
}));

const Notification: FC<NotificationProps> = ({ message, onClose }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <StyledSnackbarContent
        message={message}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export default Notification;
