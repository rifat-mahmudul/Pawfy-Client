import { Link } from "react-router";
import { FaFacebook } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";
import { FaInstagramSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-[90%] xl:max-w-[1200px] mx-auto">
                <div className=" px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                    <h3 className="text-xl font-semibold mb-4">About Pawfy</h3>
                    <p className="text-gray-300">
                        Pawfy is dedicated to connecting loving homes with pets in need.
                        Together, we can create a world where every pet is loved and cared
                        for.
                    </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul>
                        <li className="mb-2">
                        <a href="#aboutUs" className="text-gray-300 hover:text-white transition">
                            About Us
                        </a>
                        </li>
                        <li className="mb-2">
                        <Link to={'/pet-listing'} className="text-gray-300 hover:text-white transition">
                            Adopt a Pet
                        </Link>
                        </li>
                        <li className="mb-2">
                        <a
                            href="#success-stories"
                            className="text-gray-300 hover:text-white transition"
                        >
                            Success Stories
                        </a>
                        </li>
                    </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                    <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                    <p className="text-gray-300">
                        Have questions or want to learn more? Reach out to us!
                    </p>
                    <ul className="mt-4">
                        <li className="mb-2">
                        <span className="font-semibold">Email:</span>{" "}
                        <a
                            href="mailto:info@pawfy.com"
                            className="text-gray-300 hover:text-white transition"
                        >
                            info@pawfy.com
                        </a>
                        </li>
                        <li className="mb-2">
                        <span className="font-semibold">Phone:</span>{" "}
                        <a
                            href="tel:+1234567890"
                            className="text-gray-300 hover:text-white transition"
                        >
                            +1 234-567-890
                        </a>
                        </li>
                        <li className="mb-2">
                        <span className="font-semibold">Address:</span> 123 Pawfy Lane,
                        Pet City
                        </li>
                    </ul>
                    </div>

                    {/* Subscribe Section */}
                    <div>
                    <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
                    <p className="text-gray-300">Get updates on our latest pets and events.</p>
                    <form className="mt-4">
                        <input
                        type="email"
                        placeholder="Your email"
                        className="w-full p-2 rounded-lg text-gray-800 bg-inherit border border-purple-500 outline-none focus:border-2"
                        />
                        <button
                        type="submit"
                        className="mt-2 w-full bg-white text-purple-800 font-bold py-2 px-4 rounded-lg hover:bg-purple-500 hover:text-white transition"
                        >
                        Subscribe
                        </button>
                    </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-purple-600 pt-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Pawfy. All rights reserved.
                    </p>
                    <div className="flex gap-4 mt-4 lg:mt-0">
                        <a
                        href="https://web.facebook.com/mhrifat123"
                        className="text-gray-400 hover:text-white transition text-lg"
                        aria-label="Facebook"
                        >
                        <FaFacebook />
                        </a>
                        <a
                        href="https://x.com/rifat67661"
                        className="text-gray-400 hover:text-white transition text-lg"
                        aria-label="Twitter"
                        >
                        <IoLogoTwitter />
                        </a>
                        <a
                        href="https://www.instagram.com/mahmudulhasan3891"
                        className="text-gray-400 hover:text-white transition text-lg"
                        aria-label="Instagram"
                        >
                        <FaInstagramSquare />
                        </a>
                        <a
                        href="https://github.com/rifat-mahmudul"
                        className="text-gray-400 hover:text-white transition text-lg"
                        aria-label="Instagram"
                        >
                        <FaGithub />
                        </a>
                    </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
