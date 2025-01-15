import { NavLink } from "react-router"
import PropTypes from 'prop-types'
import { useTheme } from "@/Provider/ThemeProvider";

const NavItem = ({navTitle, address, setIsOpen}) => {

    const { theme } = useTheme();

    return (
        <NavLink
        onClick={()=>setIsOpen(false)}
        className={({isActive}) => (isActive ? `font-bold text-purple-700` : `hover:text-purple-700 font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`)}
        to={address}
        >
            <h3>{navTitle}</h3>
        </NavLink>
    )
}

NavItem.propTypes = {
    navTitle : PropTypes.string,
    address : PropTypes.string,
    setIsOpen : PropTypes.func,
}

export default NavItem
