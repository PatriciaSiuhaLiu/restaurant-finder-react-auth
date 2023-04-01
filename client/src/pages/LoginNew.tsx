import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import FormInputNew from "../components/FormInputNew";
import { Alert } from "@mui/material";
import styled from "styled-components";


const StyledFormButton = styled.button`
  width: 120px;
  height: 48px;
  padding: 10px;
 
  background-color: #2bb0b0;
  color: white;
  border: none;
  margin: 20px 0px 20px ;
  cursor: pointer;
`;

const LoginNew = () => {
    interface ValueType {
        email: string;
        password: string;
    }
    type Input = {
        id: number;
        name: string;
        type: string;
        placeholder: string;
        label: string;
        required: boolean
        autoComplete: string
        pattern?: string
        errorMessage: string
    };
    const { auth, setAuthentication } = useAuth();
    const navigate = useNavigate();
    const [values, setValues] = useState<ValueType>({
        email: "",
        password: "",
    });
    const [authError, setAuthError] = useState(false)
    useEffect(() => {
        auth.email && navigate('/home')
    }, [])
    const inputs: Input[] = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Email",
            label: "Email",
            required: true,
            autoComplete: "off",
            errorMessage: "Enter valid email id",
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password",
            required: true,
            autoComplete: "off",
            errorMessage: "Password is mandatory",
        },
    ];

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValues({ ...values, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {

            const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";
            const response = await axios.post(
                `${url}/api/v1/login`,
                { email: values.email, password: values.password },
                {
                    withCredentials: true,
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem('jwt')
                    }
                },
            );

            const { user, token } = response.data;

            const authData = {
                email: user.email,
                name: user.name,
                roles: user.roles,
                token
            }


            setAuthentication(authData);

            localStorage.setItem(("jwt"), token);
            navigate("/home");
        } catch (error) {

            setAuthError(true)
        }
    };
    return (

        <div className="container">
            <div className="warpper">
                <form onSubmit={handleSubmit}>
                    <h2 style={{ marginBottom: "5px" }}>Sign in</h2>
                    {authError && <Alert severity="error">Invalid Username/Password combination</Alert>}
                    {inputs.map((input) => (
                        <FormInputNew
                            key={input.id}
                            {...input}
                            value={values[input.name as keyof ValueType]}
                            onChange={onChange}
                        />
                    ))}
                    <StyledFormButton type="submit">Sign in</StyledFormButton>
                </form>
            </div>
        </div>

    );
};

export default LoginNew;
