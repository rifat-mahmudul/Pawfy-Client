import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import HelmetTitle from "@/Shared/HelmetTitle";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { FaPencil } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router";
import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from "react";
import toast from "react-hot-toast";
import DonatorsModal from "@/components/Modal/DonatorsModal";


const MyDonationCampaigns = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [donators, setDonators] = useState({});
    const [selectedCampaign, setSelectedCampaign] = useState(null);

    const { data: pets = [], refetch } = useQuery({
        queryKey: ["my-donation-campaign"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/donationCampaigns/${user?.email}`);
            return data;
        },
    });

    const handleTogglePause = (id, currentPauseState) => {
        axiosSecure.patch(`/donationCampaign/${id}`, { pause: !currentPauseState }).then(() => {
            refetch();
        });
    };

    const handleViewDonators = async (campaignId) => {
        setSelectedCampaign(campaignId);
        try {
            const { data } = await axiosSecure.get(`/campaign/${campaignId}`);
            setDonators(data);
            console.log(data)
            setIsModalOpen(true);
        } catch (error) {
            toast.error("Failed to fetch donators");
            console.error("Error fetching donators:", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setDonators({});
        setSelectedCampaign(null);
    };

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('image', {
            header : () => (<p className="text-center">Image</p>),
            cell : (info) => (
                <img className="h-12 w-12 rounded-lg mx-auto" src={info.getValue()} alt="" />
            )
        }),
        columnHelper.accessor('petName', {
            header : () => (<p className="text-center">Pet Name</p>),
            cell : (info) => info.getValue()
        }),
        columnHelper.accessor('maximumDonation', {
            header : () => (<p className="text-center">Maximum Donation $</p>),
            cell : (info) => info.getValue()
        }),
        columnHelper.accessor('donatedAmount', {
            header : () => (<p className="text-center">Progress</p>),
            cell: (info) => {
                const donatedAmount = info.row.original.donatedAmount || 0;
                const maximumDonation = info.row.original.maximumDonation || 1;
                
                const progress = (donatedAmount / maximumDonation) * 100;
                
                return (
                    <div>
                        <ProgressBar
                            completed={progress.toFixed(2)} places
                            maxCompleted={100}
                            label={`${progress.toFixed(2)}%`}
                            bgColor="#6a1b9a"
                            baseBgColor="#d1c4e9"
                            isLabelVisible={true}
                        />
                    </div>
                );
            }
        }),
        columnHelper.display({
            id: "actions",
            header: () => <p className="text-center">Actions</p>,
            cell: ({ row }) => (
                <div className="flex gap-2 justify-around items-center">
                    <button
                        onClick={() => handleTogglePause(row.original._id, row.original.pause)}
                        className={`p-2 text-white rounded font-bold ${
                            row.original.pause ? 'bg-pink-500' : 'bg-green-500'
                        }`}
                    >
                        {row.original.pause ? 'Unpause' : 'Pause'}
                    </button>
                    <button
                        onClick={() => {
                            navigate(`/dashboard/update-pet/${row.original._id}`);
                        }}
                        className="p-3 bg-[#0000ff64] text-white rounded"
                    >
                        <div className="text-lg text-[blue]">
                            <FaPencil />
                        </div>
                    </button>
        
                    <button
                        onClick={() => handleViewDonators(row.original._id)}
                        className="flex items-center space-x-1 p-3 bg-purple-500 text-white rounded"
                    >
                        <FaEye /> <h1>Donators</h1>
                    </button>
                </div>
            ),
        })
    ]
    
    const table = useReactTable({
        data : pets,
        columns,
        getCoreRowModel : getCoreRowModel(),
        getSortedRowModel : getSortedRowModel(),
        getPaginationRowModel : getPaginationRowModel()
    })


    return (
        <section className="pb-16">
            <HelmetTitle title="My Donation Campaigns"></HelmetTitle>

            <div className="lg:overflow-hidden overflow-x-auto rounded-lg">
                {
                    pets.length === 0 ? (
                        <p className="text-center text-3xl text-red-500 font-semibold mt-4">NO PETS ADDED</p>
                    ) : (
                        <table className="w-full text-center bg-[#80008017] font-semibold">
                            <thead className="text-center bg-purple-600 text-white">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th
                                                key={header.id}
                                                className={`border border-gray-300 px-4 py-4 text-left cursor-pointer ${
                                                    header.column.getIsSorted() ? "bg-purple-600 text-white" : ""
                                                }`}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                <div className="flex items-center justify-center">
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    <span className="ml-2">
                                                        {{
                                                            asc: <span className="text-blue-500 text-lg">🔼</span>,
                                                            desc: <span className="text-red-500 text-lg">🔽</span>,
                                                        }[header.column.getIsSorted()] || (
                                                            <span className="text-gray-400 text-lg">↕️</span>
                                                        )}
                                                    </span>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>

                            <tbody>
                                {table.getRowModel().rows.map((row) => (
                                    <tr className="even:bg-[#80808023]" key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="border border-purple-500 px-4 py-2">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                }
            </div>

            {/* pagination */}
            
            {
                pets.length > 10 && (
                    <div className="flex justify-end space-x-5 items-center mt-4">
                        <button 
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="py-2 sm:px-5 px-3 rounded-3xl bg-purple-600 text-white flex items-center space-x-1 disabled:bg-purple-400 disabled:cursor-not-allowed">
                            <h1 className="text-lg"><MdKeyboardDoubleArrowLeft /></h1>
                            <h1>Previous</h1>
                        </button>

                        <span className="font-semibold">
                            {table.getState().pagination.pageIndex + 1} / {" "} {table.getPageCount()}
                        </span>

                        <button 
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="py-2 sm:px-5 px-3 rounded-3xl bg-purple-500 text-white flex items-center space-x-1 disabled:bg-purple-400 disabled:cursor-not-allowed"
                        >
                            <h1>Next</h1>
                            <h1 className="text-lg"><MdKeyboardDoubleArrowRight /></h1>
                        </button>
                    </div>
                )
            }

            <DonatorsModal
            isOpen={isModalOpen}
            donators={donators}
            onClose={closeModal}
            >
            </DonatorsModal>

        </section>
    );
};

export default MyDonationCampaigns;
