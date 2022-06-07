import axios from 'axios';


const api = axios.create({
    baseURL : process.env.REACT_APP_BACKEND_API,
    withCredentials:true,
    headers: {
        Authorization : `Bearer ${localStorage.getItem(process.env.REACT_APP_AUTHORIZATION_TOKEN)}`
    }
})

export default api;