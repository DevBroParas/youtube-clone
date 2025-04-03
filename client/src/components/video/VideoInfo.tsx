import React from 'react';
import { VideoWithUser } from '@/types';

interface VideoInfoProps {
  video: VideoWithUser;
}

export function VideoInfo({ video }: VideoInfoProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{video.title}</h1>
      <p className="text-gray-600">{video.description}</p>
      <div className="flex items-center justify-between">
        <span>{video.views} views</span>
        <span>{new Date(video.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
