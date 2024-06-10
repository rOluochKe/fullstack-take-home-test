import { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface ReusableButtonProps extends Omit<ButtonProps, 'to'> {
  to?: string;
}

const ReusableButton: FC<ReusableButtonProps> = ({ to, children, ...rest }) => {
  if (to) {
    return (
      <Button component={RouterLink} to={to} {...rest}>
        {children}
      </Button>
    );
  }

  return <Button {...rest}>{children}</Button>;
};

export default ReusableButton;
