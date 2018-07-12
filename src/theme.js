import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';



export default createMuiTheme({
    palette: {
        primary: {
            light: '#e1f5fe',
            main: '#b3e5fc',
            dark: '#4fc3f7',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#ff7663',
            dark: '#ff566f',
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