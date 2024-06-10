export interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

export interface MediaQueryProps {
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
}