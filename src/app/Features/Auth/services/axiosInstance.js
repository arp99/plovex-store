import axios from "axios"

const axiosInstance = axios.create({
    baseURL : `https://plovex-store-backend.herokuapp.com/`
})


//axios instance for requests which require authorization by token
export const axiosAuthorization = axios.create({
    baseURL : `https://plovex-store-backend.herokuapp.com/`
})

axiosAuthorization.interceptors.request.use(config => {
    const token = localStorage.getItem('token') ?? null
    // const { token } = useSelector( state => state.auth )
    if( token ){
        config.headers["authorization"] = `Bearer ${token}` 
    }
    return config
})


export default axiosInstance