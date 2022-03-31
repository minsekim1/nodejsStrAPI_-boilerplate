import { createTheme } from '@mui/material/styles';
import { deepOrange, amber, lightBlue, indigo, blueGrey, blue, red, teal } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: lightBlue,
    secondary: teal,
    error: red,
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    h1: {
      fontSize: 33,
      lineHeight: '40px',
      fontWeight: '700',
    },
  },
  components: {
    // MuiInputLabel: {
    //   styleOverrides: {
    //     root: {
    //       fontWeight: 500,
    //     },
    //   },
    // },
    // MuiFormHelperText: {
    //   styleOverrides: {
    //     root: {
    //       fontWeight: 500,
    //     },
    //   },
    // },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xs',
      },
      styleOverrides: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          maxWidth: 444,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          maxWidth: 444,
          paddingLeft: '24px',
          paddingRight: '24px',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          maxWidth: 444,
          paddingLeft: '24px',
          paddingRight: '24px',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          maxWidth: 444,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          width: 'auto',
          height: 'auto',
          fontSize: '1.25rem',
          padding: '.25rem',
        },
        fontSizeSmall: {
          fontSize: '1rem',
        },
        fontSizeLarge: {
          fontSize: '1.75rem',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 64,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
        size: 'large',
      },
      styleOverrides: {
        root: {
          letterSpacing: '-0.4px',
          whiteSpace: 'nowrap',
        },
        containedPrimary: {
          color: '#ffffff',
        },
        sizeLarge: {
          fontSize: 15,
          lineHeight: '20px',
          minHeight: 48,
        },
        iconSizeSmall: {
          '& > span:first-child': {
            fontSize: '1rem',
            marginBottom: '.1rem',
          },
        },
        iconSizeMedium: {
          '& > span:first-child': {
            fontSize: '1.1rem',
            marginBottom: '.1rem',
          },
        },
        iconSizeLarge: {
          '& > span:first-child': {
            fontSize: '1.2rem',
            marginBottom: '.1rem',
          },
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'large',
      },
      styleOverrides: {
        root: {
          width: '2em',
          height: '2em',
        },
      },
    },
  },
});
