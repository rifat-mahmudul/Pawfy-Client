import { Routes, Route } from "react-router";
import Main from "../Layout/Main";
import Home from "../Pages/Main/Home/Home";
import Login from "../Pages/Main/Authentication/Login";


const AppRoutes = () => {
    return (
        <Routes>
            
            <Route path="/" element={<Main></Main>}>

                {/* all nested routes here */}
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>

            </Route>

        </Routes>
    )
}

export default AppRoutes
