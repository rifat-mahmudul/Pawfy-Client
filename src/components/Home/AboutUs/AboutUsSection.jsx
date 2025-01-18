import AboutUsHeader from "./AboutUsHeader";
import AboutUsText from "./AboutUsText";
import AboutUsImage from "./AboutUsImage";

const AboutUsSection = () => (
    <section className="pb-20 pt-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <AboutUsHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <AboutUsText />
            <AboutUsImage />
        </div>
        </div>
    </section>
);

export default AboutUsSection;