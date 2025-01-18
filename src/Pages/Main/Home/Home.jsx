import Banner from "@/components/Home/Banner"
import HelmetTitle from "../../../Shared/HelmetTitle"
import PetsCategory from "@/components/Home/PetsCategory"
import { Outlet } from "react-router"
import Faq from "@/components/Home/Faq"
import CallToAction from "@/components/Home/CallToAction"

const Home = () => {
    return (
        <section>

            <HelmetTitle title={'Home'}></HelmetTitle>
            
            <Banner></Banner>
            <PetsCategory></PetsCategory>
            <div>
                <Outlet></Outlet>
            </div>
            <CallToAction></CallToAction>
            <Faq></Faq>

        </section>
    )
}

export default Home
