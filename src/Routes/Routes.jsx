import { Routes, Route } from "react-router";
import Main from "../Layout/Main";
import Home from "../Pages/Main/Home/Home";
import Login from "../Pages/Main/Authentication/Login";
import PetListing from "../Pages/Main/PetListing";
import DonationCampaign from "../Pages/DonationCampaign";
import Register from "@/Pages/Main/Authentication/Register";
import Dashboard from "@/Pages/Dashboard/Dashboard";
import AddPet from "@/Pages/Dashboard/AddPet";
import MyAddPets from "@/Pages/Dashboard/MyAddPets";
import AdoptionRequest from "@/Pages/Dashboard/AdoptionRequest";
import AddDonationCampaign from "@/Pages/Dashboard/AddDonationCampaign";
import MyDonationCampaigns from "@/Pages/Dashboard/MyDonationCampaigns";
import MyDonations from "@/Pages/Dashboard/MyDonations";
import AllUser from "@/Pages/Dashboard/AllUser";
import AllPets from "@/Pages/Dashboard/AllPets";
import AllDonations from "@/Pages/Dashboard/AllDonations";


const AppRoutes = () => {
    return (
        <Routes>
            
            <Route path="/" element={<Main></Main>}>

                {/* all nested routes here */}
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/register" element={<Register></Register>}></Route>
                <Route path="pet-listing" element={<PetListing></PetListing>}></Route>
                <Route path="donation-campaign" element={<DonationCampaign></DonationCampaign>}></Route>


                {/* dashboard layout */}
                <Route path="/dashboard" element={<Dashboard></Dashboard>}>
                    <Route path="add-pet" element={<AddPet></AddPet>}></Route>
                    <Route path="my-added-pets" element={<MyAddPets></MyAddPets>}></Route>
                    <Route path="adoption-request" element={<AdoptionRequest></AdoptionRequest>}></Route>
                    <Route path="add-donation-campaign" element={<AddDonationCampaign></AddDonationCampaign>}></Route>
                    <Route path="my-donation-campaign" element={<MyDonationCampaigns></MyDonationCampaigns>}></Route>
                    <Route path="my-donations" element={<MyDonations></MyDonations>}></Route>
                    <Route path="users" element={<AllUser></AllUser>}></Route>
                    <Route path="all-pets" element={<AllPets></AllPets>}></Route>
                    <Route path="all-donations" element={<AllDonations></AllDonations>}></Route>
                </Route>

            </Route>

        </Routes>
    )
}

export default AppRoutes
