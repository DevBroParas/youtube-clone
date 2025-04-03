// src/app/search/page.tsx
import { VideoCard } from '@/components/video/VideoCard';
import { VideoWithUser } from '@/types';
import axios from 'axios';

// Add TypeScript interface for searchParams
interface SearchPageProps {
  searchParams?: {
    query?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.query || '';

  if (!query) {
    return <p className="text-center mt-10">Please enter a search term.</p>;
  }

  let videos = [];
  
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/videos/search`,
      { params: { query } }
    );
    videos = response.data.videos;
  } catch (error) {
    console.error('Error fetching search results:', error);
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Search Results for &quot;{query}&quot;</h1>
      
      {videos.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {videos.map((video : VideoWithUser) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
