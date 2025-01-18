import useAxiosPublic from "@/Hooks/useAxiosPublic";
import HelmetTitle from "@/Shared/HelmetTitle"
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router"

const PetDetails = () => {

    const {id} = useParams();
    const axiosPublic = useAxiosPublic();

    const {data : pet = {}} = useQuery({
        queryKey : ['details-pet', id], 
        queryFn : async () => {
            const {data} = await axiosPublic(`/pet/${id}`);
            return data;
        }
    })

    const {petName, petAge, location, longDescription, userEmail, category, image} = pet;

    return (
        <section className="pt-24">

            <HelmetTitle title="Pet Details"></HelmetTitle>

            <div className="max-w-[90%] xl:max-w-[1000px] mx-auto flex sm:flex-row flex-col gap-10">
                
                <div className="sm:w-[400px]">
                    <img className="h-[400px] w-[400px] rounded-lg" src={image} alt="" />
                </div>

                <div className="sm:w-[600px]">
                    <h1 className="font-bold text-2xl">{petName}</h1>
                    <h1 className="mt-2"><span className="font-semibold">Age :</span> {petAge}</h1>
                    <h1 className="mt-2"><span className="font-semibold">Location :</span> {location}</h1>
                    <h1 className="mt-2"><span className="font-semibold">Category :</span> {category}</h1>
                    <h1 className="mt-2"><span className="font-semibold">Details  :</span> {longDescription}</h1>
                    <button className="px-5 py-2 bg-green-500 text-white rounded-lg font-semibold mt-3 transition hover:bg-green-600">Adopt</button>
                </div>

            </div>

            
        </section>
    )
}

export default PetDetails
