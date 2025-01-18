import useAxiosPublic from "@/Hooks/useAxiosPublic"
import { useQuery } from "@tanstack/react-query";
import PetCard from "../Card/PetCard";
import { Link } from "react-router";

const Bird = () => {

    const axiosPublic = useAxiosPublic();

    const {data : pets = []} = useQuery({
        queryKey : ['catPet'],
        queryFn : async () => {
            const {data} = await axiosPublic('/pets')
            return data;
        }
    });

    const petData = pets.filter(p => p.category === 'Bird')

    return (
        <div className="mt-8 xl:max-w-[1200px] max-w-[90%] mx-auto pb-16 text-center">
            <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
                {
                    petData.slice(0,8).map(pet => (
                        <PetCard 
                        key={pet._id}
                        pet={pet}
                        >

                        </PetCard>
                    ))
                }
            </div>

            <Link to={'/pet-listing'}>
                <button 
                className="py-2 px-5 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition mt-8 font-bold text-lg"
                >
                    See More
                </button>
            </Link>
        </div>
    )
}

export default Bird
