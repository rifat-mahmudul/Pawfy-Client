import DashNav from "@/components/Dashboard/DashNav/DashNav";
import { Outlet } from "react-router";

const Dashboard = () => {
    return (
        <section className="flex gap-5 max-w-[90%] xl:max-w-[1250px] mx-auto ">
            
            {/* Sidebar */}
            <div className=" w-[20%]  hidden lg:flex flex-col sticky top-0 h-screen overflow-auto scrollbar-thin scrollbar-track-purple-200 scrollbar-thumb-purple-400 ">
                <DashNav />
            </div>

            {/* Content Section */}
            <div className="lg:w-[77%] w-[90%] min-h-screen mx-auto pt-24 ">
                <Outlet />
            </div>

        </section>
    );
};

export default Dashboard;
