import { createContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { logoutCall } from '../utils/helper';
import jwt_decode from "jwt-decode";
import { axiosClient } from '../api/auth';

type AuthType = {
    email: string;
    name: string;
    roles: Array<string>;
}


export type AuthContextType = {
    isLoggedIn: boolean;
    auth: {
        email: string;
        name: string;
        roles: Array<string>;
    },
    // setAuth: (auth: AuthType) => void,
    setAuthentication: (auth: AuthType) => void,
    login: () => void;
    logout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);



const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    //On loading the appilication check the local storage
    const [isLoaded, setIsLoaded]=useState(false);
    const callAPICheck = async () => {

        try {
            // Later change this to a passport auheticated server route like get user. This will 
            //call the service with jwt if it is in cookie else if cookie not available
            //it will go to error and set logged in false

            // check if the user is valid -- handles page refresh for persistence 
            const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";

            const response = await axios.get(`${url}/api/users/me`,
           // const response = await axiosClient.get(`${url}/api/users/me`,
                {
                    withCredentials: true,
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem('jwt'),
                        "Access-Control-Allow-Origin": "http://localhost:8080"
                    }
                }

            );
            if (response?.data) {
                const { email, username, userRoles } = response.data;
               
                const authData = {
                  email,
                  name: username,
                  roles: userRoles,
                };
                setAuthentication(authData);
              }
        
          

        } catch (error:any) {
            if(error.response.status ===401 && localStorage.getItem("refreshToken")){
                const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";
                const response = await axios.post(
                    `${url}/api/auth/access-token`,
                    { "refreshToken":localStorage.getItem('refreshToken')},
                    // {
                    //     withCredentials: true,
                    //     headers: {
                    //         "Authorization": "Bearer " + localStorage.getItem('refreshToken')
                    //     }
                    // },
                );
        
                const { userId, accessToken, refreshToken } = response.data;

         

        if(accessToken){
            localStorage.setItem(("jwt"), accessToken);
            localStorage.setItem(("refreshToken"), refreshToken); //refresh token returned by api wil be the same we sent
           
        }
            
        const response1 = await axios.get(`${url}/api/users/me`,
        // const response = await axiosClient.get(`${url}/api/users/me`,
             {
                 withCredentials: true,
                 headers: {
                     "Authorization": "Bearer " + localStorage.getItem('jwt'),
                     "Access-Control-Allow-Origin": "http://localhost:8080"
                 }
             }

         );
         if (response1?.data) {
             const { email, username, userRoles } = response1.data;
            
             const authData = {
               email,
               name: username,
               roles: userRoles,
             };
             setAuthentication(authData);
           }
           else{
            setAuthentication({
                email: "",
                name: "",
                roles: []
            })
            console.log("Error----->", error);
        
        }
    
    
    }
else{
            setAuthentication({
                email: "",
                name: "",
                roles: []
            })
            console.log("Error----->", error);
        
        }
        }
    }

    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [auth, setAuth] = useState({
        email: "",
        name: "",
        roles: []
    } as AuthType);

    useEffect(() => {

         callAPICheck();

    }, []);

    const setAuthentication = (auth: AuthType) => {
        setAuth(auth)
        //  if(auth.email)
        setIsLoaded(true);
    }

    const login = () => {

        setIsLoggedIn(true);
    };
    const logout = async () => {
        logoutCall();
        setAuth({
            email: "",
            name: "",
            roles: []
        })
    
    
        // const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";
        // const response = await axios.post(
        //     `${url}/api/auth/logout`,
        //     {
        //         "refreshToken":localStorage.getItem("refreshToken")
        //     },
        //     {
        //         withCredentials: true,
        //         headers: {
        //             "Authorization": "Bearer " + localStorage.getItem('jwt')
        //         }
        //     },
        // );

        // localStorage.removeItem("jwt");
        // localStorage.removeItem("refreshToken");
    };

    // return (
        
    //     <AuthContext.Provider value={{ isLoggedIn, login, logout, auth, setAuthentication }}>
    //         {children}
    //     </AuthContext.Provider>
    // );

    if ( isLoaded ) {
        return  <AuthContext.Provider value={{ isLoggedIn, login, logout, auth, setAuthentication }}>
                {children}
            </AuthContext.Provider>
      }
    
      return <>Loading ... or render eg. a spinner</>
    
};

export default AuthContext;
export { AuthContextProvider };