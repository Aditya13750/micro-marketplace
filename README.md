# 🛒 Micro Marketplace

A full-stack marketplace application built with React, Node.js, Express, and MongoDB.

## Features
- **Authentication**: JWT-based login and registration.
- **Product Discovery**: Browse products with search and pagination.
- **Favorites**: Mark items as favorites and view them in a secure personal section.
- **Detailed Views**: Comprehensive product information with high-quality images.
- **Modern UI**: Responsive design with sleek aesthetics and smooth transitions.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Vite.
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **Validation**: express-validator.
- **Data**: Seeded with realistic product data.

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. **Clone the repository**
2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Configure your .env file
   node seed/seed.js # To populate initial data
   npm run dev
   ```
3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Project Structure
- `/backend`: Express API, models, and database configuration.
- `/frontend`: React application using Vite and Tailwind CSS.
