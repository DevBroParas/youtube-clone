import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getVideoById } from '@/lib/services/videoService';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { VideoInfo } from '@/components/video/VideoInfo';
import { CommentSection } from '@/components/video/CommentSection';
import { RelatedVideos } from '@/components/video/RelatedVideos';

interface VideoPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: VideoPageProps) {
  const video = await getVideoById(params.id);
  
  if (!video) {
    return {
      title: 'Video Not Found',
    };
  }
  
  return {
    title: `${video.title} - YouTube Clone`,
    description: video.description || `Watch ${video.title} on YouTube Clone`,
  };
}

export default async function VideoPage({ params }: VideoPageProps) {
  const video = await getVideoById(params.id);
  
  if (!video) {
    notFound();
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-8/12 lg:pr-6">
          <VideoPlayer videoUrl={video.url} title={video.title} />
          <VideoInfo video={video} />
          
          <Suspense fallback={<div>Loading comments...</div>}>
            <CommentSection videoId={video.id} />
          </Suspense>
        </div>
        
        <div className="lg:w-4/12 mt-6 lg:mt-0">
          <h3 className="text-lg font-medium mb-4">Related Videos</h3>
          <Suspense fallback={<div>Loading related videos...</div>}>
            <RelatedVideos currentVideoId={video.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}