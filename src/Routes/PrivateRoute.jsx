import useAuth from "@/Hooks/useAuth"
import { Navigate, useLocation } from "react-router";
import PropTypes from 'prop-types'

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading) return <h1 className="min-h-screen flex items-center justify-center">Loading....</h1>
    
    if(user) return children

    return <Navigate to='/login' state={location.pathname} replace={true}></Navigate>
}

PrivateRoute.propTypes = {
    children: PropTypes.element,
}

export default PrivateRoute
