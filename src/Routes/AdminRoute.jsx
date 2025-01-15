import PropTypes from 'prop-types'
import { Navigate } from "react-router";
import useRole from "@/Hooks/useRole";

const AdminRoute = ({children}) => {

    const [role, isLoading] = useRole();

    if(isLoading) return <h1 className="min-h-screen flex items-center justify-center">Loading....</h1>

    if(role === "admin") return children;

    return <Navigate to={'/dashboard/add-pet'}></Navigate>

}

AdminRoute.propTypes = {
    children: PropTypes.element,
}

export default AdminRoute
