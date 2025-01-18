import Banner from "@/components/Home/Banner"
import HelmetTitle from "../../../Shared/HelmetTitle"
import PetsCategory from "@/components/Home/PetsCategory"
import { Outlet } from "react-router"

const Home = () => {
    return (
        <section>

            <HelmetTitle title={'Home'}></HelmetTitle>
            
            <Banner></Banner>
            <PetsCategory></PetsCategory>
            <div>
                <Outlet></Outlet>
            </div>

        </section>
    )
}

export default Home
