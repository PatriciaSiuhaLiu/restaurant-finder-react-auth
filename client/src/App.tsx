import React from 'react';
import { Box, CssBaseline, Paper, Typography, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import routes from './routes';
import { Routes, Route } from 'react-router-dom';
import theme from './theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter, Router } from 'react-router-dom';
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from './components/auth/ProtectedRoute';
import AddMenuItem from "./pages/AdminAddMenu";
import Home from './pages/Home';
import Layout from './pages/Layout';
import PersistLogin from './components/auth/PersistLogin';
import Unauthorized from './pages/Unauthorized';
import UserRegister from './pages/RegisterUser';
import LoginNew from './pages/LoginNew';
import './App.css'
import PaymentNew from './pages/PaymentNew';
import MenuItem from './pages/MenuItem';
import Cart from './pages/Cart';
import PaymentSuccess from './pages/PaymentSuccess';
import RestaurantFinder from './pages/RestaurantFinder';
import PageNotFound from './pages/PageNotFound';
import AdminAddRestaurant from './pages/AdminAddRestaurant';
import AdminEditRestaurant from './pages/AdminEditRestaurant';


function App() {


  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>

        <CssBaseline />
        <Box height="100vh" display="flex" flexDirection="column">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path='newUserRegister' element={<UserRegister />} />


                <Route element={<PersistLogin />} >
                  {routes.map(route =>
                    <Route path={route.path} element={<route.component />} />
                  )
                  }  //Note: About & Contact us routes are added inside the persisted login because they need to show even after login
                  <Route path='login' element={<LoginNew />} /> //Note: About & Contact us routes are added inside the persisted login because they need to hide after login
                  <Route index element={<Home />} path="/home" />
                  <Route element={<Home />} path="/" />
                  <Route element={<ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]} />}>

                  </Route>

                  <Route element={<ProtectedRoute allowedRoles={[ "ROLE_ADMIN"]} />}>
                    <Route path="/addRestaurant" element={<AdminAddRestaurant/>} />
                    <Route path="/editRestaurant/:id" element={<AdminEditRestaurant/>} />
                    <Route path="/addMenu" element={<AddMenuItem />} />
                    <Route path="/editMenu" element={<AddMenuItem />} />
                  </Route>
                  <Route element={<ProtectedRoute allowedRoles={["ROLE_USER"]} />}>

                    <Route path='/restaurant/:id/menu' element={<MenuItem />} />
                    {/* <Route path='cart' element={<Cart />} /> */}
                    <Route path='/findRestaurant/' element={<RestaurantFinder />} />
                    <Route path='payment/:amount' element={<PaymentNew />} />
                    <Route path='paymentSucess/:paymentId' element={<PaymentSuccess />} />
                  </Route >
                </Route >
              </Route >
              <Route path="/*" element={<PageNotFound />} />
            </Routes >
            <Footer />
          </BrowserRouter >
        </Box >
      </ThemeProvider >
    </AuthContextProvider >
  );
}

export default App;



