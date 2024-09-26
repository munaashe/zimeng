import Container from "@/components/ui-components/containter";

export const SkeletonLoader = () => {
    return (
        <Container className="min-h-[70vh] mb-4 md:mb-12">
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-4">
                <div className="md:col-span-5 space-y-8">
                    <div className="w-1/2 h-20 bg-gray-300 rounded-md mb-4 animate-pulse"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="">
                                <div className="bg-gray-1 hover:bg-gray-2 relative p-4 mb-4 animate-pulse">
                                    <div className="flex justify-between items-center w-full mb-4">
                                        <div className="w-3/4 h-6 bg-gray-300 rounded-md animate-pulse"></div>
                                        <div className="w-1/4 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                    </div>
                                    <div className="flex justify-start items-center gap-4 mb-4">
                                        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                        <div className="w-1/2 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                    </div>
                                    <div className="flex justify-start items-center gap-4 mb-4">
                                        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                        <div className="w-1/2 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                    </div>
                                    <div className="flex justify-start items-center gap-4 mb-4">
                                        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                                        <div className="w-1/2 h-4 bg-gray-300 rounded-md animate-pulse"></div>
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-gray-300 text-transparent px-2 py-1 text-[14px] w-16 h-6 rounded-md animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hidden md:block md:col-span-2">
                    <div className="space-y-4">
                        <div className="w-full h-60 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-full h-60 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-full h-60 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </Container>
    );
};