/* eslint-disable react/prop-types */
const StoryCard = ({ image, name, story }) => (
    <div className="overflow-hidden rounded-lg shadow-lg bg-inherit">
        <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover transition-transform hover:scale-105"
        />
        <div className="p-6">
            <h3 className="text-2xl font-semibold text-purple-700 mb-3">{name}</h3>
            <p className="text-gray-500">{story}</p>
        </div>
        </div>
);

export default StoryCard;