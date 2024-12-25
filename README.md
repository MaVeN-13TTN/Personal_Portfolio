# Personal Portfolio Website

## Overview

A modern, full-stack personal portfolio website showcasing skills, projects, and blog posts. Built with React and Flask, featuring a responsive design, dynamic blog functionality, animations, and interactive components.

## Key Features

- **Modern UI/UX**
  - Responsive design with Tailwind CSS
  - Smooth animations with Framer Motion
  - Dynamic background effects
  - Dark theme optimized

- **Dynamic Blog System**
  - Full-text search with highlighting
  - Category and tag filtering
  - Real-time search results
  - Rich text content with Markdown support
  - Social sharing functionality
  - Time-based sorting with relative timestamps

- **Portfolio Features**
  - Project showcase
  - Skills and experience sections
  - Downloadable resume
  - Interactive certifications display

- **Interactive Components**
  - Contact form with Formspree integration
  - Social media links
  - Quick navigation dropdown
  - Error boundaries for stability

## Tech Stack

### Frontend
```
React 18.3.1 + Vite 5.3.1
├── Styling
│   ├── Tailwind CSS 3.4.4
│   └── Framer Motion 11.11.17 (animations)
├── Routing & State
│   ├── React Router v6.24.0
│   └── React Query (data fetching)
├── Content
│   ├── React Markdown 9.0.1
│   ├── Syntax Highlighter 15.6.1
│   └── date-fns 4.1.0 (time formatting)
└── Development
    ├── ESLint 8.57.0
    ├── Jest 29.7.0
    └── Testing Library
```

### Backend
```
Flask 3.0.3
├── Core
│   ├── Flask-CORS 4.0.1
│   └── python-dotenv 1.0.1
├── Data Storage
│   └── JSON (blog posts, projects, certifications)
└── Development
    └── Werkzeug 3.0.3
```

## Project Structure

```
portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── blog/          # Blog-related components
│   │   │   ├── certifications/# Certification display
│   │   │   ├── common/        # Shared components
│   │   │   ├── Layout/        # Header, Footer
│   │   │   └── projects/      # Project showcase
│   │   ├── contexts/          # React Context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── styles/           # Global styles & Tailwind
│   │   └── utils/            # Helper functions
│   ├── public/
│   └── package.json
└── backend/
    ├── app.py                # Main Flask application
    ├── data/                 # JSON data storage
    │   ├── blog/
    │   ├── projects/
    │   └── certifications/
    └── requirements.txt
```

## Setup & Installation

### Prerequisites

- Node.js (v18+)
- Python (v3.12+)
- npm or yarn
- pip

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install   # or: yarn install
   ```

2. Environment setup:
   ```bash
   # Create .env file
   VITE_FORMSPREE_ENDPOINT=your_formspree_endpoint
   VITE_API_URL=http://localhost:5000
   ```

3. Development server:
   ```bash
   npm run dev   # or: yarn dev
   ```

### Backend Setup

1. Virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start server:
   ```bash
   flask run
   ```

## Development

### Available Scripts

Frontend:
- `npm run dev`: Start development server (Vite)
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run test`: Run Jest tests
- `npm run lint`: Run ESLint

Backend:
- `flask run`: Start development server
- `python -m pytest`: Run tests

### Blog Post Format

Add posts to `/backend/data/blog/posts.json`:
```json
{
  "id": "unique-post-id",
  "title": "Post Title",
  "excerpt": "Brief description",
  "content": "Markdown content",
  "author": "Author Name",
  "date": "2024-12-25T20:00:00Z",
  "categories": ["Category1"],
  "tags": ["tag1", "tag2"],
  "imageUrl": "/images/post.jpg",
  "readTime": "5 min"
}
```

### Project Data Format

Add projects to `/backend/data/projects/projects.json`:
```json
{
  "id": "project-id",
  "title": "Project Title",
  "description": "Project description",
  "technologies": ["React", "Flask"],
  "imageUrl": "/images/project.jpg",
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://...",
  "featured": true
}
```

### Component Development Guidelines

- Use TypeScript for enhanced type safety
- Implement error boundaries for stability
- Write unit tests for critical components
- Use proper prop validation with PropTypes
- Follow React best practices and hooks rules
- Maintain consistent code style (ESLint)

## Testing

### Frontend Testing
- Jest + React Testing Library
- Component unit tests
- Integration tests
- Mock API calls
- Test coverage reporting

### Backend Testing
- pytest for Python tests
- API endpoint testing
- Error handling tests
- Data validation tests

## Performance Optimization

- React Query for efficient data fetching and caching
- Image optimization and lazy loading
- Code splitting with React.lazy()
- Route-based chunking
- Memoization for expensive calculations
- Tailwind CSS purging for production
- Gzip compression

## Security Measures

- CORS configuration for API endpoints
- Environment variables for sensitive data
- Form validation and sanitization
- XSS prevention through React
- Input sanitization on both ends
- Content Security Policy (CSP)
- Rate limiting for API endpoints

## Deployment

### Frontend Deployment
1. Build the production bundle:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `dist` directory to your hosting service

### Backend Deployment
1. Set up a production server (e.g., Ubuntu with Nginx)
2. Configure WSGI server (e.g., Gunicorn)
3. Set up SSL/TLS certificates
4. Configure environment variables
5. Set up monitoring and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## License

MIT License - See LICENSE file for details

## Contact

For questions or feedback, please reach out through:
- The contact form on the website
- GitHub issues
- Email [kinyanjuindungu1324@gmail.com](mailto:kinyanjuindungu1324@gmail.com)