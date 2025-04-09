import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getVideoById } from '@/lib/services/videoService';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { VideoInfo } from '@/components/video/VideoInfo';
import { CommentSection } from '@/components/video/CommentSection';
import { RelatedVideos } from '@/components/video/RelatedVideos';
import LikeButton from '@/components/video/LikeButton';
import SubscribeButton from '@/components/video/SubscribeButton'; // Import SubscribeButton

interface VideoPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: VideoPageProps) {
  const { id } =await params;
  const video = await getVideoById(id);

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
  const { id } =await params;
  const video = await getVideoById(id);

  if (!video) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-8/12 lg:pr-6">
          {/* Video Player */}
          <VideoPlayer videoUrl={video.url} title={video.title} />

          {/* Video Info */}
          <VideoInfo video={video} />

          {/* Subscribe Button */}
          <div className="mt-4">
            <SubscribeButton channelId={video.user.id} />
          </div>

          {/* Like Button */}
          <div className="mt-4">
            <LikeButton videoId={id} initialLikeStatus={0} />
          </div>

          {/* Comments Section */}
          <Suspense fallback={<div>Loading comments...</div>}>
            <CommentSection videoId={id} />
          </Suspense>
        </div>

        {/* Related Videos */}
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