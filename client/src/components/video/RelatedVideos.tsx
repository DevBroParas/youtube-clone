'use client';

import { useState, useEffect } from 'react';
import { getRelatedVideos } from '@/lib/services/videoService';
import Link from 'next/link';
import Image from 'next/image';

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
                        <Link href={`/video/${video.id}`} className="flex items-center space-x-4">
                        <Image
    src={`${process.env.NEXT_PUBLIC_API_URL}/${video.thumbnail}`} // Prepend base URL for relative paths
    alt={video.title || 'Video thumbnail'}
    className="w-24 h-14 object-cover rounded"
    width={96}
    height={56}
/>
                            <div>
                                <h4 className="text-sm font-medium">{video.title}</h4>
                                <p className="text-xs text-gray-500">{video.user.username}</p>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <p className="text-sm text-gray-500">No related videos found.</p>
            )}
        </div>
    );
};