import DashNavItem from "@/Pages/Dashboard/DashNavItem"
import { MdAddToPhotos } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa6";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { GiCoins } from "react-icons/gi";
import { BiDonateHeart } from "react-icons/bi";
import { BiSolidCoinStack } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdPets } from "react-icons/md";

const DashNav = () => {

    const navItems = <>
        <DashNavItem navTitle="Users" address="users" icon={<FaUsers></FaUsers>}></DashNavItem>
        <DashNavItem navTitle="All Pets" address="all-pets" icon={<MdPets></MdPets>}></DashNavItem>
        <DashNavItem navTitle="All Donations " address="all-donations" icon={<GiCoins></GiCoins>}></DashNavItem>
        <DashNavItem navTitle="Add a pet" address="add-pet" icon={<MdAddToPhotos></MdAddToPhotos>}></DashNavItem>
        <DashNavItem navTitle="My added pets" address="my-added-pets" icon={<FaAddressCard></FaAddressCard>}></DashNavItem>
        <DashNavItem navTitle="Adoption Request" address="adoption-request" icon={<VscGitPullRequestGoToChanges></VscGitPullRequestGoToChanges>}></DashNavItem>
        <DashNavItem navTitle="Add Donation Campaign" address="add-donation-campaign" icon={<GiCoins></GiCoins>}></DashNavItem>
        <DashNavItem navTitle="My Donation Campaigns" address="my-donation-campaign" icon={<BiSolidCoinStack></BiSolidCoinStack>}></DashNavItem>
        <DashNavItem navTitle="My Donations" address="my-donations" icon={<BiDonateHeart></BiDonateHeart>}></DashNavItem>
        
    </>

    return (
        <section className="pt-24 sticky top-0 z-40">
            
            <div className="text-center">
                {navItems}
            </div>

        </section>
    )
}



export default DashNav
