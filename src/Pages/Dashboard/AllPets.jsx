import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import HelmetTitle from "@/Shared/HelmetTitle";
import { useQuery } from "@tanstack/react-query";
import {
    createColumnHelper,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import { useNavigate } from "react-router";

const MyAddPets = () => {
    const { user } = useAuth(); // Get logged-in user's info
    const axiosSecure = useAxiosSecure(); // For secure API requests
    const navigate = useNavigate(); // Navigation hook

    // Fetching the user's added pets
    const { data: pets = [], refetch } = useQuery({
        queryKey: ["pets"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/pets/${user?.email}`);
            return data;
        },
    });

    // TanStack Table column helper
    const columnHelper = createColumnHelper();

    // Defining table columns
    const columns = [
        columnHelper.accessor((_, rowIndex) => rowIndex + 1, {
            id: "serial",
            header: "S/N",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("petName", {
            header: "Pet Name",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("category", {
            header: "Category",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("image", {
            header: "Image",
            cell: ({ row }) => (
                <img
                    src={row.original.image}
                    alt={row.original.name}
                    className="w-16 h-16 object-cover rounded"
                />
            ),
        }),
        columnHelper.accessor("adopted", {
            header: "Adoption Status",
            cell: ({ row }) =>
                row.original.adopted ? "Adopted" : "Not Adopted",
        }),
        columnHelper.display({
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <button
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                        onClick={() =>
                            navigate(`/update-pet/${row.original.id}`)
                        }
                    >
                        Update
                    </button>
                    <button
                        className="px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleDelete(row.original.id)}
                    >
                        Delete
                    </button>
                    <button
                        className="px-3 py-1 bg-green-500 text-white rounded"
                        onClick={() => handleAdopt(row.original.id)}
                    >
                        {row.original.adopted ? "Adopted" : "Adopt"}
                    </button>
                </div>
            ),
        }),
    ];

    // Functions for handling actions
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this pet?")) {
            axiosSecure.delete(`/pets/${id}`).then(() => {
                refetch(); // Refetch data after deletion
            });
        }
    };

    const handleAdopt = (id) => {
        axiosSecure.patch(`/pets/adopt/${id}`, { adopted: true }).then(() => {
            refetch(); // Refetch data after adoption
        });
    };

    // Table instance
    const table = useReactTable({
        data: pets,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <section>
            <HelmetTitle title="My Added Pets"></HelmetTitle>
            <div className="p-4">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="border border-gray-300 px-4 py-2 text-left cursor-pointer"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: " 🔼",
                                            desc: " 🔽",
                                        }[header.column.getIsSorted()] || null}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-100">
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="border border-gray-300 px-4 py-2"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </span>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MyAddPets;
