import useAuth from "@/Hooks/useAuth"
import { Navigate, useLocation } from "react-router";
import PropTypes from 'prop-types'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonLoader from "@/components/Loader/SkeletonLoader";

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading) return <SkeletonLoader></SkeletonLoader>
    
    if(user) return children

    return <Navigate to='/login' state={location.pathname} replace={true}></Navigate>
}

PrivateRoute.propTypes = {
    children: PropTypes.element,
}

export default PrivateRoute
