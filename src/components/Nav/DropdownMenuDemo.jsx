import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";

export function DropdownMenuDemo() {
    const { user, logOut, setLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || "/";

    const handleLogOut = async () => {
        try {
            await logOut();
            toast.success("Log out successful");
            navigate(from);
        } catch (error) {
            toast.error(`Log out failed. Please try again. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-12 w-12 flex flex-col items-center">
                    <img className="h-10 w-10 rounded-full" src={user?.photoURL} alt="User Avatar" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <Link to={'/dashboard'}>
                    <DropdownMenuItem>
                        <button className="mx-auto text-lg">Dashboard</button>
                    </DropdownMenuItem>
                </Link>
                <Link to={'/profile'}>
                <DropdownMenuItem>
                    <button className="mx-auto text-lg">My Profile</button>
                </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                    <button onClick={handleLogOut} className="mx-auto text-lg">
                        Log out
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
