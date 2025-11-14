# Task Management Boards 

## Backend

This is the **backend** part of the Task Management Boards project, built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**. It provides REST APIs to manage boards, columns, and cards, including drag-and-drop functionality. The backend is deployed on Render and available at: 👉 https://task-management-boards-4fr8.onrender.com

---

### Features

- Create, update, get, and delete boards
- Add, update, move, and delete cards within columns
- Drag and drop cards between columns
- Swagger API documentation available
- TypeScript for type safety
- Jest tests with in-memory MongoDB

---

### Technologies

- Node.js
- Express.js
- TypeScript
- MongoDB & Mongoose
- Jest & Supertest for testing
- Docker for containerization
- Swagger for API documentation

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm
- MongoDB (local or Atlas)
- Docker (optional, for containerization)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/GGalina/task-management-boards.git
cd task-management-boards/backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the backend folder:

```bash
PORT=5000
MONGO_URI=<your_mongodb_uri>
```

### Running the backend

Development mode

```bash
npm run dev
```
Server will start at http://localhost:5000.

Production mode

```bash
npm run build
npm start
```

### Running tests

```bash
npm test
```
Tests use an in-memory MongoDB instance, so no external database is required.

### Docker

1. Build Docker image

From the backend folder:
```bash
docker build -t backend-app .
```

Run Docker container

```bash
docker run -p 5000:5000 --name backend-container backend-app
```
The backend will be available at http://localhost:5000.

 ### API Documentation

Swagger documentation is available at:

https://task-management-boards-4fr8.onrender.com/api-docs

or

http://localhost:5000/api-docs

It covers all endpoints for boards and cards, including drag-and-drop operations.

### Testing & Code Quality

- Unit and integration tests: Jest + Supertest
- Linting: ESLint + Prettier
- GitHub Actions CI can be set up to run tests and linting on push/PR

