import axios from "axios";
import useAuth from '../hooks/useAuth';
export const axiosClient = axios.create({   
})

axiosClient.interceptors.response.use((response)=>{
return response;

},
async (error)=>{
  
    const prevRequest = error?.config;
    if(error?.response?.status === 401 && !prevRequest?.sent){
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
        else{
            
        }
      
        

        
    }

}
)