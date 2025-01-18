import { Link } from 'react-router';
import dogFamily from '../../assets/dog-family.jpg'

const CallToAction = () => {
    return (
        <section className="relative bg-gray-100 py-16 mb-16 mt-4">
            <div className="max-w-[1200px] xl:max-w-[90%] mx-auto">
                {/* Background Images */}
                <div
                className="absolute inset-0 bg-[#0000005f] bg-blend-overlay"
                style={{
                    backgroundImage: `url(${dogFamily})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment : "fixed"
                }}
                ></div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800 opacity-60"></div>

                {/* Content */}
                <div className="relative z-10 max-w-5xl mx-auto text-center text-white px-6">
                    <h1 className="text-4xl font-bold md:text-5xl">Open Your Heart, Transform a Life</h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300">
                    Every pet deserves a loving home and a second chance at happiness. By adopting, you’re
                    not just gaining a loyal companion—you’re giving them the life they deserve.
                    </p>

                    <div className="mt-8 flex justify-center gap-4">
                    <Link
                        to={'/pet-listing'}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 transition text-white rounded-lg font-semibold text-lg"
                    >
                        Find Your Companion
                    </Link>
                    <Link
                        to={'#about'}
                        className="px-6 py-3 bg-white text-purple-600 hover:text-purple-700 hover:bg-gray-200 transition rounded-lg font-semibold text-lg"
                    >
                        Learn About Adoption Benefits
                    </Link>
                    </div>
                </div>

                {/* Additional Images */}
                <div className="relative mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
                    {[
                        {
                        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZWFrqx-Bki-5zzx-JiXlq3kwoy6XbKn1Aug&s",
                        alt: "Family hugging dog",
                        caption: "A warm embrace for a loving friend.",
                        },
                        {
                        src: "https://st4.depositphotos.com/3243153/24763/i/450/depositphotos_247638260-stock-photo-child-playing-with-cat-at.jpg",
                        alt: "Child playing with kitten",
                        caption: "Pure joy with a playful kitten.",
                        },
                        {
                        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy39ATLPXxU5VHXhwWOTJox-RbbKPw-VBZrA&s",
                        alt: "Owner cuddling rescued pet",
                        caption: "A rescued pet finds love and care.",
                        },
                    ].map((item, index) => (
                        <div
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-lg group transform transition-all hover:scale-105 hover:shadow-2xl"
                        >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                            style={{ backgroundImage: `url(${item.src})` }}
                        ></div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>

                        {/* Caption */}
                        <div className="relative z-10 flex items-center justify-center h-64">
                            <p className="text-white text-lg md:text-xl lg:text-2xl font-semibold text-center px-6 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                            {item.caption}
                            </p>
                        </div>
                        </div>
                    ))}
                    </div>

            </div>
        </section>
    );
};

export default CallToAction;
