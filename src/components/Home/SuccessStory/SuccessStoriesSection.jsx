import SuccessStoriesHeader from "./SuccessStoriesHeader";
import StoryCard from "./StoryCard";

const stories = [
    {
        image: "https://d2zp5xs5cp8zlg.cloudfront.net/image-73010-800.jpg",
        name: "Bella the Brave",
        story: "Bella found a loving family after months in the shelter. She's now living her best life with her new siblings!",
    },
    {
        image: "https://hips.hearstapps.com/hmg-prod/images/sacred-birma-cat-in-interior-royalty-free-image-1718202855.jpg?crop=0.672xw:1.00xh;0.163xw,0&resize=980:*",
        name: "Milo's Miracle",
        story: "Milo was rescued and adopted by a kind-hearted person. His days are now filled with cuddles and treats.",
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe0nTo2mRr32mLwFZ3DTpYYobMv6hA0-P4g&s",
        name: "Luna's Leap",
        story: "Luna went from being a shy rabbit to the center of attention in her new home. She's thriving in her new life!",
    },
];

const SuccessStoriesSection = () => (
    <section id="success-stories" className="pb-20">
        <div className="xl:max-w-[1200px] max-w-[90%] mx-auto px-6">
        <SuccessStoriesHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
            <StoryCard key={index} {...story} />
            ))}
        </div>
        </div>
    </section>
);

export default SuccessStoriesSection;