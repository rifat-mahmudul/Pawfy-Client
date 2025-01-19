import { Routes, Route, Navigate } from "react-router";
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
import AdminRoute from "./AdminRoute";
import UpdatePets from "@/Pages/Dashboard/UpdatePets";
import PetDetails from "@/Pages/Main/PetDetails";
import Cat from "@/components/category/Cat";
import Bird from "@/components/category/Bird";
import Rabbit from "@/components/category/Rabbit";
import Fish from "@/components/category/Fish";
import Dog from "@/components/category/Dog";
import CampaignDetails from "@/Pages/Main/CampaignDetails";

const AppRoutes = () => {

    return (
        <Routes>
            
            <Route path="/" element={<Main></Main>}>

                <Route path="/" element={<Home></Home>}>

                    {/* category nested route */}
                    <Route path="/" element={<Cat></Cat>}></Route>
                    <Route path="dog" element={<Dog></Dog>}></Route>
                    <Route path="bird" element={<Bird></Bird>}></Route>
                    <Route path="rabbit" element={<Rabbit></Rabbit>}></Route>
                    <Route path="fish" element={<Fish></Fish>}></Route>
                
                </Route>


                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/register" element={<Register></Register>}></Route>
                <Route path="/pet-listing" element={<PetListing></PetListing>}></Route>
                <Route path="/pet-details/:id" element={<PetDetails></PetDetails>}></Route>
                <Route path="/campaign-details/:id" element={<CampaignDetails></CampaignDetails>}></Route>
                <Route path="/donation-campaign" element={<DonationCampaign></DonationCampaign>}></Route>


                {/* dashboard layout */}
                <Route path="/dashboard" element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}>

                    <Route index element={<Navigate to="users" replace />} />

                    {/* admin route only */}
                    <Route path="users" element={<PrivateRoute><AdminRoute><AllUser></AllUser></AdminRoute></PrivateRoute>}></Route>
                    <Route path="/dashboard/all-pets" element={<PrivateRoute><AdminRoute><AllPets></AllPets></AdminRoute></PrivateRoute>}></Route>
                    <Route path="/dashboard/all-donations" element={<PrivateRoute><AdminRoute><AllDonations></AllDonations></AdminRoute></PrivateRoute>}></Route>

                    {/* user's route only */}
                    <Route path="/dashboard/add-pet" element={<PrivateRoute><AddPet></AddPet></PrivateRoute>}></Route>
                    <Route path="/dashboard/update-pet/:id" element={<PrivateRoute><UpdatePets></UpdatePets></PrivateRoute>}></Route>
                    <Route path="/dashboard/my-added-pets" element={<PrivateRoute><MyAddPets></MyAddPets></PrivateRoute>}></Route>
                    <Route path="/dashboard/adoption-request" element={<PrivateRoute><AdoptionRequest></AdoptionRequest></PrivateRoute>}></Route>
                    <Route path="/dashboard/add-donation-campaign" element={<PrivateRoute><AddDonationCampaign></AddDonationCampaign></PrivateRoute>}></Route>
                    <Route path="/dashboard/my-donation-campaign" element={<MyDonationCampaigns></MyDonationCampaigns>}></Route>
                    <Route path="/dashboard/my-donations" element={<PrivateRoute><MyDonations></MyDonations></PrivateRoute>}></Route>

                </Route>

            </Route>

        </Routes>
    )
}

export default AppRoutes
