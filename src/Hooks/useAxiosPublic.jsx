import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://react-task-manager-server.vercel.app/'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;