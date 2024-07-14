# Office Meal Management System Frontend

This project is the frontend for an Office Meal Management System, built with React, TypeScript, and Vite.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (login, register, logout)
- User management (create, read, update, delete users)
- Meal management (create, read, update, delete meals)
- Meal ordering system
- Role-based access control (Admin and User roles)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/software-developer-yamin/office-meal-management-system-frontend.git
```

2. Navigate to the project directory:

```bash
cd office-meal-management-system-frontend
```

3. Install the dependencies:
npm install

## Running the Application

To run the application in development mode:

```bash
npm run dev
```

This will start the development server. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

To build the application for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

### Project Structure

```bash
src/
├── components/      # Reusable React components
├── pages/           # Page components
├── services/        # API service functions
├── store/           # Redux store setup and slices
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── App.tsx          # Main App component
└── main.tsx         # Entry point
```