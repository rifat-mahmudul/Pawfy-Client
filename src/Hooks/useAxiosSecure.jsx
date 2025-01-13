import axios from "axios"

const axiosSecure = axios.create({
    baseURL : import.meta.env.VITE_API_KEY,
    withCredentials : true
})

const useAxiosSecure = () => {
    return axiosSecure;
}

export default useAxiosSecure
