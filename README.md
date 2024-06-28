# Portfolio Project

## Overview

This full-stack portfolio application showcases professional accomplishments through projects, skills, certifications, blog posts, services, and testimonials. It combines a Flask-powered backend with a PostgreSQL database and a React frontend to deliver a comprehensive personal branding platform.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Project Showcase**: Highlight your best work with detailed project descriptions.
- **Skills Display**: Present your technical and soft skills with proficiency levels.
- **Certifications Listing**: Showcase your professional certifications and credentials.
- **Blog Functionality**: Share your insights and expertise through blog posts.
- **Services Offered**: Outline the professional services you provide.
- **Testimonials**: Display client feedback to build credibility.
- **Admin Dashboard**: Manage your content effortlessly through a secure admin interface.

## Technology Stack

### Backend

- Python 3.x
- Flask 3.0.3
- SQLAlchemy 2.0.27
- PostgreSQL
- Flask-Migrate 4.0.5

### Frontend

- React (latest stable version)
- Vite
- Tailwind CSS

## Getting Started

### Prerequisites

- Python 3.x
- Node.js (LTS version)
- PostgreSQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MaVeN-13TTN/personal-portfolio.git
   cd portfolio-project
   ```

2. Set up the backend:

   ```bash
   cd portfolio-backend
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

3. Configure the database:

   ```bash
   flask db upgrade
   ```

4. Set up the frontend:
   ```bash
   cd ../portfolio-frontend
   npm install
   ```

## Configuration

1. Backend configuration:

   - Create a `.env` file in the `portfolio-backend` directory.
   - Add the following variables:
     ```
     FLASK_APP=run.py
     FLASK_ENV=development
     DATABASE_URL=postgresql://username:password@localhost/portfolio_db
     SECRET_KEY=your_secret_key_here
     ```

2. Frontend configuration:
   - Update the API base URL in `portfolio-frontend/src/services/api.js` if necessary.

## Usage

1. Start the backend server:

   ```bash
   cd portfolio-backend
   flask run
   ```

2. In a new terminal, start the frontend development server:

   ```bash
   cd portfolio-frontend
   npm run dev
   ```

3. Access the application at `http://localhost:5173` in your web browser.

## API Reference

| Endpoint              | Method | Description                 |
| --------------------- | ------ | --------------------------- |
| `/api/projects`       | GET    | Retrieve all projects       |
| `/api/skills`         | GET    | Retrieve all skills         |
| `/api/certifications` | GET    | Retrieve all certifications |
| `/api/blog`           | GET    | Retrieve blog posts         |
| `/api/services`       | GET    | Retrieve offered services   |
| `/api/testimonials`   | GET    | Retrieve testimonials       |

For detailed API documentation, refer to the [API Documentation](API.md) file.

## Database Schema

The PostgreSQL database consists of the following main tables:

- `admin`: Stores administrator account information.
- `projects`: Contains details of showcased projects.
- `skills`: Lists technical and soft skills.
- `certifications`: Stores professional certifications.
- `blog_posts`: Manages blog content.
- `services`: Describes offered professional services.
- `testimonials`: Holds client testimonials.

For a comprehensive schema breakdown, consult the [Database Schema](DATABASE.md) documentation.

## Contributing

We welcome contributions to enhance the Portfolio Project. Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Ndung'u KInyanjui

kinyanjuindungu1324@gmail.com

Project Link: [https://github.com/MaVeN-13TTN/personal-portfolio.git](https://github.com/MaVeN-13TTN/personal-portfolio.git)
