import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'; // Import Link for navigation
import { VideoWithUser } from '@/types';

interface Params {
    id: string;
}

interface Props {
    params: Params;
}

export default async function ChannelPage({ params }: Props) {
    const { id } = await params;

    let userData = null;
    let videos: VideoWithUser[] = [];
    let subscriberCount = 0;

    try {
        const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`;
        console.log("Fetching user data from:", apiURL);

        const response = await axios.get(apiURL);

        if (response.status === 200) {
            const data = response.data;
            userData = data.user;
            console.log("Avatar URL:", userData?.avatar);
            videos = data.videos;
            subscriberCount = data.subscriberCount;

            console.log("User data fetched successfully:", userData);
            console.log("Videos fetched successfully:", videos);
        } else {
            console.error("Failed to fetch user data. Status:", response.status);
            return <p className="text-center mt-10">User not found. (Status {response.status})</p>;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);

        if (axios.isAxiosError(error) && error.response) {
            console.error("Axios error details:", error.response.status, error.response.data);
        }
        return <p className="text-center mt-10">User not found. (Error during fetch)</p>;
    }

    if (!userData) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* User Profile Section */}
            <div className="flex items-center space-x-4 mb-6">
            <Image
                src={
                    userData.avatar && userData.avatar !== "default-avatar.png"
                        ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${userData.avatar.replace(/^(uploads\/|avatars\/)/g, '')}`
                        : `${process.env.NEXT_PUBLIC_API_URL}/uploads/avatars/default-avatar.png`
                }
                alt={`${userData.username}'s avatar`}
                width={80}
                height={80}
                className="rounded-full"
            />
                <div>
                    <h1 className="text-2xl font-bold">{userData.username}</h1>
                    <p className="text-gray-600">{userData.about || "No description available."}</p>
                    <p className="text-gray-600">Subscribers: {subscriberCount}</p>
                </div>
            </div>

            {/* Edit Button */}
            <div className="mb-6">
                <Link href={`/profile/${id}/update`}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Edit Profile
                    </button>
                </Link>
            </div>

            {/* User's Videos Section */}
            <h2 className="text-xl font-bold mb-4">Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <div key={video.id} className="video-card">
                            <Image
                                src={
                                    userData.avatar && userData.avatar !== "default-avatar.png"
                                        ? `${process.env.NEXT_PUBLIC_API_URL}/${userData.avatar.trim()}`
                                        : "/default-avatar.png" // Serve fallback from the public folder
                                }
                                alt={`${userData.username}'s avatar`}
                                width={80}
                                height={80}
                                className="rounded-full"
                            />
                            <h3 className="mt-2 text-lg font-medium">{video.title}</h3>
                            <p className="text-sm text-gray-600">{video.views} views</p>
                        </div>
                    ))
                ) : (
                    <p>No videos found for this user.</p>
                )}
            </div>
        </div>
    );
}