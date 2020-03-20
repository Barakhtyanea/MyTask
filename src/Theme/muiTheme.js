import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#41787a',
      dark: '#0f4c4e',
      main: '#41787a',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#fffcde',
      dark: '#ca985e',
      main: '#ffc98c',
    },
  },
});

export default theme;
