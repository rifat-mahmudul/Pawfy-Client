import Banner from "@/components/Home/Banner"
import HelmetTitle from "../../../Shared/HelmetTitle"
import PetsCategory from "@/components/Home/PetsCategory"
import { Outlet } from "react-router"
import Faq from "@/components/Home/Faq"
import CallToAction from "@/components/Home/CallToAction"
import AboutUsSection from "@/components/Home/AboutUs/AboutUsSection"
import SuccessStoriesSection from "@/components/Home/SuccessStory/SuccessStoriesSection"
import Footer from "@/components/Home/Footer"

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
            <AboutUsSection></AboutUsSection>
            <SuccessStoriesSection></SuccessStoriesSection>
            <Faq></Faq>
            <Footer></Footer>

        </section>
    )
}

export default Home
