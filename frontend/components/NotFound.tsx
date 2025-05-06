import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <div className="bg-gradient-to-tr from-gray-100 to-white shadow-xl rounded-2xl p-10 max-w-md w-full">
                <div className="flex justify-center items-center mb-6">
                    <Ghost className="w-16 h-16 text-red-500 animate-pulse" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops! Nothing here...</h1>
                <p className="text-gray-500 mb-6">
                    We couldn't find what you were looking for. The content might be missing or the link is broken.
                </p>
                <Link href="/">
                    <Button className="px-6 py-3 text-lg rounded-xl hover:scale-105 transition-transform">
                        Go back home
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
