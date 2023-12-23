import { useQuery } from "react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAllTask = () => {
    const axiosSecure = useAxiosPublic()
    const { data: tasks, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tasks')
            return res.data;
        }
    })
    return [tasks, refetch]
};

export default useAllTask;