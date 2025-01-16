import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"
import useAuth from "./useAuth";

const useRole = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {data : role = '', isLoading} = useQuery({
        queryKey : ['role', user?.email],
        queryFn : async () => {
            const {data} = await axiosSecure(`/user/${user?.email}`);
            return data.role;
        }
    })

    return [role, isLoading]
}

export default useRole
