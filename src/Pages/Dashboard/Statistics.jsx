import Carts from "@/components/Dashboard/DashNav/Carts";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const Statistics = () => {

    const axiosSecure = useAxiosSecure();

    const { data: pets = [] } = useQuery({
        queryKey: ["total-pets"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/pets`);
            return data;
        },
    });

    const { data: adoptionRequest = [] } = useQuery({
        queryKey: ["total-adoptionRequest"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/adopt-request`);
            return data;
        },
    });

    const { data: allDonation = [] } = useQuery({
        queryKey: ["all-donation"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/all-donations`);
            return data;
        },
    });

    const totalDonation = allDonation.reduce((acc, donation) => acc + donation.donatorData.donatedAmount, 0);

    
  return (
    <section className="pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

            <div className="bg-gradient-to-r from-purple-700 via-purple-500 to-purple-200 p-4 rounded-lg text-center shadow-xl shadow-purple-900">
                <h1 className="text-4xl text-white font-bold">Total Pets</h1>
                <h1 className="mt-2 text-2xl font-semibold text-white">{pets.length}</h1>
            </div>

            <div className="bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-200 p-4 rounded-lg text-center shadow-xl shadow-yellow-900">
                <h1 className="text-4xl text-white font-bold">Total Adoption</h1>
                <h1 className="mt-2 text-2xl font-semibold text-white">{adoptionRequest.length}</h1>
            </div>

            <div className="bg-gradient-to-r from-orange-700 via-orange-500 to-orange-200 p-4 rounded-lg text-center shadow-xl shadow-orange-900">
                <h1 className="text-4xl text-white font-bold">Total Donation</h1>
                <h1 className="mt-2 text-2xl font-semibold text-white">{totalDonation}$</h1>
            </div>

        </div>

        {/* carts and calendar */}
        <div className="mt-16 flex sm:flex-row flex-col gap-16 sm:gap-0 justify-between w-full">

            <div>
                <Carts></Carts>
                <h1 className="text-center mt-2 text-xl font-bold">Donation Report</h1>
            </div>

            <div>
                <Calendar />
            </div>

        </div>
    </section>
  )
}

export default Statistics
