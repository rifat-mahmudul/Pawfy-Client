import { useState } from "react";

const AboutUsImage = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
        className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        >
        <img
            src="https://img.freepik.com/premium-photo/cute-dog-watches-as-two-lovers-cats_1034910-4407.jpg?w=996"
            alt="Pet adoption joy"
            className={`w-full h-96 object-cover transition-transform ${
            hovered ? "scale-110" : "scale-100"
            }`}
        />
        {hovered && (
            <div className="absolute inset-0 bg-purple-700 bg-opacity-40 flex items-center justify-center text-white font-semibold text-xl">
            Creating Bonds, One Paw at a Time
            </div>
        )}
        </div>
    );
};

export default AboutUsImage;
