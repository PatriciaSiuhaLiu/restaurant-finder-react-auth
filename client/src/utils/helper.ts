import axios from "axios";
export const logoutCall = async ()=>{
    const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";
    const response = await axios.post(
        `${url}/api/auth/logout`,
        {
            "refreshToken":localStorage.getItem("refreshToken")
        },
        {
            withCredentials: true,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        },
    );

    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
}