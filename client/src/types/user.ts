import { Video } from './index';
export interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    cover: string;
    about: string;
    createdAt: Date;
  }
  
  export interface UserProfile extends User {
    subscriberCount: number;
    totalViews: number;
    videos: Video[];
  }
  
  export interface Subscription {
    id: string;
    subscribedTo: User;
  }
  
  export interface VideoLike {
    video: Video;
  }
  