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

const useDashNav = () => {
    const [dashNavOpen, setDashNavOpen] = useState(false);

    const navData = [
        { title: "Users", address: "/dashboard/users", icon: <FaUsers /> },
        { title: "All Pets", address: "/dashboard/all-pets", icon: <MdPets /> },
        { title: "All Donations", address: "/dashboard/all-donations", icon: <GiCoins /> },
        { title: "Add a pet", address: "/dashboard/add-pet", icon: <MdAddToPhotos /> },
        { title: "My added pets", address: "/dashboard/my-added-pets", icon: <FaAddressCard /> },
        { title: "Adoption Request", address: "/dashboard/adoption-request", icon: <VscGitPullRequestGoToChanges /> },
        { title: "Add Donation Campaign", address: "/dashboard/add-donation-campaign", icon: <GiCoins /> },
        { title: "My Donation Campaigns", address: "/dashboard/my-donation-campaign", icon: <BiSolidCoinStack /> },
        { title: "My Donations", address: "/dashboard/my-donations", icon: <BiDonateHeart /> },
    ];

    const dasNavItems = navData.map((item, index) => (
        <DashNavItem
            key={index}
            setDashNavOpen={setDashNavOpen}
            navTitle={item.title}
            address={item.address}
            icon={item.icon}
        />
    ));

    return [dasNavItems, dashNavOpen, setDashNavOpen];
};

export default useDashNav;