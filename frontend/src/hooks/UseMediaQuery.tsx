import { useEffect, useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { MediaQueryProps } from '../types/Types';

const useMediaQueryComponent = (): MediaQueryProps => {
  const theme = useTheme();
  const [screenSize, setScreenSize] = useState<MediaQueryProps>({
    isSmallScreen: false,
    isMediumScreen: false,
    isLargeScreen: false,
  });

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setScreenSize({
      isSmallScreen,
      isMediumScreen,
      isLargeScreen,
    });
  }, [isSmallScreen, isMediumScreen, isLargeScreen]);

  return screenSize;
};

export default useMediaQueryComponent;
