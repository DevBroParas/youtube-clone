'use client';

import { useState, useEffect } from 'react';
import { getRelatedVideos } from '@/lib/services/videoService';
import Link from 'next/link';

interface RelatedVideosProps {
    currentVideoId: string;
}

export const RelatedVideos: React.FC<RelatedVideosProps> = ({ currentVideoId }) => {
    const [relatedVideos, setRelatedVideos] = useState<any[]>([]);

    useEffect(() => {
        const fetchRelatedVideos = async () => {
            const videos = await getRelatedVideos(currentVideoId);
            setRelatedVideos(videos);
        };

        fetchRelatedVideos();
    }, [currentVideoId]);

    return (
        <div>
            {relatedVideos.length > 0 ? (
                relatedVideos.map((video) => (
                    <div key={video.id} className="mb-4">
                        <Link href={`/video/${video.id}`}>
                            <a className="flex items-center space-x-4">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-24 h-14 object-cover rounded"
                                />
                                <div>
                                    <h4 className="text-sm font-medium">{video.title}</h4>
                                    <p className="text-xs text-gray-500">{video.user.username}</p>
                                </div>
                            </a>
                        </Link>
                    </div>
                ))
            ) : (
                <p className="text-sm text-gray-500">No related videos found.</p>
            )}
        </div>
    );
};