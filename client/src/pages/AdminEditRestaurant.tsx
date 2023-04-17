import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

interface FormState {
    restaurantId: string,
    name: string,
    cuisine: string,
    building: string,
    street: string,
    zipcode: string,
    reviews:[],
    menu_list:[],
    image: [string],
    phone: string,
    email: string
}
const AdminEditRestaurant = () => {
    let params = useParams();
    const [open, setOpen] = useState(false);

    let navigate = useNavigate();
    const handleRedirect = () =>{
    navigate("/findRestaurant");
    }

    const handleClose = () => {
        setOpen(false);
        handleRedirect();
    };

    const successMessage = () => {
        return (
            <div className="success">
                <Typography component="h1" variant="h6">
                    {formData.name} restaurant data has been successfully updated and saved in our database!!</Typography>
            </div>
        );
    };

    const [formData, setFormData] = useState<FormState>({
        restaurantId:'',
        name: '',
        cuisine: '',
        building: '',
        street: '',
        zipcode: '',
        image: [''],
        reviews:[],
        menu_list:[],
        phone: '',
        email: ''

    });

    const sendGetRequest = async () => {
        try {
          const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";   
          const response = await axios.get(
            `${url}/api/restaurants/${params.id}`,
            {
              withCredentials: true,
              headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
              }
            }
          )
          const form = {
            restaurantId: response.data.restaurantId,
            name: response.data.name,
            cuisine: response.data.cuisine,
            building: response.data.address.building,
            street: response.data.address.street,
            zipcode: response.data.address.zipcode,
            image: response.data.image,
            reviews:response.data.reviews,
            menu_list: response.data.menu_list,
            phone: response.data.phone,
            email: response.data.email
        };
          setFormData(form);
          console.log(formData);
          
        } catch (err) {
          console.log(err);
        }
      };
    
    
      useEffect(() => {
        sendGetRequest()    
      }, []);


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        console.log(formData);
        try{
            const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";
            const response = await axios.put(`${url}/api/restaurants/${formData.restaurantId}`, {
                restaurantId: formData.restaurantId,
                    name: formData.name,
                    cuisine: formData.cuisine,
                    address:{
                        building: formData.building,
                        street: formData.street,
                        zipcode: formData.zipcode,
                    },
                    image: ['https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg'],
                    phone: formData.phone,
                    email: formData.email,
                    reviews: formData.reviews,
                    menu_list: formData.menu_list
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
                setOpen(true);
            }
        }
        catch(err:any){
            console.log(err.response.data);
            // console.log(formData)
        }
    };
    
    return (
        <div>
            <Grid container direction = "column" 
        alignItems="center" 
        maxWidth="xs" 
        sx ={{height:"100%",
        '& .MuiTextField-root': { m: 1, width: '80ch'}
        }} 
        spacing={2.5}>
            <Grid item>
                <Typography component="h1" variant="h4" style = {{marginTop:"2em", marginBottom:"0.5em"}}>
                    Edit Restaurant Information
                </Typography>
            </Grid>
            <Grid item>
                <p>
                   Please enter the details you want to update.
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
                {/* Dialog box to appear on successful form submission. */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle style={{ fontWeight: 'bold' }}>Update Success</DialogTitle>
                    <DialogContent>
                        {successMessage()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined">Close</Button>
                    </DialogActions>
                </Dialog>
        </Grid>  
        </div>
    );
}

export default AdminEditRestaurant;