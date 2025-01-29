import { Link } from 'react-router'
import cat from '../../assets/cat.webp'
import { useTheme } from '@/Provider/ThemeProvider';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Banner = () => {

    const { theme } = useTheme();

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <section className='min-h-screen flex items-center justify-center bg-gradient-to-b from-[#efadef00] via-[#8000804e] to-[#800080c5]'>

            <div className='max-w-[90%] xl:max-w-[1100px] mx-auto relative overflow-hidden'>

                <div className='flex flex-col sm:flex-row items-center justify-between'>
                    
                    <div data-aos="fade-right"  data-aos-duration="2000" className='pt-20 sm:pt-36 lg:py-0 mb-14 sm:w-[55%] sm:mt-10'>
                        <h1 className={`sm:text-5xl text-3xl max-w-2xl uppercase font-russo ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>Give a Paw, Gain a Lifetime of Love</h1>

                        <p className={`mx-auto mt-3 text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Adopting a pet is a wonderful act of kindness that brings joy, love, and companionship into your life. By giving a pet a second chance, you create a lifelong bond filled with trust, happiness, and unconditional love. Take the leap today and welcome a loyal friend into your home—your journey of love and friendship starts here!</p>

                        <Link to={'/pet-listing'}>
                            <button className='py-3 px-10 font-bold text-lg bg-purple-700 rounded-lg text-white mt-4'>Adopt Now</button>
                        </Link>
                    </div>

                    <div data-aos="fade-left"  data-aos-duration="2000" className='sm:h-[350px] sm:w-[40%]'>
                        <img className='sm:h-[450px] -ml-5 -mt-10 mx-auto' src={cat} alt="" />
                    </div>

                </div>
            </div>

        </section>
    )
}

export default Banner
