import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Typography from '@mui/material/Typography';

// name: req.body.name,
//         cuisine: req.body.cuisine,
//         image: req.body.image,
//         address: {
//             building: req.body.building,
//             street: req.body.street,
//             zipcode: req.body.zipcode,
//         },
//         email: req.body.email,
//         phone: req.body.phone

interface FormState {
    name: string,
    cuisine: string,
    building: string,
    street: string,
    zipcode: string,
    image: [string],
    phone: string,
    email: string
}
const AdminAddRestaurant = () => {

    const [formData, setFormData] = useState<FormState>({
        name: '',
        cuisine: '',
        building: '',
        street: '',
        zipcode: '',
        image: [''],
        phone: '',
        email: ''

    });
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        console.log(formData)
        try{
            const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";
            const response = await axios.post(`${url}/api/restaurants`, {
                    restaurant_id: '',
                    name: formData.name,
                    cuisine: formData.cuisine,
                    building: formData.building,
                    street: formData.street,
                    zipcode: formData.zipcode,
                    image: ['https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg'],
                    phone: formData.phone,
                    email: formData.email,
                    reviews: [],
                },
                {
                    withCredentials: true,
                    headers: {
                      "Authorization": "Bearer " + localStorage.getItem('jwt')
                    }
                }
            );
            {   
                console.log(response);
                //Dialog box opens.
                // setOpen(true);
            }
        }
        catch(err:any){
            console.log(err.response.data);
            // console.log(formData)
        }
    };
    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log(formData);
    //     axios.post('/restaurants', formData)
    //         .then(response => {
    //             console.log(response);
    //             // do something with the response, like show a success message
    //         })
    // }

    return (
        <div>
            {/* <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label> 
                <input
                //     type="text"
                //     id="name"
                //     name="name"
                //     value={formData.name}
                //     onChange={handleChange}
                // />
                // <br></br>
                // <label htmlFor="address">Address:</label>
                // <input
                //     type="text"
                //     id="building"
                //     name="building"
                //     value={formData.building}
                //     onChange={handleChange}
                // />
                //  <br></br>
                // <input
                //     type="text"
                //     id="street"
                //     name="street"
                //     value={formData.street}
                //     onChange={handleChange}
                // />
                //  <br></br>
                // <input
                //     type="text"
                //     id="zipcode"
                //     name="zipcode"
                //     value={formData.zipcode}
                //     onChange={handleChange}
                // />
                //  <br></br>
                // <label htmlFor="phone">Phone:</label>
                // <input
                //     type="text"
                //     id="phone"
                //     name="phone"
                //     value={formData.phone}
                //     onChange={handleChange}
                // />
                //  <br></br>
                // <label htmlFor="email">Email:</label>
                // <input
                //     type="text"
                //     id="email"
                //     name="email"
                //     value={formData.email}
                //     onChange={handleChange}
                // />
                //  <br></br>
                // <label htmlFor="cuisine">Cuisine:</label>
                // <input
                //     type="text"
                //     id="cuisine"
                //     name="cuisine"
                //     value={formData.cuisine}
                //     onChange={handleChange}
                // />
                //  <br></br>
                {/* <button type="submit">Submit</button> */}
            {/* </form> */}


            <Grid container direction = "column" 
        alignItems="center" 
        maxWidth="xs" 
        sx ={{height:"100%",
        '& .MuiTextField-root': { m: 1, width: '80ch'}
        }} 
        spacing={2.5}>
            <Grid item>
                <Typography component="h1" variant="h4" style = {{marginTop:"2em", marginBottom:"0.5em"}}>
                    Add New Restaurant 
                </Typography>
            </Grid>
            <Grid item>
                <p>
                   Let's have your information to register your restaurant.
                </p>
            </Grid>
                <TextField fullWidth style = {{marginBottom:"2em"}}
                    className="input"
                    type="text"
                    id="outlined-multiline-flexible" 
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <TextField fullWidth style = {{marginBottom:"2em"}}
                    className="input"
                    type="text"
                    id="outlined-multiline-flexible" 
                    label="Cuisine"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleChange}
                    required
                />
               <Typography component="h1" variant="h6" style = {{marginTop:"2em", marginBottom:"0.5em"}}>
                    Address
                </Typography>
                <TextField fullWidth style = {{marginBottom:"2em"}}
                    className="input"
                    type="text"
                    id="outlined-multiline-flexible" 
                    label="Building"
                    name="building"
                    value={formData.building}
                    onChange={handleChange}
                    required
                />
                <TextField fullWidth style = {{marginBottom:"2em"}}
                    className="input"
                    type="text"
                    id="outlined-multiline-flexible" 
                    label="Street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                />
                <TextField fullWidth style = {{marginBottom:"2em"}}
                    className="input"
                    type="text"
                    id="outlined-multiline-flexible" 
                    label="Zipcode"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    required
                />
                <Typography component="h1" variant="h6" style = {{marginTop:"2em", marginBottom:"0.5em"}}>
                    Contact Details
                </Typography>

                <TextField fullWidth style = {{marginBottom:"2em"}}
                    className="input"
                    type="text"
                    id="outlined-multiline-flexible" 
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <TextField fullWidth style = {{marginBottom:"2em"}}
                    className="input"
                    type="email"
                    id="outlined-multiline-flexible"
                    label="Email ID"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <Button onClick={handleSubmit} variant="outlined">
                    Submit
                </Button>
        </Grid>
        {/* Dialog box to appear on successful form submission. */}
        {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contact form submitted!</DialogTitle>
        <DialogContent>
        <p> Hey {formData.name}! Your message has been sent successfully!!</p>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} variant="outlined">Close</Button>
        </DialogActions>
        </Dialog> */}
    
        </div>
    );
}

export default AdminAddRestaurant;