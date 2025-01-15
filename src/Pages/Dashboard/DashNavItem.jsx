import { NavLink } from "react-router"
import propTypes from 'prop-types'
import { useTheme } from "@/Provider/ThemeProvider";

const DashNavItem = ({navTitle, address, icon}) => {

    const { theme } = useTheme();

    return (
        <NavLink
            className={({isActive}) => (isActive ? `font-bold text-purple-700 flex space-x-2 items-center justify-start text-lg mb-5` : `hover:text-purple-700 font-semibold ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} flex space-x-2 items-center text-lg justify-start mb-5`)}
            to={address}
            >
                <h3>{icon}</h3>
                <h3>{navTitle}</h3>
        </NavLink>
    )
}

DashNavItem.propTypes = {
    navTitle : propTypes.string,
    address : propTypes.string,
    setIsOpen : propTypes.func,
    icon : propTypes.element,
}

export default DashNavItem
