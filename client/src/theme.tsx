import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            light: '#63b8ff',
            main: '#0989e3',
            dark: '#005db0',
            contrastText: '#000'
        },
        secondary: {
            main: '#00b3b3',
            light: '#8cd9b3',
            dark: '#008080',
            contrastText: '#000'
        },
    }
});

export default theme;