import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = () => {
    return (
        <div style={{ padding: "20px" }}>
        {/* Example of a simple skeleton layout */}
            <Skeleton height={40} width={200} style={{ marginBottom: "20px" }} />
            <Skeleton count={3} height={20} width={"80%"} style={{ marginBottom: "10px" }} />
            <Skeleton height={300} width={"100%"} style={{ marginTop: "20px" }} />
        </div>
    );
};

export default SkeletonLoader;
