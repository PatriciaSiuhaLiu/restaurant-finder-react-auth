import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", color: "green" }}>
            <section>
                <h1>Unauthorized</h1>
                <br />
                <p>You do not have access to the requested page.</p>
                <div className="flexGrow">
                    <button onClick={goBack}>Go Back</button>
                </div>
            </section>
        </Box >
    )
}

export default Unauthorized
