import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Typography from '@mui/material/Typography';

//Contact form interface defined.
interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

//Contact us module declaration.
const ContactUs: React.FC = () => {
    //UseState hook defined for the dialog box.
    const [open, setOpen] = useState(false);

    //UseState hook for the form data enteries. By default, it is empty.
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: '',
    });

    //In case of input from user, add details to form fields.
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    //In case the form is submitted by user, axios.post method is called which calls the backend functionality integrated.
    const handleSubmit = async () => {
        try {

            const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";

            const response = await axios.post(`${url}/api/v1/contact`, {
                name: formData.name,
                email: formData.email,
                message: formData.message
            })
            {
                console.log(response);
                //Dialog box opens.
                setOpen(true);
            }
        }
        catch (err) {
            console.log(err);
        }
    };
    //If the user closes the dialog box which appears on successful form submission, close dialog box and reset the form.
    const handleClose = () => {
        setOpen(false);
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <>
            <Grid container direction="column"
                alignItems="center"
                maxWidth="xs"
                sx={{
                    height: "100%",
                    '& .MuiTextField-root': { m: 1, width: '80ch' }
                }}
                spacing={2.5}>
                <Grid item>
                    <Typography component="h1" variant="h4" style={{ marginTop: "2em", marginBottom: "0.5em" }}>
                        Contact Us
                    </Typography>
                </Grid>
                <Grid item>
                    <p>
                        We are here to serve you better. Please reach out to us in case of any queries/complaints.
                    </p>
                </Grid>
                <TextField fullWidth style={{ marginBottom: "2em" }}
                    className="input"
                    type="text"
                    id="outlined-multiline-flexible"
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />

                <TextField fullWidth style={{ marginBottom: "2em" }}
                    className="input"
                    type="email"
                    id="outlined-multiline-flexible"
                    label="Email ID"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />

                <TextField fullWidth style={{ marginBottom: "2em" }}
                    className="input"
                    type="text"
                    id="outlined-multiline-flexible"
                    label="Please type your message here"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                />
                <Button onClick={handleSubmit} variant="outlined">
                    Submit
                </Button>
            </Grid>
            {/* Dialog box to appear on successful form submission. */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Contact form submitted!</DialogTitle>
                <DialogContent>
                    <p> Hey {formData.name}! Your message has been sent successfully!!</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ContactUs;