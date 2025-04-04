// src/app/profile/[userId]/page.tsx

import axios from 'axios';
import Image from 'next/image';

// Define VideoWithUser interface
interface VideoWithUser {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    userId: string;
    views: number;
    createdAt: string;
    // Add other video properties as needed
}

interface Params {
    userId: string;
}

interface Props {
    params: Params;
}

export default async function ChannelPage({ params }: Props) {
    const { userId } = params; // ✅ Correctly using params.id
    console.log("ID received:", userId);

    let userData = null;
    let videos: VideoWithUser[] = []; // ✅ Type as array of VideoWithUser
    let subscriberCount = 0;

    try {
        const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`;
        console.log("API URL:", apiURL);

        const response = await axios.get(apiURL);

        if (response.status === 200) {
            const data = response.data;  // ✅ Extract full response object
            userData = data.user;         // ✅ Extract user data correctly
            videos = data.videos || [];   // ✅ Ensure videos are an array (default to empty array)
            subscriberCount = data.subscriberCount;
            console.log("User data:", userData);
        } else {
            console.error("Request failed with status:", response.status);
            return <p className="text-center mt-10">User not found. (Status {response.status})</p>;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);

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
            <h1 className="text-xl font-bold mb-4">{userData.username}&apos;s Channel</h1>
            <p>{userData.about}</p>
            <p>Subscribers: {subscriberCount}</p>

            {/* Render user's videos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {videos.length > 0 ? (
                    videos.map((video: VideoWithUser) => (
                        <div key={video.id} className="video-card">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/${video.thumbnail}`}
                                alt={video.title}
                                width={300}
                                height={200}
                                className="rounded-lg"
                                onError={() => console.log(`Failed to load image for ${video.title}`)} // Debug broken images
                            />
                            <h2>{video.title}</h2>
                        </div>
                    ))
                ) : (
                    <p>No videos found for this user.</p>
                )}
            </div>
        </div>
    );
}
