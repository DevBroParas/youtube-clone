'use client';
import React, { useState } from 'react';
import { Comment } from '@/types';
import { addComment, getVideoComments } from '@/lib/services/videoService';

interface CommentSectionProps {
  videoId: string;
}

export function CommentSection({ videoId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    const fetchedComments = await getVideoComments(videoId);
    setComments(fetchedComments);
  };

  const handleAddComment = async () => {
    await addComment(videoId, newComment);
    setNewComment('');
    fetchComments();
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Comments</h2>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
        className="w-full border p-2"
      />
      <button onClick={handleAddComment}>Submit</button>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.text}</p>
          <small>By {comment.user.username}</small>
        </div>
      ))}
    </div>
  );
}
