'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import getAvatarSrc from '@/lib/avatar';


interface Channel {
    id: string;
    username: string;
    avatar: string;
    about: string;
}

export default function SubscriptionsPage() {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubscribedChannels = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/users/subscriptions`,
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    setChannels(response.data.channels);
                } else {
                    setError("Failed to fetch subscribed channels.");
                }
            } catch (error: any) {
                console.error("Error fetching subscribed channels:", error.response?.data?.message || error.message);
                setError("Failed to fetch subscribed channels.");
            } finally {
                setLoading(false);
            }
        };

        fetchSubscribedChannels();
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Subscribed Channels</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {channels.length > 0 ? (
                    channels.map((channel) => (
                        <div key={channel.id} className="channel-card border p-4 rounded-lg shadow-sm">
                            <div className="flex items-center space-x-4">
                            <Image
                                src={getAvatarSrc(channel.avatar)}
                                alt={`${channel.username}'s avatar`}
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                                <div>
                                    <h2 className="text-lg font-bold">{channel.username}</h2>
                                    <p className="text-sm text-gray-600">{channel.about || 'No description available.'}</p>
                                </div>
                            </div>
                            <Link href={`/profile/${channel.id}`}>
                                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    Visit Channel
                                </button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-3">You are not subscribed to any channels.</p>
                )}
            </div>
        </div>
    );
}