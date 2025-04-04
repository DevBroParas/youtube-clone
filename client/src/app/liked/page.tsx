// src/app/liked/page.tsx
import { userService } from '@/lib/services/userService';
import { VideoGrid } from '@/components/video/VideoGrid';

export default async function LikedVideosPage() {
  const likedVideos = await userService.getLikedVideos();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Liked Videos</h1>
      <VideoGrid videos={likedVideos.map(l => l.video)} />
    </div>
  );
}
