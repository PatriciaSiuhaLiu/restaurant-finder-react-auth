import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { Alert } from "@mui/material";
import './paymentNew.css'
import styled from "styled-components";




const Error = styled.p`
    color: red;
    font-size: 14px;
`



// import "../App.css";
const PaymentNew = () => {

    const [creditCardNum, setCreditCardNum] = useState('');
    const [cardErr, setCardErr] = useState(false);
    const [cardHolderErr, setCardHolderErr] = useState(false)
    const [cardHolder, setCardHolder] = useState('');
    const [expireMonth, setExpireMonth] = useState('');
    const [monthErr, setMonthErr] = useState(false)
    const [yearErr, setYearErr] = useState(false)
    const [expireYear, setExpireYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [cvvErr, setCvvErr] = useState(false)
    const [paymentError, setPaymentError] = useState(false)
    // const [amount, setAmount] = useState(0);



    const { auth, setAuthentication } = useAuth();
    const { amount } = useParams();
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!creditCardNum) {
            setCardErr(true);
        }
        else {
            setCardErr(false);
        }
        if (!cardHolder) {
            setCardHolderErr(true);
        }
        else {
            setCardHolderErr(false);
        }
        if (!expireMonth) {
            setMonthErr(true);
        } else {
            setMonthErr(false);
        }

        if (!expireYear) {
            setYearErr(true);
        } else {
            setYearErr(false);
        }
        if (!cvv) {
            setCvvErr(true);
        } else {
            setCvvErr(false);
        }

        if (!(creditCardNum && cardHolder && expireMonth && expireYear && cvv)) {
            return;
        }
        try {
            const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";
            const response = await axios.post(
                `${url}/api/v1/payment`,
                {
                    amount: amount,
                    cardNumber: creditCardNum,
                    cardHolder: cardHolder,
                    expireMonth: expireMonth,
                    expireYear: expireYear,
                    cvv: cvv
                },
                {
                    withCredentials: true,
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem('jwt')
                    }
                }
            );


            navigate(`/paymentSucess/${response.data.paymentId}`);
        } catch (error) {
            console.log("Error----->", error);
            setPaymentError(true);
        }
    };
    const handleNum = (e: any) => {
        console.log(e.target.value);
        setCreditCardNum(e.target.value);
        // console.log(e.target.value);
    }

    const handleCardHolder = (e: any) => {
        console.log(e.target.value);
        setCardHolder(e.target.value);

    }

    const handleExpMonth = (e: any) => {
        console.log(e.target.value);
        setExpireMonth(e.target.value);

    }

    const handleExpYear = (e: any) => {
        setExpireYear(e.target.value);
        console.log(e.target.value);
    }
    const handleCvv = (e: any) => {
        setCvv(e.target.value);
        console.log(e.target.value);
    }
    return (

        <div className="container">
            <div className="warpper">
                <form id="form" onSubmit={handleSubmit}>
                    <h2 style={{ marginBottom: "3rem" }}>Pay Amount: {amount}</h2>
                    {paymentError && <Alert severity="error">Error in payment</Alert>}

                    <div className="input-container">
                        <h4>Enter card number</h4>
                        <input
                            type="text"
                            pattern="\b(?:\d[ -]*?){13,16}\b"
                            onChange={handleNum}
                            placeholder="Please enter your credit card number"


                        />
                        {cardErr && <Error >Please enter 16 digit card number</Error>}
                    </div>

                    <div className="input-container">
                        <h4>Card Holder</h4>
                        <input onChange={handleCardHolder} type="text" placeholder="Please enter your full name"
                        />
                        {cardHolderErr && <Error >Please enter card holder</Error>}
                    </div>
                    <div className="input-grp">
                        <div>
                            <h4>Month</h4>
                            <select value={expireMonth} onChange={handleExpMonth}>
                                <option value=""></option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                            {monthErr && <Error >Please enter card expiry month</Error>}
                        </div>
                        <div className="input-container">
                            <h4>Expiration Year</h4>
                            <select value={expireYear} onChange={handleExpYear}>
                                <option value=""></option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                            </select>
                            {yearErr && <Error >Please enter card expiry year</Error>}
                        </div>
                        <div className="input-container">
                            <h4>CVV</h4>
                            <input type="password" placeholder="CVV" onChange={handleCvv} pattern="\b(?:\d[ -]*?){0,3}\b" />
                            {cvvErr && <Error >Please enter 3 digit card cvv</Error>}
                        </div>
                    </div>
                    <button type="submit">Pay</button>
                </form>
            </div>
        </div>

    );
};

export default PaymentNew;
