import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import HelmetTitle from "@/Shared/HelmetTitle";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getSortedRowModel } from "@tanstack/react-table";
import { FaPencil } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";


const MyAddPets = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: pets = [] } = useQuery({
        queryKey: ["pets"],
        queryFn: async () => {
            const { data } = await axiosSecure(`/pets/${user?.email}`);
            return data;
        },
    });

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
        columnHelper.accessor('petName', {
            header : () => (<p className="text-center">Pet Name</p>),
            cell : (info) => info.getValue()
        }),
        columnHelper.accessor('category', {
            header : () => (<p className="text-center">Category</p>),
            cell : (info) => info.getValue()
        }),
        columnHelper.accessor('adopted', {
            header : () => (<p className="text-center">Status</p>),
            cell : (info) => 
                (info.getValue() ?
                    <p className="bg-purple-300 text-center py-2 rounded-lg text-purple-900 font-bold">Adopted</p> : 
                    <p className="bg-purple-300 text-center py-2 rounded-lg text-purple-900 font-bold">Not Adopted</p>
                )
        }),
        columnHelper.display({
            id: "actions",
            header: () => <p className="text-center">Actions</p>,
            cell : () => (
                <div className="flex gap-2 justify-around items-center">
                    <button
                        className="p-3 bg-[#0000ff64] text-white rounded"
                    >
                        <div className="text-lg text-[blue]">
                            <FaPencil></FaPencil>
                        </div>
                    </button>
                    <button
                        className="p-3 bg-[#ff00003f] text-white rounded"
                    >
                        <div className="text-xl text-[red]">
                            <MdDeleteForever></MdDeleteForever>
                        </div>
                    </button>
                    <button
                        className="p-2 bg-green-500 text-white rounded font-bold"
                    >
                        Adopt
                    </button>
                    
                </div>
            )
        })
    ]
    
    const table = useReactTable({
        data : pets,
        columns,
        getCoreRowModel : getCoreRowModel(),
        getSortedRowModel : getSortedRowModel()
    })


    return (
        <section>
            <HelmetTitle title="My Added Pets"></HelmetTitle>

            <div>

                <table className="border border-purple-500 w-full rounded-lg text-center">
                    <thead className="text-center">
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
                        {
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {
                                        row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="border border-purple-300 px-4 py-2">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>

        </section>
    );
};

export default MyAddPets;
