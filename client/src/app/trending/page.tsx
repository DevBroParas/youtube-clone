// src/app/trending/page.tsx
import { VideoCard } from '@/components/video/VideoCard';
import axios from 'axios';

export default async function TrendingPage() {
    try {
        // Fetch trending videos from backend
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/videos/trending`);
        const videos = response.data.videos;
        
        return (
            <div className="max-w-7xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Trending Videos</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {videos.map((video: any) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching trending videos:', error);
        return <p className="text-center mt-10">Failed to load trending videos.</p>;
    }
}
