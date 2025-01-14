import { Link } from 'react-router'
import logo from '../../assets/logo.png'
import NavItem from './NavItem'
import { ModeToggle } from '@/Provider/ModeToggle'
import { RiMenu3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react';
import { useTheme } from '@/Provider/ThemeProvider';

const Navbar = () => {

    const { theme } = useTheme();
    const [open, setIsOpen] = useState(false);

    const navItems = <>
        <NavItem setIsOpen={setIsOpen} navTitle={'Home'} address={'/'}></NavItem>
        <NavItem setIsOpen={setIsOpen} navTitle={'Pet Listing'} address={'/pet-listing'}></NavItem>
        <NavItem setIsOpen={setIsOpen} navTitle={'Donation Campaigns'} address={'donation-campaign'}></NavItem>

        <Link to={'/login'}>
            <button 
            onClick={() => setIsOpen(false)}
            className={`py-2 px-5 border border-purple-700 rounded-lg font-semibold transition hover:bg-purple-700 hover:text-white ${theme === 'light' ? 'text-black' : 'text-white'}`}>Login</button>
        </Link>

        <Link to={'/register'}>
            <button 
            onClick={() => setIsOpen(false)}
            className='py-2 px-5 border border-purple-700 rounded-lg font-semibold transition bg-purple-700 text-white'>Register</button>
        </Link>
    </>

    return (
        <header className='fixed w-full top-0 z-50 backdrop-blur-lg '>
            
            <div className='max-w-[90%] xl:max-w-[1200px] mx-auto py-2 flex justify-between items-center'>

                <div>
                    <Link to={'/'}>
                        <div className='flex items-center gap-1'>
                            <img className='h-14' src={logo} alt="" />
                            <h1 className='text-3xl font-russo text-purple-700'>Pawfy</h1>
                        </div>
                    </Link>
                </div>

                <div className='hidden lg:block'>
                    <nav className='flex items-center space-x-4'>
                        {navItems}
                        <div>
                            <ModeToggle></ModeToggle>
                        </div>
                    </nav>
                </div>

                <div className='lg:hidden flex items-center space-x-3'>
                    <button className='text-3xl font-bold' onClick={() => setIsOpen(!open)}>
                        { open ?
                            <RxCross2 />
                            :
                            <RiMenu3Fill/>
                        }
                    </button>

                    <div>
                        <ModeToggle></ModeToggle>
                    </div>
                </div>

                { open && 
                    <div className={`lg:hidden absolute top-16 right-1 bg-white shadow-lg p-4 rounded-lg w-3/4 bg-gradient-to-t ${theme === 'light' ? 'from-purple-500 via-white to-white' : 'from-purple-500 via-black to-black'} ease-in-out duration-1000 border border-gray-400`}>
                        <div>
                            <nav>
                                <ul className='flex flex-col text-center space-y-4 font-semibold text-gray-600'>
                                {navItems}
                                </ul>
                            </nav>
                        </div>
                    </div>
                }

            </div>

        </header>
    )
}

export default Navbar
