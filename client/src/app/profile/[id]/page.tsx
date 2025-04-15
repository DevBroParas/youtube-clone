import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { VideoWithUser } from '@/types';
import getAvatarSrc from '@/lib/avatar';
import getThumbnailSrc from '@/lib/thumbnail';

interface Params {
    id: string;
}

interface Props {
    params: Params;
}

export default async function ChannelPage({ params }: Props) {
    const { id } = params;

    let userData = null;
    let videos: VideoWithUser[] = [];
    let subscriberCount = 0;

    try {
        const apiURL = `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`;
        const response = await axios.get(apiURL);

        if (response.status === 200) {
            const data = response.data;
            userData = data.user;
            videos = data.videos;
            subscriberCount = data.subscriberCount;
        } else {
            return (
                <p className="text-center mt-10">
                    User not found. (Status {response.status})
                </p>
            );
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return (
            <p className="text-center mt-10">
                User not found. (Error during fetch)
            </p>
        );
    }

    if (!userData) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* User Info Section */}
            <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden">
                    <Image
                        src={getAvatarSrc(userData.avatar)}
                        alt={`${userData.username}'s avatar`}
                        width={80}
                        height={80}
                        className="object-cover"
                    />
                </div>

                <div>
                    <h1 className="text-2xl font-bold">{userData.username}</h1>
                    <p className="text-gray-600">
                        {userData.about || 'No description available.'}
                    </p>
                    <p className="text-gray-600">
                        Subscribers: {subscriberCount}
                    </p>
                </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mb-6">
                <Link href={`/profile/${id}/update`}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Edit Profile
                    </button>
                </Link>
            </div>

            {/* Video Grid Section */}
            <h2 className="text-xl font-bold mb-4">Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <div
                            key={video.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <Link href={`/watch/${video.id}`} className="block">
                                <div className="relative w-full h-48 sm:h-40 md:h-36 lg:h-44 bg-gray-200 rounded-lg overflow-hidden">
                                    <Image
                                        src={getThumbnailSrc(video.thumbnail)}
                                        alt={video.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex mt-2 gap-2 px-2 pb-2">
                                    {video.user?.avatar && (
                                        <Image
                                            src={getAvatarSrc(
                                                video.user.avatar
                                            )}
                                            alt={video.user.username}
                                            width={36}
                                            height={36}
                                            className="rounded-full"
                                        />
                                    )}
                                    <div>
                                        <h3 className="text-sm font-semibold line-clamp-2">
                                            {video.title}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            {video.user?.username || 'User'}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {video.views} views
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">
                        No videos found for this user.
                    </p>
                )}
            </div>
        </div>
    );
}
