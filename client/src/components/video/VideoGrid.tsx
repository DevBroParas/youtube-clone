import { VideoCard } from './VideoCard';
import { VideoWithUser } from '@/types';

interface VideoGridProps {
  videos: VideoWithUser[];
}

export function VideoGrid({ videos }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600">No videos found</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}