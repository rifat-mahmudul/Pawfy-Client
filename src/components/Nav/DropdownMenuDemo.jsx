import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuth from "@/Hooks/useAuth"

export function DropdownMenuDemo() {

    const {user} = useAuth();

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="h-10 w-10 rounded-full">
                <img className="h-10 w-10 rounded-full" src={user?.photoURL} alt="" />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">

            <DropdownMenuItem>
                <button className="mx-auto text-lg">
                    Dashboard
                </button>
            </DropdownMenuItem>

            <DropdownMenuItem>
                <button className="mx-auto text-lg">
                    My Profile
                </button>
            </DropdownMenuItem>
        
            <DropdownMenuItem>
                <button className="mx-auto text-lg">
                    Log out
                </button>
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}