import { Link } from 'react-router'
import cat from '../../assets/cat.webp'
import { useTheme } from '@/Provider/ThemeProvider';

const Banner = () => {

    const { theme } = useTheme();

    return (
        <section className='min-h-screen flex items-center justify-center bg-gradient-to-b from-[#efadef00] via-[#8000804e] to-[#800080c5]'>

            <div className='max-w-[90%] xl:max-w-[1100px] mx-auto relative'>

                <div className='flex flex-col sm:flex-row items-center justify-between'>
                    
                    <div className='sm:pt-36 lg:py-0 sm:w-[48%]'>
                        <h1 className='text-4xl max-w-2xl uppercase font-russo'>Give a Paw, Gain a Lifetime of Love</h1>

                        <p className={`mx-auto mt-3 text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Adopting a pet is an act of kindness. Take the leap, find a friend, and build a bond that lasts forever. Your journey of unconditional love starts here.</p>

                        <Link>
                            <button className='py-3 px-10 font-bold text-lg bg-purple-700 rounded-lg text-white mt-4'>Adopt Now</button>
                        </Link>
                    </div>

                    <div className='bg-[#80008084] rounded-full rounded-tr-lg rounded-b-lg sm:h-[350px] sm:w-[40%]'>
                        <img className='sm:h-[450px] -ml-5 -mt-10 mx-auto' src={cat} alt="" />
                    </div>

                </div>
            </div>

        </section>
    )
}

export default Banner
