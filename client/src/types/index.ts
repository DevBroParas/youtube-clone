export interface User {
    id: string;
    createdAt: string;
    username: string;
    email: string;
    avatar: string;
    cover: string;
    about: string;
  }
  
  export interface Video {
    id: string;
    createdAt: string;
    title: string;
    description: string | null;
    url: string;
    thumbnail: string;
    userId: string;
    views?: number;
  }
  
  export interface VideoWithUser extends Video {
    user: User;
  }
  
  export interface Comment {
    id: string;
    createdAt: string;
    text: string;
    userId: string;
    videoId: string;
    user: User;
  }
  
  export interface VideoLike {
    id: string;
    createdAt: string;
    like: number; // 1 for like, -1 for dislike, 0 for neutral
    userId: string;
    videoId: string;
  }
  
  export interface Subscription {
    id: string;
    createdAt: string;
    subscriberId: string;
    subscribedToId: string;
  }