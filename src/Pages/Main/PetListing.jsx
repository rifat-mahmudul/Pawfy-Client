import PetCard from "@/components/Card/PetCard";
import useAxiosPublic from "@/Hooks/useAxiosPublic"
import HelmetTitle from "@/Shared/HelmetTitle"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react";

const PetListing = () => {

    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    console.log(category)

    const {data : pets = [], refetch} = useQuery({
        queryKey : ['allPets', search, category],
        queryFn : async () => {
            const {data} = await axiosPublic(`/pets?search=${search}&category=${category}`)
            return data;
        }
    })

    const noAdoptedPets = pets.filter(pet => pet.adopted === false);

    const sortedPets = noAdoptedPets.sort((a, b) => new Date(b.date) - new Date(a.date));

    refetch();

    return (
        <section className="pt-20 pb-16">
            <HelmetTitle title="Pet Listing"></HelmetTitle>

            <div className="max-w-[90%] xl:max-w-[1200px] mx-auto">

                <div className="flex gap-10">
                    <input 
                    type="text" 
                    className="border border-purple-500 p-3 w-full rounded-lg outline-0 focus:border-2 bg-inherit"
                    placeholder="Search by pet's name"
                    onChange={e => setSearch(e.target.value)}
                    />

                    <select 
                    onChange={e => setCategory(e.target.value)}
                    className="border border-purple-500 p-3 rounded-lg bg-inherit outline-0 focus:border-2 bg-purple-500 text-white font-semibold">
                        <option value="">Category</option>
                        <option value="Cat">Cat</option>
                        <option value="Dog">Dog</option>
                        <option value="Bird">Bird</option>
                        <option value="Rabbits">Rabbits</option>
                        <option value="Fish">Fish</option>
                    </select>
                </div>
                

                <div>
                    {
                        sortedPets.length === 0 ? <p className="flex items-center justify-center flex-col text-3xl text-red-500 min-h-[calc(100vh-200px)] font-bold">NO DATA FOUND</p> :
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                            {sortedPets.map(pet => (
                            <PetCard
                            key={pet._id}
                            pet={pet}
                            ></PetCard>
                            ))}
                        </div>
                    }
                </div>

            </div>

            
        </section>
    )
}

export default PetListing
