import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>

            <section>
                <h1>Page Not Found</h1>
                <br />

                <div >
                    <button onClick={goBack}>Go Back</button>
                </div>
            </section>
        </Box>
    )
}

export default PageNotFound;
