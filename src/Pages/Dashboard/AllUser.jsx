import useAxiosSecure from "@/Hooks/useAxiosSecure";
import HelmetTitle from "@/Shared/HelmetTitle";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";


const AllUser = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/users`);
            return data;
        },
    });

    const handleAdmin = (id) => {
        axiosSecure.patch(`/user/admin/${id}`, { role : 'admin' }).then(() => {
            refetch();
        });
        toast.success("Make admin successfully!")
    };

    const handleUser = (id) => {
        axiosSecure.patch(`/user/admin/${id}`, { role : 'user' }).then(() => {
            refetch();
        });
        toast.success("Make user successfully!")
    };

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor((_,rowIndex) => rowIndex + 1, {
            id : "serial",
            header : () => (<p className="text-center">S/N</p>),
            cell : (info) => info.getValue()
        }),
        columnHelper.accessor('image', {
            header : () => (<p className="text-center">Image</p>),
            cell : (info) => (
                <img className="h-12 w-12 rounded-lg mx-auto" src={info.getValue()} alt="" />
            )
        }),
        columnHelper.accessor('name', {
            header : () => (<p className="text-center">Name</p>),
            cell : (info) => info.getValue()
        }),
        columnHelper.accessor('email', {
            header : () => (<p className="text-center">Email</p>),
            cell : (info) => info.getValue()
        }),
        columnHelper.accessor('role', {
            header: () => (<p className="text-center">Role</p>),
            cell: (info) => {
                const role = info.getValue();
                return (
                    <p className={`text-center py-1 rounded-lg font-bold ${
                        role === 'admin' ? 'bg-purple-300 text-purple-800' :
                        role === 'user' ? 'bg-[#00ff113f] text-green-700' :
                        'bg-purple-300 text-purple-900 text-xs'
                    }`}>
                        {role === 'admin' ? 'Admin' :
                            role === 'user' ? 'User' :
                            'Unknown Role'}
                    </p>
                );
            }
        }),
        columnHelper.display({
            id: "actions",
            header: () => <p className="text-center">Actions</p>,
            cell: ({ row }) => {
                const role = row.original.role;
        
                return (
                    <div className="flex gap-2 justify-around items-center">
                        {role === 'user' && (
                            <button
                                onClick={() => handleAdmin(row.original._id, 'admin')}
                                className="p-3 rounded-lg font-semibold bg-purple-500 text-white hover:bg-purple-700 transition"
                            >
                                Make Admin
                            </button>
                        )}
                        {role === 'admin' && (
                            <button
                                onClick={() => handleUser(row.original._id, 'user')}
                                className="p-3 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-700 transition"
                            >
                                Make User
                            </button>
                        )}
                    </div>
                );
            }
        })
    ]
    
    const table = useReactTable({
        data : users,
        columns,
        getCoreRowModel : getCoreRowModel(),
        getSortedRowModel : getSortedRowModel(),
        getPaginationRowModel : getPaginationRowModel()
    })


    return (
        <section className="pb-16">
            <HelmetTitle title="My Added Pets"></HelmetTitle>

            <div className="lg:overflow-hidden overflow-x-auto rounded-lg">
                {
                    users.length === 0 ? (
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
                users.length > 10 && (
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

export default AllUser;
