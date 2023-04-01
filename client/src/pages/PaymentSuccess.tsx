import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { color } from '@mui/system';

const PaymentSuccess = (props: any) => {
    const { paymentId } = useParams()
    const navigate = useNavigate()



    return (
        <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", color: "green" }}>
            <>Payment Successful. Transaction Id: {paymentId}</>
        </Box>

    )
}

export default PaymentSuccess