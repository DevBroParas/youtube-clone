'use client';
import React from 'react';
import { VideoWithUser } from '@/types';
import { VideoCard } from './VideoCard';

interface RelatedVideosProps {
  currentVideoId: string;
}

export function RelatedVideos({ currentVideoId }: RelatedVideosProps) {
  const [relatedVideos, setRelatedVideos] = React.useState<VideoWithUser[]>([]);

  React.useEffect(() => {
    // Fetch related videos (replace with your service function)
    const fetchRelatedVideos = async () => {
      // Example API call for related videos
      const response = await fetch(`/api/videos/related?videoId=${currentVideoId}`);
      const data = await response.json();
      setRelatedVideos(data.videos);
    };

    fetchRelatedVideos();
  }, [currentVideoId]);

  return (
    <div>
      {relatedVideos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}