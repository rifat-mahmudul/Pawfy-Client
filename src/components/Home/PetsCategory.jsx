import { FaCat } from "react-icons/fa6";
import { GiSittingDog } from "react-icons/gi";
import { LuBird } from "react-icons/lu";
import { IoFishSharp } from "react-icons/io5";
import { GiRabbit } from "react-icons/gi";
import { useTheme } from "@/Provider/ThemeProvider";
import {  NavLink } from "react-router";

const PetsCategory = () => {
    
    const {theme} = useTheme();

    return (
        <section className="pt-16">

            <div className="xl:max-w-[1200px] max-w-[90%] mx-auto">

                <h1 className="text-center text-4xl font-bold">Pets Category</h1>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-10 sm:max-w-[800px] mx-auto mt-8">
                    <NavLink 
                    className={({isActive}) => (isActive ? `flex items-center border border-purple-600 py-2 px-5 rounded-lg text-xl space-x-1 bg-purple-500 text-white` : `flex items-center border border-purple-600 py-2 px-5 rounded-lg text-xl space-x-1 ${theme === 'light' ? 'bg-purple-200' : 'bg-inherit'}`)}
                    to={'/'}
                    >
                        <FaCat className="text-3xl text-yellow-500" />
                        <h1 className="font-bold">Cat</h1>
                    </NavLink>

                    <NavLink 
                    className={({isActive}) => (isActive ? `flex items-center border border-purple-600 py-2 px-5 rounded-lg text-xl space-x-1 bg-purple-500 text-white` : `flex items-center border border-purple-600 py-2 px-5 rounded-lg text-xl space-x-1 ${theme === 'light' ? 'bg-purple-200' : 'bg-inherit'}`)}
                    to={'dog'}
                    >
                        <GiSittingDog className="text-3xl text-orange-500" />
                        <h1 className="font-bold">Dog</h1>
                    </NavLink>

                    <NavLink 
                    className={({isActive}) => (isActive ? `flex items-center border border-purple-600 py-2 px-5 rounded-lg text-xl space-x-1 bg-purple-500 text-white` : `flex items-center border border-purple-600 py-2 px-5 rounded-lg text-xl space-x-1 ${theme === 'light' ? 'bg-purple-200' : 'bg-inherit'}`)}
                    to={'bird'}
                    >
                        <LuBird className="text-3xl text-blue-700" />
                        <h1 className="font-bold">Bird</h1>
                    </NavLink>

                    <NavLink 
                    className={({isActive}) => (isActive ? `flex items-center border border-purple-600 py-2 px-5 rounded-lg text-xl space-x-1 bg-purple-500 text-white` : `flex items-center border border-purple-600 py-2 px-5 rounded-lg text-xl space-x-1 ${theme === 'light' ? 'bg-purple-200' : 'bg-inherit'}`)}
                    to={'rabbit'}
                    >
                        <GiRabbit className="text-3xl text-pink-500" />
                        <h1 className="font-bold">Rabbit</h1>
                    </NavLink>

                    <NavLink 
                    className={({isActive}) => (isActive ? `flex items-center border border-purple-600 py-2 px-5 rounded-lg text-xl space-x-1 bg-purple-500 text-white` : `flex items-center border border-purple-600 py-2 px-5 rounded-lg text-xl space-x-1 ${theme === 'light' ? 'bg-purple-200' : 'bg-inherit'}`)}
                    to={'fish'}
                    >
                        <IoFishSharp className="text-3xl text-green-500" />
                        <h1 className="font-bold">Fish</h1>
                    </NavLink>
                    
                </div>

            </div>

        </section>
    )
}

export default PetsCategory
