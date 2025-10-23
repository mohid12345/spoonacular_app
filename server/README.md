# Recipe App Backend - TypeScript Express

A modern TypeScript Express.js backend application for a recipe management system, built using the Repository Pattern for clean architecture and maintainability.

## Features

- **TypeScript**: Full type safety and modern JavaScript features
- **Repository Pattern**: Clean separation of data access logic
- **Express.js**: Fast, unopinionated web framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT Authentication**: Secure token-based authentication
- **bcrypt**: Password hashing for security
- **CORS**: Cross-origin resource sharing support

## Project Structure

```
src/
├── config/          # Database configuration
├── controllers/     # Request handlers
├── middleware/      # Custom middleware (auth, etc.)
├── models/          # Mongoose models
├── repositories/    # Data access layer
├── routes/          # API routes
├── services/        # Business logic layer
├── types/           # TypeScript type definitions
└── index.ts         # Application entry point
```

## API Endpoints

### User Routes (`/user`)
- `POST /register` - Register a new user
- `POST /login` - User login

### Recipe Routes (`/recipe`) - Requires Authentication
- `POST /create` - Create a new recipe
- `GET /` - Get user's recipes
- `DELETE /delete/:recipeId` - Delete a recipe

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```
PORT=8080
MONGO_URL=mongodb://localhost:27017/recipe_app
JWT_SECRET=masai
```

3. Build the project:
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

## Development

For development with auto-reload:
```bash
npm run dev
```

## Architecture

This project follows the Repository Pattern, which provides:

- **Separation of Concerns**: Business logic is separated from data access
- **Testability**: Easy to mock repositories for unit testing
- **Maintainability**: Changes to data access don't affect business logic
- **Flexibility**: Easy to switch between different data sources

### Layers:

1. **Controllers**: Handle HTTP requests and responses
2. **Services**: Contain business logic
3. **Repositories**: Handle data access
4. **Models**: Define data structure
5. **Middleware**: Handle cross-cutting concerns (auth, validation)

## Dependencies

### Production
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `bcrypt`: Password hashing
- `jsonwebtoken`: JWT token handling
- `cors`: CORS middleware
- `dotenv`: Environment variables

### Development
- `typescript`: TypeScript compiler
- `@types/*`: TypeScript type definitions
- `ts-node-dev`: Development server with TypeScript support
