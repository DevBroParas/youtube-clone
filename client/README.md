# YouTube Clone Client

## Project Overview
This is the client-side application of the YouTube clone project built using React. It contains all the frontend code responsible for the user interface and interactions.

## Folder Structure

```
client/
├── public/            # Public assets and index.html
├── src/              # Source code files
│   ├── components/   # Reusable React components
│   ├── pages/        # Page components for different routes
│   ├── utils/        # Utility functions and helpers
│   ├── styles/       # CSS and styling files
│   ├── context/      # React context providers
│   ├── hooks/        # Custom React hooks
│   ├── api/          # API integration functions
│   └── App.js        # Main application component
```

## Key Components Explanation

### Components Directory
- `Navbar/` - Main navigation bar component
- `VideoCard/` - Component for displaying video thumbnails
- `Comments/` - Comment section components
- `Menu/` - Sidebar menu components

### Pages Directory
- `Home.jsx` - Homepage displaying video feed
- `Video.jsx` - Single video viewing page
- `SignIn.jsx` - User authentication page
- `Search.jsx` - Search results page

### Context Directory
- `authContext.js` - Manages user authentication state
- `themeContext.js` - Handles dark/light theme switching

## Setup and Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Key Features
- Responsive design that works on both desktop and mobile
- Video playback functionality
- User authentication
- Comment system
- Like/Dislike functionality
- Video upload capability
- Search functionality
- Dark/Light theme toggle

## Important Files

- `index.js`: Entry point of the application
- `App.js`: Main component that handles routing
- `firebase.js`: Firebase configuration (if used)
- `package.json`: Project dependencies and scripts
- `.env`: Environment variables (make sure to create it from .env.example)

## API Integration
The client communicates with the backend server through RESTful API endpoints. API integration functions are located in the `api/` directory.

## Styling
- Uses styled-components for component styling
- Global styles are defined in `styles/` directory
- Responsive design breakpoints are defined in utilities

## State Management
- Uses React Context API for global state management
- Local state managed through React hooks
- Redux might be implemented for more complex state requirements

## Best Practices
- Follow component composition patterns
- Keep components small and reusable
- Implement proper error handling
- Use proper TypeScript/PropTypes for type checking
- Follow consistent naming conventions

## Contributing
1. Create a new branch for features
2. Follow the existing code style
3. Write clear commit messages
4. Test thoroughly before submitting PR

## Troubleshooting
Common issues and their solutions:
- If build fails, clear npm cache: `npm cache clean --force`
- For API issues, check .env configuration
- For styling issues, check theme provider setup
