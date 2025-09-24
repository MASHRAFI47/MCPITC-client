import axios from "axios"

export const axiosCommon = axios.create({
    baseURL: import.meta.env.VITE_Api_Url,
    withCredentials: true,
})

const useAxiosCommon = () => {
    return axiosCommon
}

export default useAxiosCommon