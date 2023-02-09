const Skeleton = ({ times }) => {
    return Array(times)
        .fill(0)
        .map((_, index) => {
            return <div className="flex flex-col items-center mt-4">
                <div key={index} className="border w-72 h-12 rounded-md relative overflow-hidden bg-gray-100">
                    <div className="animate-shimmer absolute inset-0 -translate-x-full
                                    bg-gradient-to-r from-gray-100 via-white to-gray-100"/>
                </div>
            </div>;
        });
};

export default Skeleton;