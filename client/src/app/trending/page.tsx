// src/app/trending/page.tsx
import { VideoCard } from '@/components/video/VideoCard';
import axios from 'axios';

export default async function TrendingPage() {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/videos/trending`);
        const videos = response.data.videos;

        return (
            <div className="max-w-[1600px] mx-auto px-6 pt-6">
                <h1 className="text-3xl font-semibold mb-6">Trending</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                    {videos.map((video: any) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching trending videos:', error);
        return <p className="text-center mt-10 text-gray-500">Failed to load trending videos.</p>;
    }
}
