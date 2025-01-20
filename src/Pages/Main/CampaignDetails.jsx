import CampaignCard from "@/components/Card/CampaignCard";
import SkeletonLoader from "@/components/Loader/SkeletonLoader";
import PaymentModal from "@/components/Modal/Payment/PaymentModal";
// import AdoptModal from "@/components/Modal/AdoptModal";
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import HelmetTitle from "@/Shared/HelmetTitle"
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router"

const CampaignDetails = () => {

    const {id} = useParams();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {user} = useAuth();

    const {data : recommendedData = []} = useQuery({
        queryKey : ['Recommended'],
        queryFn : async () => {
            const {data} = await axiosPublic('/donationCampaigns')
            return data;
        }
    })

    const activeData = recommendedData.filter(d => d.pause !== true);

    console.log(activeData)

    const {data : campaign = {}, isLoading, refetch} = useQuery({
        queryKey : ['details-campaign', id], 
        queryFn : async () => {
            const {data} = await axiosPublic(`/campaign/${id}`);
            return data;
        }
    })

    const {petName, maximumDonation, sortDescription, longDescription, lastDate, image, userEmail, _id, pause} = campaign;

    const campaignData = {
        petName, 
        maximumDonation, 
        image, 
        donator : {
            name : user?.displayName,
            photo : user?.photoURL,
            email : user?.email
        },
        petOwner : userEmail,
        petId : _id
    }

    const handleDonate = () => {
        if(!user){
            return navigate('/login')
        }
    }

    if(isLoading) return <SkeletonLoader></SkeletonLoader>

    return (
        <section className="pt-24 pb-16">

            <HelmetTitle title="Donation Details"></HelmetTitle>

            <div className="max-w-[90%] xl:max-w-[1000px] mx-auto flex sm:flex-row flex-col gap-10 border border-purple-300 p-4 rounded-lg shadow-xl">
                
                <div className="sm:w-[400px]">
                    <img className="h-[400px] w-[400px] rounded-lg" src={image} alt="" />
                </div>

                <div className="sm:w-[600px]">
                    <h1 className="font-bold text-2xl">{petName}</h1>
                    <h1 className="mt-2"><span className="font-semibold">Maximum Donation :</span> $ {maximumDonation}</h1>
                    <h1 className="mt-2"><span className="font-semibold">Last Date :</span> {new Date(lastDate).toLocaleDateString()}</h1>
                    <h1 className="mt-2"><span className="font-semibold">Details  :</span> {longDescription}</h1>
                    <h1 className="mt-2"><span className="font-semibold">Summery  :</span> {sortDescription}</h1>
                    <button 
                    disabled={pause}
                    onClick={() => {
                        handleDonate(),
                        setIsModalOpen(true);
                    }}
                    className="px-5 py-2 bg-green-500 text-white rounded-lg font-semibold mt-3 transition hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Donate Now
                    </button>
                </div>

                {/* modal components */}
                <PaymentModal
                    refetch={refetch}
                    campaignData={campaignData}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    user={user}
                />

            </div>

            <div className="max-w-[90%] xl:max-w-[1000px] mx-auto">

                <h1 className="text-3xl mb-10 text-purple-500 mt-10 font-bold">Recommended Donation</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:grid-cols-3">
                    {
                        activeData.slice(0,3).map(data => (
                            <CampaignCard 
                            key={data._id}
                            campaign={data}
                            ></CampaignCard>
                        ))
                    }
                </div>

            </div>

            
        </section>
    )
}

export default CampaignDetails
