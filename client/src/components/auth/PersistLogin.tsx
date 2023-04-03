import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosClient } from "../../api/auth";
import axios from "axios";
// import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from "../../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuthentication } = useAuth();
  const getLoggedInUser = async () => {
    try {
      // Later change this to a passport auheticated server route like get user. This will
      //call the service with jwt if it is in cookie else if cookie not available
      //it will go to error and set logged in false

      // //decode token
      // const userDetail = jwt_decode()
      const url =
        import.meta.env.VITE_ENV === "DEV"
          ? "http://localhost:8080"
          : "https://online-food-order-nf2n.onrender.com";

      // const response = await axios.get(`${url}/api/users/me`,
      const response = await axiosClient.get(`${url}/api/users/me`, {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
      });
      if (response?.data) {
        const { email, username, userRoles } = response.data;
        setIsLoading(false);
        const authData = {
          email,
          name: username,
          roles: userRoles,
        };
        setAuthentication(authData);
      }
    } catch (error) {
      setAuthentication({
        email: "",
        name: "",
        roles: [],
      });
      console.log("Error----->", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p> //with this check we are avoiding the immediate load of Outlet as initally the auth context will be blank,
      ) : (
        //we wait for the service finish loading and then show the outlets if we do not do this the app will dump
        <Outlet />
      )}
      {/* <Outlet /> */}
    </>
  );
};

export default PersistLogin;
