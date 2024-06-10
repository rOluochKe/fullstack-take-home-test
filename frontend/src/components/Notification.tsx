/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC, useState } from 'react';
import { Snackbar, IconButton, SnackbarContent, SnackbarContentProps } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled, Theme } from '@mui/system';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const StyledSnackbarContent = styled(SnackbarContent)<SnackbarContentProps>(({ theme }: { theme: Theme }) => {
  const { success, error, warning, info } = theme.palette;

  return {
    backgroundColor: success.main,
    '&.MuiSnackbarContent-root.Mui-error': {
      backgroundColor: error.main,
    },
    '&.MuiSnackbarContent-root.Mui-warning': {
      backgroundColor: warning.main,
    },
    '&.MuiSnackbarContent-root.Mui-info': {
      backgroundColor: info.main,
    },
    display: 'flex',
    alignItems: 'center',
  };
});

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
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export default Notification;
