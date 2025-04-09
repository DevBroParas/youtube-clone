import { VideoWithUser, Comment } from '@/types';
import { api } from '@/lib/api';

export async function getVideos(): Promise<VideoWithUser[]> {
  try {
    const response = await api.get('/videos');
    return response.data.videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export async function getVideoById(id: string): Promise<VideoWithUser | null> {
  try {
    const response = await api.get(`/videos/${id}`);
    return response.data.video;
  } catch (error) {
    console.error(`Error fetching video ${id}:`, error);
    return null;
  }
}

export async function getVideoComments(videoId: string): Promise<Comment[]> {
  try {
    const response = await api.get(`/videos/${videoId}/comments`);
    return response.data.comments;
  } catch (error) {
    console.error(`Error fetching comments for video ${videoId}:`, error);
    return [];
  }
}

export async function likeVideo(videoId: string, like: number) {
  try {
    const response = await api.post(`/videos/${videoId}/like`, { like });
    return response.data;
  } catch (error) {
    console.error(`Error liking video ${videoId}:`, error);
    throw error;
  }
}

export async function addComment(videoId: string, text: string) {
  try {
    const response = await api.post(`/videos/${videoId}/comments`, { text });
    return response.data.comment;
  } catch (error) {
    console.error(`Error adding comment to video ${videoId}:`, error);
    throw error;
  }
}

export async function getRelatedVideos(videoId: string) {
  try {
      const response = await api.get(`/videos/${videoId}/related`);
      return response.data.relatedVideos;
  } catch (error) {
      console.error(`Error fetching related videos for video ${videoId}:`, error);
      return [];
  }
}