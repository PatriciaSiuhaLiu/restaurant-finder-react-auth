import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Grid } from '@mui/material';
import { Avatar, FormControl, InputLabel, OutlinedInput, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Button } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Link, useNavigate } from "react-router-dom";

//User registration form data interface declared.
interface FormData {
    name: string;
    email: string;
    password: string;
}

//User registration module declaration
const UserRegister = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
    });

    // States for checking if any error has been made
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Functionality to show or hide password
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    //Functionality to handle all the changes made to the form.
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
        setSubmitted(false);
    };

    //Functionality to redirect to the login page.
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate("/login");
    };


    // Handling the form submission.
    // Call the backend functionality through axios.post method while sending the field details entered by user.
    const handleSubmit = async () => {
        try {

            const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";
            const response = await axios.post(`${url}/api/auth/signup`, {
                username: formData.name,
                email: formData.email,
                password: formData.password
            })
            {
                console.log(response);
                setSubmitted(true);
                setError(false);
                setOpen(true);
            }
        }
        catch (err) {
            console.log(err);
        }
    };
    //If the user closes the dialog box which appears on successful form submission, close dialog box and redirect to login page.
    const handleClose = () => {
        setOpen(false);
        handleRedirect();
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <Typography component="h1" variant="h6" >Hi {formData.name}! You have been successfully registered in our system!!</Typography>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <Typography component="h1" variant="h6">Kindly check the information entered!</Typography>
            </div>
        );
    };

    return (
        <>
            <Grid container
                direction="column"
                alignItems="center"
                maxWidth="xs"
                sx={{ height: "100%", '& .MuiTextField-root': { m: 1, width: '80ch' } }}
                spacing={2}>
                <Grid item spacing={10}>
                    <Avatar sx={{ bgcolor: blue[100] }} style={{ marginTop: "2em" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                </Grid>
                <Grid item>
                    <Typography component="h1" variant="h4">
                        Sign Up
                    </Typography>
                </Grid>
                <Grid item>
                    <div className="messages">
                        {errorMessage()}
                    </div>
                </Grid>
                <TextField required fullWidth style={{ marginBottom: "2em" }}
                    id="outlined-multiline-flexible"
                    label="Full Name"
                    name="name"
                    variant="outlined"
                    onChange={handleChange}
                    className="input"
                    value={formData.name}
                    type="text" />

                <TextField required fullWidth style={{ marginBottom: "2em" }}
                    id="outlined-multiline-flexible"
                    label="Email"
                    name="email"
                    variant="outlined"
                    onChange={handleChange}
                    className="input"
                    value={formData.email}
                    type="email" />

                <FormControl sx={{ m: 1, width: '80ch' }} variant="outlined" required>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Grid item alignContent={'center'}>
                    <Button onClick={handleSubmit} variant="outlined">
                        Register
                    </Button>
                </Grid>
                <Grid item>
                    <p>
                        Already have an account? <Link to="/login">Login</Link> now.
                    </p>
                </Grid>
            </Grid>
            {/* Dialog box to appear on successful form submission. */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ fontWeight: 'bold' }}>Registration Successful!</DialogTitle>
                <DialogContent>
                    {successMessage()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UserRegister;