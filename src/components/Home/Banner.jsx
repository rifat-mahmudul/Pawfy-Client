import { Link } from 'react-router'
import cat from '../../assets/cat.webp'
import dog from '../../assets/dog.webp'
import { useTheme } from '@/Provider/ThemeProvider';

const Banner = () => {

    const { theme } = useTheme();

    return (
        <section className='min-h-screen flex items-center justify-center bg-gradient-to-b from-[#efadef00] via-[#8000804e] to-[#800080c5]'>

            <div className='max-w-[90%] xl:max-w-[1200px] mx-auto relative'>

                <div className='text-center flex flex-col sm:flex-row items-center justify-between gap-10'>

                    <div className='bg-pink-500 rounded-full lg:h-[250px] hidden lg:block'>
                        <img className='lg:h-[400px] -mt-20 mx-auto' src={dog} alt="" />
                    </div>
                    
                    <div className='py-20 sm:pt-36 lg:py-0'>
                        <h1 className='text-center text-4xl max-w-2xl uppercase font-russo'>Give a Paw, Gain a Lifetime of Love</h1>

                        <p className={`sm:max-w-lg max-w-[90%] mx-auto text-center mt-3 text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}>Adopting a pet is an act of kindness. Take the leap, find a friend, and build a bond that lasts forever. Your journey of unconditional love starts here.</p>

                        <Link>
                            <button className='py-3 px-10 font-bold text-lg bg-purple-700 rounded-lg text-white mt-4'>Adopt Now</button>
                        </Link>
                    </div>

                    <div className='bg-yellow-400 rounded-full sm:h-[250px]'>
                        <img className='sm:h-[400px] -mt-20 mx-auto' src={cat} alt="" />
                    </div>

                </div>
            </div>

        </section>
    )
}

export default Banner
