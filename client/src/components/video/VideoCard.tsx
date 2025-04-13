'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { formatDistance } from "date-fns";
import { VideoWithUser } from "@/types";
import LikeButton from "./LikeButton";

interface VideoCardProps {
    video: VideoWithUser;
    horizontal?: boolean;
    showLikeButton?: boolean;
}

export function VideoCard({ 
    video, 
    horizontal = false,
    showLikeButton = false
}: VideoCardProps) {
    const { id, title, thumbnail, user, views, createdAt } = video;

    const getAvatarSrc = (avatarPath: string | null) => {
        const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    
        if (!avatarPath) return `${base}/uploads/avatars/default-avatar.png`;
    
        if (avatarPath.startsWith('http')) return avatarPath.trim();
    
        const cleanPath = avatarPath.replace(/^.*[\\\/]/, '').trim();
    
        return `${base}/uploads/avatars/${cleanPath}`;
    };

    const getThumbnailSrc = (thumbnailPath: string | null) => {
        if (!thumbnailPath) {
            return '/default-thumbnail.png';
        }

        if (thumbnailPath.startsWith('http')) {
            return thumbnailPath.trim();
        }

        return `${process.env.NEXT_PUBLIC_API_URL}/uploads/thumbnails/${thumbnailPath.replace(/^.*[\\\/]/, '').trim()}`;
    };

    const [avatarSrc, setAvatarSrc] = useState(getAvatarSrc(user.avatar));
    const [thumbnailSrc, setThumbnailSrc] = useState(getThumbnailSrc(thumbnail));

    return (
        <div className={`${horizontal ? 'flex' : 'flex flex-col'} mb-4`}>
            <div className={`${horizontal ? 'w-48 h-24 mr-4' : 'w-full aspect-video'} relative rounded-lg overflow-hidden`}>
                <Link href={`/video/${id}`}>
                    <Image
                        src={thumbnailSrc}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes={horizontal ? '192px' : '100%' }
                        priority={!horizontal}
                        onError={() => setThumbnailSrc('/default-thumbnail.png')}
                    />
                </Link>
            </div>

            <div className={`${horizontal ? 'flex-1' : 'mt-2 flex'}`}>
                {!horizontal && (
                    <div className="mr-2 flex-shrink-0">
                        <Link href={`/profile/${user.id}`} aria-label={`Visit ${user.username}'s channel`}>
                            <div className="w-9 h-9 rounded-full overflow-hidden">
                                <Image
                                    src={avatarSrc}
                                    alt={user.username}
                                    width={36}
                                    height={36}
                                    className="object-cover"
                                    onError={() => setAvatarSrc('/avatars/default-avatar.png')}
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
