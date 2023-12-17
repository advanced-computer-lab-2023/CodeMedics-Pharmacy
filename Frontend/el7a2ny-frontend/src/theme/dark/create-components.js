import {
  backdropClasses,
  filledInputClasses,
  outlinedInputClasses,
  paperClasses,
  tableCellClasses
} from '@mui/material';
import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';

export const createComponents = ({ palette }) => {
  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: palette.neutral[300],
          color: common.black
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          [`&:not(.${backdropClasses.invisible})`]: {
            backgroundColor: alpha(common.black, 0.50)
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          [`&.${paperClasses.elevation1}`]: {
            boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.08), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.06)'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        icon: {
          color: palette.action.active
        },
        root: {
          borderColor: palette.neutral[700]
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '#nprogress .bar': {
          backgroundColor: palette.primary.main
        },
        '.slick-dots li button': {
          '&:before': {
            fontSize: 10,
            color: palette.primary.main
          }
        },
        '.slick-dots li.slick-active button': {
          '&:before': {
            color: palette.primary.main
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            color: palette.text.secondary
          }
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderColor: palette.divider,
          '&:hover': {
            backgroundColor: palette.action.hover
          },
          [`&.${filledInputClasses.disabled}`]: {
            backgroundColor: 'transparent'
          },
          [`&.${filledInputClasses.focused}`]: {
            backgroundColor: 'transparent',
            borderColor: palette.primary.main,
            boxShadow: `${palette.primary.main} 0 0 0 2px`
          },
          [`&.${filledInputClasses.error}`]: {
            borderColor: palette.error.main,
            boxShadow: `${palette.error.main} 0 0 0 2px`
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: palette.action.hover,
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.divider
            }
          },
          [`&.${outlinedInputClasses.focused}`]: {
            backgroundColor: 'transparent',
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.primary.main,
              boxShadow: `${palette.primary.main} 0 0 0 2px`
            }
          },
          [`&.${filledInputClasses.error}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: palette.error.main,
              boxShadow: `${palette.error.main} 0 0 0 2px`
            }
          }
        },
        notchedOutline: {
          borderColor: palette.divider
        }
      }
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: palette.neutral[500]
        },
        track: {
          backgroundColor: palette.neutral[400],
          opacity: 1
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: palette.divider
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          [`& .${tableCellClasses.root}`]: {
            backgroundColor: palette.neutral[800],
            color: palette.neutral[400]
          }
        }
      }
    },
    // @ts-ignore
    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          backgroundColor: palette.divider
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backdropFilter: 'blur(6px)',
          background: alpha(palette.neutral[900], 0.8)
        }
      }
    }
  };
};
