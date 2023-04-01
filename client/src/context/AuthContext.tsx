import { createContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";

type AuthType = {
    email: string;
    name: string;
    roles: Array<number>;
    token: string
}

export type AuthContextType = {
    isLoggedIn: boolean;
    auth: {
        email: string;
        name: string;
        roles: Array<number>;
        token: string
    },
    // setAuth: (auth: AuthType) => void,
    setAuthentication: (auth: AuthType) => void,
    login: () => void;
    logout: () => void;
};
const AuthContext = createContext<AuthContextType | null>(null);



const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    //On loading the appilication check the local storage

    const callAPICheck = async () => {

        try {
            // Later change this to a passport auheticated server route like get user. This will 
            //call the service with jwt if it is in cookie else if cookie not available
            //it will go to error and set logged in false

            // check if the user is valid -- handles page refresh for persistence 
            const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";

            const response = await axios.get(`${url}/api/v1/loggedInUser`,
                {
                    withCredentials: true,
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem('jwt')
                    }
                }

            );
            const { email, name, roles, token } = response.data.userData
            const authData = {
                email,
                name,
                roles,
                token
            }
            setAuthentication(authData)


        } catch (error) {
            setAuthentication({
                email: "",
                name: "",
                roles: [],
                token: "",
            })
            console.log("Error----->", error);
        }
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [auth, setAuth] = useState({
        email: "",
        name: "",
        roles: [],
        token: "",
    } as AuthType);

    useEffect(() => {

        // callAPICheck();

    }, []);

    const setAuthentication = (auth: AuthType) => {
        setAuth(auth)
    }

    const login = () => {

        setIsLoggedIn(true);
    };
    const logout = () => {
        setAuth({
            email: "",
            name: "",
            roles: [],
            token: "",
        })
        // setIsLoggedIn(false);
        localStorage.removeItem("jwt");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, auth, setAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
export { AuthContextProvider };