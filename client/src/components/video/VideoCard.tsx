'use client'

import Link from "next/link";
import Image from "next/image";
import { formatDistance  } from "date-fns";
import { VideoWithUser } from "@/types";

interface VideoCardProps {
    video: VideoWithUser;
    horizontal?: boolean;
}

export function VideoCard({ video, horizontal = false }: VideoCardProps) {
    return (
        <div className={`${horizontal ? 'flex' : 'flex flex-col'} mb-4`}>
            <div className={`${horizontal ? 'w-48 h-24 mr-4' : 'w-full aspect-video'} relative rounded-lg overflow-hidden`}>
                <Link href={`/video/${video.id}`} >
                    <Image  src={video.thumbnail.startsWith('http') ? video.thumbnail : `${process.env.NEXT_PUBLIC_API_URL}/${video.thumbnail}`}
                alt={video.title}
            fill
            className="object-cover"
            sizes={horizontal ? '192px' : '100%'} />
                </Link>
            </div>

            <div className={`${horizontal ? 'flex-1' : 'mt-2 flex'}`}>
                {!horizontal && (
                    <div className="mr-2 flex-shrink-0">
                        <Link href={`/profile/${video.user.id}`} >
                            <div className="w-9 h-9 rounded-full overflow-hidden">
                            <Image 
                                src={video.user.avatar.startsWith('http') ? video.user.avatar.trim() : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${video.user.avatar}`.trim()}
                                alt={video.user.username}
                                width={36}
                                height={36}
                                className="object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/default-avatar.png';
                                }}
                                />
                               
                            </div>
            </Link>
          </div>
        )}
        
        <div>
          <Link href={`/video/${video.id}`}>
            <h3 className="text-base font-medium line-clamp-2">{video.title}</h3>
          </Link>
          
          <Link href={`/profile/${video.user.id}`} className="text-sm text-gray-600 mt-1 block">
            {video.user.username}
          </Link>
          
          <div className="text-sm text-gray-600 flex items-center">
            <span>{video.views || 0} views</span>
            <span className="mx-1">•</span>
            <span>{formatDistance(new Date(video.createdAt), new Date(), { addSuffix: true })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}