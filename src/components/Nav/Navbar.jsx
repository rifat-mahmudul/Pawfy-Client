import { Link } from 'react-router'
import logo from '../../assets/logo.png'
import NavItem from './NavItem'
import { ModeToggle } from '@/Provider/ModeToggle'

const Navbar = () => {

    const navItems = <>
        <NavItem navTitle={'Home'} address={'/'}></NavItem>
        <NavItem navTitle={'Pet Listing'} address={'/pet-listing'}></NavItem>
        <NavItem navTitle={'Donation Campaigns'} address={'donation-campaign'}></NavItem>

        <Link to={'/login'}>
            <button className='py-2 px-5 border border-purple-700 rounded-lg font-semibold transition hover:bg-purple-700 hover:text-white'>Login</button>
        </Link>

        <Link to={'/register'}>
            <button className='py-2 px-5 border border-purple-700 rounded-lg font-semibold transition bg-purple-700 text-white'>Register</button>
        </Link>
    </>

    return (
        <header className='border border-purple-800 '>
            
            <div className='max-w-[90%] xl:max-w-[1200px] mx-auto py-2 flex justify-between items-center'>

                <div>
                    <Link to={'/'}>
                        <div className='flex items-center gap-1'>
                            <img className='h-14' src={logo} alt="" />
                            <h1 className='text-3xl font-russo text-purple-700'>Pawfy</h1>
                        </div>
                    </Link>
                </div>

                <div>
                    <nav className='flex items-center space-x-4'>
                        {navItems}
                        <div>
                            <ModeToggle></ModeToggle>
                        </div>
                    </nav>
                </div>

            </div>

        </header>
    )
}

export default Navbar
