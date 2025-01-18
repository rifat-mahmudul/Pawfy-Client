import FaqQuestion from "../shared/FaqQuestion"


const Faq = () => {

    return (
        <section className="pb-16 overflow-hidden">

            <div className="max-w-[90%] xl:max-w-[1200px] mx-auto">

                <h1 className="text-center text-4xl font-bold">Frequently Asked Question</h1>

                <div className="p-5 rounded-lg mt-5">

                        <FaqQuestion
                        question='What is Pawfy?'
                        ans='Pawfy is a dedicated platform that connects individuals looking to adopt pets with shelters and pet owners offering animals for adoption. We aim to help every pet find a loving and caring home.'
                        >
                        </FaqQuestion>

                        <div className="pt-4">
                            <FaqQuestion
                            question='How does the pet adoption process work?'
                            ans='Browse through our available pets. Then Select the pet you are interested in and submit an adoption request. Wait for the pet owner or shelter to review your request. Once approved, you can finalize the adoption and bring your new friend home!'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='Is there a fee for adopting a pet?'
                            ans='Adoption fees vary depending on the pet and the shelter or individual offering the adoption. These fees often cover vaccinations, microchipping, and spaying/neutering costs.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='What types of pets can I adopt on Pawfy?'
                            ans='Pawfy offers a variety of pets for adoption, including dogs, cats, rabbits, birds, and more. Availability depends on what local shelters and pet owners list on the platform.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='Do I need to meet any requirements to adopt a pet?'
                            ans='Requirements vary depending on the pet owner or shelter. Typically, they may require proof of a stable living environment, identification, and sometimes a reference or home visit to ensure the pet is going to a safe and loving home.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='Can I list a pet for adoption on Pawfy?'
                            ans='Yes, you can! Pawfy allows registered users to list pets for adoption. Simply create a profile, upload the pet’s details and photos, and start connecting with potential adopters.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='Are the pets vaccinated and spayed/neutered?'
                            ans='Most shelters and responsible pet owners ensure pets are vaccinated and spayed/neutered before adoption. However, always confirm these details when you inquire about a specific pet.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='What should I consider before adopting a pet?'
                            ans='Adopting a pet is a lifetime commitment. Consider the time, resources, and love you can provide. Also, make sure you choose a pet that fits your lifestyle and living situation.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='What if I can no longer take care of my adopted pet?'
                            ans='If circumstances change and you can no longer care for your pet, contact the shelter or previous owner for guidance. Pawfy also allows you to list pets for adoption responsibly if rehoming is necessary.'
                            >
                            </FaqQuestion>
                        </div>

                        <div className="pt-4">
                            <FaqQuestion
                            question='How can I contact Pawfy for support?'
                            ans='You can reach out to our support team through the "Contact Us" section on our website. We’re here to help with any questions or issues related to pet adoption.'
                            >
                            </FaqQuestion>
                        </div>

                </div>

            </div>

        </section>
    )
}

export default Faq
