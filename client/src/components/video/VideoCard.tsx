// src/components/VideoCard.tsx
'use client';

import Link from "next/link";
import Image from "next/image";
import { formatDistance } from "date-fns";
import { VideoWithUser } from "@/types";
import LikeButton from "./LikeButton";  // Corrected import path

interface VideoCardProps {
    video: VideoWithUser;
    horizontal?: boolean;
    showLikeButton?: boolean;  // New prop to control LikeButton visibility
}

export function VideoCard({ 
    video, 
    horizontal = false,
    showLikeButton = false  // Default to not showing like button
}: VideoCardProps) {
    const { id, title, thumbnail, user, views, createdAt } = video;

    return (
        <div className={`${horizontal ? 'flex' : 'flex flex-col'} mb-4`}>
            <div className={`${horizontal ? 'w-48 h-24 mr-4' : 'w-full aspect-video'} relative rounded-lg overflow-hidden`}>
                <Link href={`/video/${id}`}>
                    <Image
                        src={thumbnail.startsWith('http') 
                            ? thumbnail 
                            : `${process.env.NEXT_PUBLIC_API_URL}/${thumbnail}`}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes={horizontal ? '192px' : '100%'}
                        priority={!horizontal}  // Optimize image loading
                    />
                </Link>
            </div>

            <div className={`${horizontal ? 'flex-1' : 'mt-2 flex'}`}>
                {!horizontal && (
                    <div className="mr-2 flex-shrink-0">
                        <Link href={`/profile/${user.id}`} aria-label={`Visit ${user.username}'s channel`}>
                            <div className="w-9 h-9 rounded-full overflow-hidden">
                                <Image
                                    src={user.avatar.startsWith('http') 
                                        ? user.avatar.trim() 
                                        : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${user.avatar}`.trim()}
                                    alt={user.username}
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

                <div className="flex-1">
                    <Link href={`/video/${id}`} className="hover:text-primary transition-colors">
                        <h3 className="text-base font-medium line-clamp-2">{title}</h3>
                    </Link>

                    <Link 
                        href={`/profile/${user.id}`} 
                        className="text-sm text-muted-foreground mt-1 block hover:text-primary"
                    >
                        {user.username}
                    </Link>

                    <div className="text-sm text-muted-foreground flex items-center mt-1">
                        <span>{views?.toLocaleString() || 0} views</span>
                        <span className="mx-1">•</span>
                        <span>{formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}</span>
                    </div>

                    {showLikeButton && (
                        <div className="mt-2">
                            <LikeButton videoId={id} initialLikeStatus={0} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
