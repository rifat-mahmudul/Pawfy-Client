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
import PrivateRoute from "./PrivateRoute";


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
                <Route path="/dashboard" element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}>
                    <Route path="/dashboard/add-pet" element={<PrivateRoute><AddPet></AddPet></PrivateRoute>}></Route>
                    <Route path="/dashboard/my-added-pets" element={<PrivateRoute><MyAddPets></MyAddPets></PrivateRoute>}></Route>
                    <Route path="/dashboard/adoption-request" element={<PrivateRoute><AdoptionRequest></AdoptionRequest></PrivateRoute>}></Route>
                    <Route path="/dashboard/add-donation-campaign" element={<PrivateRoute><AddDonationCampaign></AddDonationCampaign></PrivateRoute>}></Route>
                    <Route path="/dashboard/my-donation-campaign" element={<MyDonationCampaigns></MyDonationCampaigns>}></Route>
                    <Route path="/dashboard/my-donations" element={<PrivateRoute><MyDonations></MyDonations></PrivateRoute>}></Route>
                    <Route path="/dashboard/users" element={<PrivateRoute><AllUser></AllUser></PrivateRoute>}></Route>
                    <Route path="/dashboard/all-pets" element={<PrivateRoute><AllPets></AllPets></PrivateRoute>}></Route>
                    <Route path="/dashboard/all-donations" element={<PrivateRoute><AllDonations></AllDonations></PrivateRoute>}></Route>
                </Route>

            </Route>

        </Routes>
    )
}

export default AppRoutes
