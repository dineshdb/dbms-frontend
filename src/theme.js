import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import purple from '@material-ui/core/colors/purple';


export default createMuiTheme({
    palette: {
       primary: {
            light: '#536bea',
            main: '#2bc6ea',
            dark: '#ff74ad',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#4fffa5',
            main: '#d32c51',
            dark: '#ff74ad',
            contrastText: '#000',
        },
    },
    overrides: {
        Button: {
            root: {
                color: "#e1f5fe",
                '&:hover': {
                    backgroundColor: '#bfe8e4'
                }
            }
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        fontSize: "21px",
        fontWeight: "lighter",
    },
});
