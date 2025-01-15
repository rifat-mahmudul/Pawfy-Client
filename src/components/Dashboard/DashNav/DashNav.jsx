import useDashNav from "./useDashNav";

const DashNav = () => {

    const [dasNavItems] = useDashNav();

    return (
        <section className="pt-24 sticky top-0 z-40">
            
            <div className="text-center">
                {dasNavItems}
            </div>

        </section>
    )
}



export default DashNav
