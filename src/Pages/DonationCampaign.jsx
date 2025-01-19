import CampaignCard from "@/components/Card/CampaignCard";
import SkeletonLoader from "@/components/Loader/SkeletonLoader";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import HelmetTitle from "@/Shared/HelmetTitle";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const DonationCampaign = () => {
    const axiosPublic = useAxiosPublic();

    const { ref, inView } = useInView();
    const [search, setSearch] = useState("");

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["allDonationCampaign", search],
        queryFn: async () => {
            const { data } = await axiosPublic(
                `/donationCampaigns?search=${search}`
            );
            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length === 0) return undefined;
            return allPages.length + 1;
        },
    });

    const donationCampaigns = data?.pages.flat() || [];
    const sortedDonationCampaigns = donationCampaigns.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
    }

    return (
        <section className="pt-20 pb-16">
            <HelmetTitle title="Donation Campaign"></HelmetTitle>

            <div className="max-w-[90%] xl:max-w-[1200px] mx-auto">

                <input
                    type="text"
                    className="border border-purple-500 p-3 w-full rounded-lg outline-0 focus:border-2 bg-inherit"
                    placeholder="Search by pet's name"
                    onChange={(e) => setSearch(e.target.value)}
                />  

                {/* Content Section */}
                <div>
                    {isFetching && !isFetchingNextPage ? (
                        <SkeletonLoader></SkeletonLoader>
                    ) : sortedDonationCampaigns.length === 0 ? (
                        <p className="flex items-center justify-center flex-col text-3xl text-red-500 min-h-[calc(100vh-200px)] font-bold">
                            NO DATA FOUND
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                            {sortedDonationCampaigns.map((campaign) => (
                                <CampaignCard key={campaign._id} campaign={campaign}></CampaignCard>
                            ))}
                        </div>
                    )}
                </div>

                {/* Infinite Scroll Trigger */}
                {hasNextPage && (
                    <div ref={ref} className="text-center mt-8">
                        {isFetchingNextPage ? (
                            <p>Loading more...</p>
                        ) : (
                            <p>Scroll down to load more...</p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default DonationCampaign;
