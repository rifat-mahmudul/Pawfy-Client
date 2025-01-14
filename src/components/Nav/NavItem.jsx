import { NavLink } from "react-router"
import propTypes from 'prop-types'

const NavItem = ({navTitle, address}) => {
    return (
        <NavLink
        className={({isActive}) => (isActive ? 'font-bold text-purple-700' : ' hover:text-purple-700 font-semibold')}
        to={address}
        >
            <h3>{navTitle}</h3>
        </NavLink>
    )
}

NavItem.propTypes = {
    navTitle : propTypes.string,
    address : propTypes.string,
}

export default NavItem
