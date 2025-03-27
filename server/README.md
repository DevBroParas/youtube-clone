# YouTube Clone - Backend

This is the backend server for the YouTube Clone application. It is built using Node.js, Express, and Prisma ORM, and it provides APIs for user authentication, video management, and user interactions.

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Videos](#videos)
- [Folder Structure](#folder-structure)
- [Frontend Integration](#frontend-integration)

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- `npm` or `yarn` package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/youtube-clone.git
   cd youtube-clone/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Update the `DATABASE_URL` in the `.env` file.
   - Run Prisma migrations:
     ```bash
     npx prisma migrate dev
     ```

4. Start the server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:3001` by default.

---

## Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```plaintext
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_jwt_secret
PORT=3001
CLIENT_URL=http://localhost:5173
```

---

## API Endpoints

### Authentication

- **POST** `/api/v1/auth/register` - Register a new user.
  - **Request Body**:
    ```json
    {
      "username": "JohnDoe",
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "user": {
        "id": "user-id",
        "username": "JohnDoe",
        "email": "johndoe@example.com",
        "createdAt": "2023-03-22T12:00:00.000Z"
      }
    }
    ```

- **POST** `/api/v1/auth/login` - Log in a user.
  - **Request Body**:
    ```json
    {
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "user": {
        "id": "user-id",
        "username": "JohnDoe",
        "email": "johndoe@example.com",
        "createdAt": "2023-03-22T12:00:00.000Z"
      }
    }
    ```

- **POST** `/api/v1/auth/logout` - Log out the current user.
  - **Response**:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

- **GET** `/api/v1/auth/me` - Get the current logged-in user.
  - **Response**:
    ```json
    {
      "user": {
        "id": "user-id",
        "username": "JohnDoe",
        "email": "johndoe@example.com",
        "createdAt": "2023-03-22T12:00:00.000Z"
      }
    }
    ```

---

### Users

- **GET** `/api/v1/users/:userId` - Get user profile.
  - **Response**:
    ```json
    {
      "user": {
        "id": "user-id",
        "username": "JohnDoe",
        "email": "johndoe@example.com",
        "avatar": "default-avatar.png",
        "about": "Hello, I'm John!",
        "createdAt": "2023-03-22T12:00:00.000Z"
      },
      "subscriberCount": 10,
      "videos": [],
      "totalViews": 100
    }
    ```

- **PUT** `/api/v1/users/profile` - Update user profile (requires authentication).
  - **Request Body**:
    ```json
    {
      "username": "JohnUpdated",
      "about": "Updated bio"
    }
    ```
  - **Response**:
    ```json
    {
      "user": {
        "id": "user-id",
        "username": "JohnUpdated",
        "email": "johndoe@example.com",
        "avatar": "uploads/avatars/avatar-12345.png",
        "about": "Updated bio",
        "createdAt": "2023-03-22T12:00:00.000Z"
      }
    }
    ```

- **POST** `/api/v1/users/:userId/subscribe` - Subscribe to a channel (requires authentication).
  - **Response**:
    ```json
    {
      "subscription": {
        "id": "subscription-id",
        "subscriberId": "current-user-id",
        "subscribedToId": "user-id",
        "createdAt": "2023-03-22T12:00:00.000Z"
      }
    }
    ```

- **DELETE** `/api/v1/users/:userId/unsubscribe` - Unsubscribe from a channel (requires authentication).
  - **Response**:
    ```json
    {
      "message": "Unsubscribed successfully"
    }
    ```

- **GET** `/api/v1/users/subscriptions` - Get subscribed channels (requires authentication).
  - **Response**:
    ```json
    {
      "channels": [
        {
          "id": "channel-id",
          "username": "ChannelName",
          "avatar": "default-avatar.png"
        }
      ]
    }
    ```

- **GET** `/api/v1/users/liked-videos` - Get liked videos (requires authentication).
  - **Response**:
    ```json
    {
      "videos": [
        {
          "id": "video-id",
          "title": "Video Title",
          "views": 100,
          "user": {
            "id": "user-id",
            "username": "JohnDoe"
          }
        }
      ]
    }
    ```

---

### Videos

- **GET** `/api/v1/videos` - Get recommended videos.
  - **Response**:
    ```json
    {
      "videos": [
        {
          "id": "video-id",
          "title": "Video Title",
          "views": 100,
          "user": {
            "id": "user-id",
            "username": "JohnDoe"
          }
        }
      ]
    }
    ```

- **GET** `/api/v1/videos/trending` - Get trending videos.
  - **Response**:
    ```json
    {
      "videos": [
        {
          "id": "video-id",
          "title": "Trending Video",
          "views": 1000,
          "user": {
            "id": "user-id",
            "username": "JohnDoe"
          }
        }
      ]
    }
    ```

- **GET** `/api/v1/videos/:videoId` - Get video details by ID.
  - **Response**:
    ```json
    {
      "video": {
        "id": "video-id",
        "title": "Video Title",
        "views": 100,
        "user": {
          "id": "user-id",
          "username": "JohnDoe"
        }
      }
    }
    ```

- **POST** `/api/v1/videos` - Upload a video (requires authentication).
  - **Request Body**:
    ```json
    {
      "title": "New Video",
      "description": "Video description"
    }
    ```
  - **Response**:
    ```json
    {
      "video": {
        "id": "video-id",
        "title": "New Video",
        "description": "Video description",
        "url": "uploads/videos/video-12345.mp4",
        "thumbnail": "uploads/thumbnails/thumbnail-12345.png",
        "userId": "user-id"
      }
    }
    ```

- **POST** `/api/v1/videos/:videoId/like` - Like/dislike a video (requires authentication).
  - **Request Body**:
    ```json
    {
      "like": 1
    }
    ```
  - **Response**:
    ```json
    {
      "like": {
        "id": "like-id",
        "like": 1,
        "userId": "user-id",
        "videoId": "video-id"
      }
    }
    ```

- **POST** `/api/v1/videos/:videoId/comments` - Add a comment to a video (requires authentication).
  - **Request Body**:
    ```json
    {
      "text": "Great video!"
    }
    ```
  - **Response**:
    ```json
    {
      "comment": {
        "id": "comment-id",
        "text": "Great video!",
        "userId": "user-id",
        "videoId": "video-id",
        "createdAt": "2023-03-22T12:00:00.000Z"
      }
    }
    ```

- **GET** `/api/v1/videos/:videoId/comments` - Get comments for a video.
  - **Response**:
    ```json
    {
      "comments": [
        {
          "id": "comment-id",
          "text": "Great video!",
          "user": {
            "id": "user-id",
            "username": "JohnDoe"
          }
        }
      ]
    }
    ```

---

## Folder Structure

```
server/
├── prisma/                 # Prisma schema and migrations
├── src/
│   ├── components/         # Reusable components (e.g., getVideoViews.js)
│   ├── controllers/        # API controllers
│   ├── middleware/         # Middleware (e.g., auth.js)
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions (e.g., multer.js)
│   └── server.js           # Main server file
├── .env                    # Environment variables
├── package.json            # Node.js dependencies and scripts
└── README.md               # Documentation
```

---

## Frontend Integration

### CORS Configuration

Ensure the frontend URL is added to the `CLIENT_URL` environment variable in the `.env` file. For local development, it should be:

```plaintext
CLIENT_URL=http://localhost:5173
```

### Static File Access

Uploaded videos, thumbnails, and avatars are served from the `/uploads` directory. The frontend can access these files using the following URL pattern:

```
http://localhost:3001/uploads/<file-path>
```

### Authentication

The backend uses cookies to store the JWT token. Ensure the frontend sends requests with credentials enabled:

```javascript
fetch("http://localhost:3001/api/v1/auth/me", {
  method: "GET",
  credentials: "include",
});
```

---

## Notes for Frontend Developers

1. **Video Upload**: Use the `multipart/form-data` format to upload videos and thumbnails. Refer to the `/api/v1/videos` endpoint.
2. **Avatar Upload**: Use the `multipart/form-data` format to upload user avatars. Refer to the `/api/v1/users/profile` endpoint.
3. **Error Handling**: The backend returns errors in the following format:
   ```json
   {
     "message": "Error description"
   }
   ```

Feel free to reach out to the backend team for further clarifications.