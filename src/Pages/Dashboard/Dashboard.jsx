import DashNav from "@/components/Dashboard/DashNav/DashNav"
import { Outlet } from "react-router"

const Dashboard = () => {
    return (
        <section className="flex gap-5 max-w-[90%] xl:max-w-[1250px] mx-auto">
            
            <div className="border-r border-purple-500 min-h-screen w-[20%] px-3 hidden lg:block">
                <DashNav></DashNav>
            </div>

            <div className="lg:w-[77%] w-[90%] min-h-screen mx-auto pt-24 sticky top-0">
                <Outlet></Outlet>
            </div>

        </section>
    )
}

export default Dashboard
