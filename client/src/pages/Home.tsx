import { Box } from '@mui/material';
import React from 'react';
import pic from "./../assets/online-food-ordering-statistics-RestroApp.jpeg";

const Home = () => {

    return (
        <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", color: "green" }}>

            <img src={pic} style={{ backgroundSize: "fill" }}></img>
        </Box>
    )
}

export default Home




