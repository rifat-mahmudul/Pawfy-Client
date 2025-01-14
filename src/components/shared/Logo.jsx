import { Link } from "react-router"
import logo from '../../assets/logo.png'

const Logo = () => {
    return (
        <Link to={'/'}>
            <div className='flex items-center gap-1'>
                <img className='h-14' src={logo} alt="" />
                <h1 className='text-3xl font-russo text-purple-700'>Pawfy</h1>
            </div>
        </Link>
    )
}

export default Logo
