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
    address:{
        building: string,
        street: string,
        zipcode: string
    },
    reviews:[],
    menu_list:[],
    image: [string],
    phone: string,
    email: string
}
const AdminEditRestaurant = () => {
    let params = useParams();

    const [formData, setFormData] = useState<FormState>({
        restaurantId:'',
        name: '',
        cuisine: '',
        address:{
            building: '',
            street: '',
            zipcode: ''
        },
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
          setFormData(response.data);
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
                        building: formData.address.building,
                        street: formData.address.street,
                        zipcode: formData.address.zipcode,
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
                //Dialog box opens.
                // setOpen(true);
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
                    value={formData.address.building}
                    onChange={handleChange}
                    required
                />
                <TextField fullWidth style = {{marginBottom:"2em"}}
                    className="input"
                    type="text"
                    id="outlined-multiline-flexible" 
                    label="Street"
                    name="street"
                    value={formData.address.street}
                    onChange={handleChange}
                    required
                />
                <TextField fullWidth style = {{marginBottom:"2em"}}
                    className="input"
                    type="text"
                    id="outlined-multiline-flexible" 
                    label="Zipcode"
                    name="zipcode"
                    value={formData.address.zipcode}
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
        </div>
    );
}

export default AdminEditRestaurant;