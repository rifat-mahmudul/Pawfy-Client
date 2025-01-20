import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import HelmetTitle from "@/Shared/HelmetTitle";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const MyDonations = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: pets = [], refetch } = useQuery({
        queryKey: ["my-donations"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/my-donations/${user?.email}`);
            return data;
        },
    });

    console.log(pets)

    const handleRefund = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Refund!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/donations/${id}`)
                    toast.success('Your donation refunded')
                } catch (error) {
                    console.log(`error from Your donation refunded : ${error}`)
                } finally {
                    refetch()
                }
            }
        });
    }

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor((_,rowIndex) => rowIndex + 1, {
            id : "serial",
            header : () => (<p className="text-center">S/N</p>),
            cell : (info) => info.getValue()
        }),
        columnHelper.accessor('donatorData.image', {
            header : () => (<p className="text-center">Image</p>),
            cell : (info) => (
                <img className="h-12 w-12 rounded-lg mx-auto" src={info.getValue()} alt="" />
            )
        }),
        columnHelper.accessor('donatorData.petName', {
            header : () => (<p className="text-center">Pet Name</p>),
            cell : (info) => info.getValue()
        }),
        columnHelper.accessor('donatorData.donatedAmount', {
            header : () => (<p className="text-center">Donated Amount $</p>),
            cell : (info) => info.getValue()
        }),
        columnHelper.display({
            id: "actions",
            header: () => <p className="text-center">Action</p>,
            cell: ({ row }) => (
                <div className="flex gap-2 justify-around items-center">
                    <button
                        onClick={() => handleRefund(row.original._id)}
                        className={`p-2 text-white rounded font-bold bg-red-500`}
                    >
                        Refund
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
            <HelmetTitle title="My Donations"></HelmetTitle>

            <div className="lg:overflow-hidden overflow-x-auto rounded-lg">
                {
                    pets.length === 0 ? (
                        <p className="text-center text-3xl text-red-500 font-semibold mt-4">NO Have No Donation</p>
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

        </section>
    );
};

export default MyDonations;
