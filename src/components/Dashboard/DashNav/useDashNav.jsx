import { MdAddToPhotos } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa6";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { GiCoins } from "react-icons/gi";
import { BiDonateHeart } from "react-icons/bi";
import { BiSolidCoinStack } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { useState } from "react";
import DashNavItem from "@/Pages/Dashboard/DashNavItem";
import useRole from "@/Hooks/useRole";

const useDashNav = () => {
    const [dashNavOpen, setDashNavOpen] = useState(false);
    const [role] = useRole();

    const dasNavItems = <>
    
    {
        role === 'admin' && <>
            <DashNavItem 
            setDashNavOpen={setDashNavOpen} 
            navTitle="Users" 
            address="users" 
            icon={<FaUsers />}
            >
            </DashNavItem>
            
            <DashNavItem 
            setDashNavOpen={setDashNavOpen} 
            navTitle="All Pets" 
            address="/dashboard/all-pets" 
            icon={<MdPets />}
            >
            </DashNavItem>
            
            <DashNavItem 
            setDashNavOpen={setDashNavOpen} 
            navTitle="All Donations" 
            address="/dashboard/all-donations" 
            icon={<GiCoins />}
            >
            </DashNavItem>
        </>
    }
    
    <DashNavItem 
    setDashNavOpen={setDashNavOpen} 
    navTitle="Add a pet" 
    address="/dashboard/add-pet" 
    icon={<MdAddToPhotos />}
    >
    </DashNavItem>
    
    <DashNavItem 
    setDashNavOpen={setDashNavOpen} 
    navTitle="My added pets" 
    address="/dashboard/my-added-pets" 
    icon={<FaAddressCard />}
    >
    </DashNavItem>
    
    <DashNavItem 
    setDashNavOpen={setDashNavOpen} 
    navTitle="Adoption Request" 
    address="/dashboard/adoption-request" 
    icon={<VscGitPullRequestGoToChanges />}
    >
    </DashNavItem>
    
    <DashNavItem 
    setDashNavOpen={setDashNavOpen} 
    navTitle="Add Donation Campaign" 
    address="/dashboard/add-donation-campaign" 
    icon={<GiCoins />}
    >
    </DashNavItem>
    
    <DashNavItem 
    setDashNavOpen={setDashNavOpen} 
    navTitle="My Donation Campaigns" 
    address="/dashboard/my-donation-campaign" 
    icon={<BiSolidCoinStack />}
    >
    </DashNavItem>
    
    <DashNavItem 
    setDashNavOpen={setDashNavOpen} 
    navTitle="My Donations" 
    address="/dashboard/my-donations" 
    icon={<BiDonateHeart />}
    >
    </DashNavItem>

    </>

    return [dasNavItems, dashNavOpen, setDashNavOpen];
};

export default useDashNav;