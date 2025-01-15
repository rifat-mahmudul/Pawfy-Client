import { NavLink } from "react-router"
import propTypes from 'prop-types'
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
    navTitle : propTypes.string,
    address : propTypes.string,
    setIsOpen : propTypes.func,
}

export default NavItem
