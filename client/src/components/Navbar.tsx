import React, { FC, ReactElement, useContext,useEffect,useState } from "react";
import styled from 'styled-components'
import "./Navbar.css";
import {
    Box,
    Link,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import routes from "../routes";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext, { AuthContextType } from "../context/AuthContext";
import axios from "axios";
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import LunchDiningTwoToneIcon from '@mui/icons-material/LunchDiningTwoTone';
import LocalPizzaTwoToneIcon from '@mui/icons-material/LocalPizzaTwoTone';
import FoodBankTwoToneIcon from '@mui/icons-material/FoodBankTwoTone';

const Logout = styled.a`
    font-size: 19px;
    color: white;
`

const Navbar: FC = (): ReactElement => {

    const [initialState,setInitialState]=useState(true);
    //Functionality to redirect to the cart page.
    useEffect(()=>{
        setInitialState(false);
    },[]);
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate("/cart");
    };

    // let activeStyle = {
    //     color: "red",
    // };
    // const Navlink1 = (<NavLink style={({ isActive }) => isActive ? activeStyle : undefined} to={""}></NavLink>);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const auth = useContext(AuthContext) as AuthContextType;
    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const onLogout = async (event: React.FormEvent) => {
        event.preventDefault();

        // const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";
        // const response = await axios.get(`${url}/api/v1/logout`, {
        //     withCredentials: true,
        //     headers: {
        //         "Authorization": "Bearer " + localStorage.getItem('jwt')
        //     }
        // })

        // set isLoggedin false here
        auth.logout();
        navigate('/login')


    }
    return (
        <>
     
        { initialState?
        (
            <p>Loading...</p> //with this check we are avoiding the immediate load of Outlet as initally the auth context will be blank,
          ) : <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "secondary.main",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        fontFamily="cursive"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex"},
                        }}
                    >  
                        GRAB A BITE
                        <LunchDiningTwoToneIcon fontSize="large"></LunchDiningTwoToneIcon>
                    </Typography>
                    {/* add menu for mobile */}
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {routes.map((page: any) => (
                                <Link
                                    key={page.key}
                                    component={NavLink}
                                    to={page.path}
                                    color="black"
                                    underline="none"
                                    variant="button"

                                >
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center" >{page.title}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                    >
                        GRAB A BITE
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                marginLeft: "1rem",
                            }}
                        >

                            {auth.auth.email && auth.auth.roles.find(role => role == "ROLE_ADMIN" || role == "ROLE_USER") && (
                                <>

                                    <Link
                                        //   key={page.key}
                                        component={NavLink}
                                        to={"/home"}
                                        color="white"
                                        aria-label={"Home"}
                                        underline="none"
                                        variant="button"
                                        sx={{ fontSize: "large", marginLeft: "2rem" }}
                                    >
                                        {"Home"}
                                    </Link>

                                </>
                            )}
                            {auth.auth.email && auth.auth.roles.find(role => role == "ROLE_USER") && (
                                <>
                                    {/* <Link
                                        //   key={page.key}
                                        component={NavLink}
                                        to={"/payment"}
                                        color="white"
                                        aria-label={"Payment"}
                                        underline="none"
                                        variant="button"
                                        sx={{ fontSize: "large", marginLeft: "2rem" }}
                                    >
                                        {"Payment"}
                                    </Link> */}

                                    <Link

                                        component={NavLink}
                                        to={"/findRestaurant"}
                                        color="white"
                                        aria-label={"Restaurants"}
                                        underline="none"
                                        variant="button"
                                        sx={{ fontSize: "large", marginLeft: "2rem" }}
                                    >
                                        {"Restaurants"}
                                    </Link>


                                </>
                            )}


                            {auth.auth.email && auth.auth.roles.find(role => role == "ROLE_ADMIN") && (
                                <>
                                    <Link
                                        //   key={page.key}
                                        component={NavLink}
                                        to={"/addRestaurant"}
                                        color="white"
                                        aria-label={"AddRestaurant"}
                                        underline="none"
                                        variant="button"
                                        sx={{ fontSize: "large", marginLeft: "2rem" }}
                                    >
                                        {"Add Restaurant"}
                                    </Link>
                                    {/* <Link
                                        //   key={page.key}
                                        component={NavLink}
                                        to={"/editRestaurant"}
                                        color="white"
                                        aria-label={"AddRestaurant"}
                                        underline="none"
                                        variant="button"
                                        sx={{ fontSize: "large", marginLeft: "2rem" }}
                                    >
                                        {"Edit Restaurant"}
                                    </Link> */}
                                    <Link
                                        //   key={page.key}
                                        component={NavLink}
                                        to={"/addMenu"}
                                        color="white"
                                        aria-label={"adminAddMenu"}
                                        underline="none"
                                        variant="button"
                                        sx={{ fontSize: "large", marginLeft: "2rem" }}
                                    >
                                        {"Add Menu"}
                                    </Link>
                                    {/* <Link
                                        //   key={page.key}
                                        component={NavLink}
                                        to={"/editMenu"}
                                        color="white"
                                        aria-label={"adminAddMenu"}
                                        underline="none"
                                        variant="button"
                                        sx={{ fontSize: "large", marginLeft: "2rem" }}
                                    >
                                        {"Edit Menu"}
                                    </Link> */}

                                </>
                            )}

                            {routes.map((page: any) => (
                                <Link
                                    key={page.key}
                                    component={NavLink}
                                    to={page.path}
                                    color="white"
                                    aria-label={page.title}
                                    underline="none"
                                    variant="button"
                                    sx={{ fontSize: "large", marginLeft: "2rem" }}
                                >
                                    {page.title}
                                </Link>
                            ))}

                        </Box>
                        <Box sx={{ flexGrow: 1, justifyContent: "flex-end", display: { xs: "none", md: "flex" } }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    marginLeft: "1rem",
                                }}
                            >
                                {/* {auth.auth.email && auth.auth.roles.find(role => role == "ROLE_USER") && (
                                    <>
                                        <IconButton aria-label="cart" color="inherit" onClick={handleRedirect} edge="end"
                                            style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}>
                                            <ShoppingCartTwoToneIcon />
                                        </IconButton>


                                    </>
                                )} */}
                                {!auth.auth.email && (
                                    <>

                                        <Link
                                            //   key={page.key}
                                            component={NavLink}
                                            to={"/login"}
                                            color="white"
                                            aria-label={"Login"}
                                            underline="none"
                                            variant="button"
                                            sx={{ fontSize: "large", marginLeft: "2rem" }}
                                        >
                                            {"Login"}
                                        </Link>
                                        <Link
                                            //   key={page.key}
                                            component={NavLink}
                                            to={"/newUserRegister"}
                                            color="white"
                                            aria-label={"Sign Up"}
                                            underline="none"
                                            variant="button"
                                            sx={{ fontSize: "large", marginLeft: "2rem" }}
                                        >
                                            {"Sign Up"}
                                        </Link>


                                    </>
                                )}

                                {auth.auth.email && (
                                    <>

                                        <Logout href="javascript:;" type="button" onClick={(event) => onLogout(event)} >Logout</Logout>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </Box>
}
        </>
    );
};

export default Navbar;