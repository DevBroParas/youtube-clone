'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

interface LikeButtonProps {
    videoId: string;
    initialLikeStatus: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ videoId, initialLikeStatus }) => {
    const [likeStatus, setLikeStatus] = useState<number>(initialLikeStatus);
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch the current like status when the component mounts
    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/videos/${videoId}/like-status`,
                    { withCredentials: true }
                );
                setLikeStatus(response.data.like); // Update the like status
            } catch (error: any) {
                console.error('Error fetching like status:', error.response?.data?.message || error.message);
            }
        };

        fetchLikeStatus();
    }, [videoId]);

    const handleLikeClick = async (likeValue: number) => {
        setLoading(true);
        try {
            // Toggle like status: if already liked/disliked, reset to 0
            const newLikeStatus = likeStatus === likeValue ? 0 : likeValue;

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/videos/${videoId}/like`,
                { like: newLikeStatus },
                { withCredentials: true }
            );
            console.log("Like status updated:", response.data);
            setLikeStatus(newLikeStatus); // Update the like status
        } catch (error: any) {
            console.error('Error updating like status:', error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="like-buttons-container flex space-x-4">
            {/* Like Button */}
            <button
                className={`ml-4 like-button ${likeStatus === 1 ? 'text-blue-500' : 'text-gray-500'}`}
                disabled={loading}
                onClick={() => handleLikeClick(1)}
            >
                <FaThumbsUp size={24} />
            </button>

            {/* Dislike Button */}
            <button
                className={`dislike-button ${likeStatus === -1 ? 'text-red-500' : 'text-gray-500'}`}
                disabled={loading}
                onClick={() => handleLikeClick(-1)}
            >
                <FaThumbsDown size={24} />
            </button>
        </div>
    );
};

export default LikeButton;