# Personal Portfolio Website

## Overview

This personal portfolio website showcases my skills and projects. Built with a React frontend and Flask backend, it features a responsive design and uses Formspree for contact form submissions.

## Technologies

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Formspree React

### Backend

- Flask
- Flask-CORS

## Setup

### Prerequisites

- Node.js (v14+)
- Python (v3.7+)
- pip

### Frontend

1. Navigate to frontend directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create `.env` file:

   ```
   VITE_FORMSPREE_ENDPOINT=your_formspree_endpoint_here
   ```

4. Start development server:
   ```
   npm run dev
   ```
   Access at `http://localhost:5173`

### Backend

1. Navigate to backend directory:

   ```
   cd backend
   ```

2. Create and activate virtual environment (optional):

   ```
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

4. Start Flask server:
   ```
   flask run
   ```
   API available at `http://localhost:5000`

## Running the Application

1. Start both frontend and backend servers.
2. Visit `http://localhost:5173` in your browser.

## Features

- Responsive design
- Dynamic content loading
- Contact form (via Formspree)
- Project showcase
- Skills and experience sections

## Contact Form

Utilizes Formspree for handling submissions. Ensure you've set up a Formspree account and added the endpoint to frontend environment variables.

## Contributing

Contributions welcome. Please submit a Pull Request.

## License

Open source under the [MIT License](LICENSE).
