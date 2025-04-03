import { Suspense } from 'react';
import { VideoGrid } from '@/components/video/VideoGrid';
import { getVideos } from '@/lib/services/videoService';

export const revalidate = 60; // Revalidate at most once per minute

export default async function Home() {
  const videos = await getVideos();
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Recommended</h1>
      <Suspense fallback={<div>Loading videos...</div>}>
        <VideoGrid videos={videos} />
      </Suspense>
    </div>
  );
}