# KanbanLife

A TypeScript-based Kanban board project built for learning purposes using NestJS framework. This project aims to help manage tasks and projects through a simple and intuitive Kanban board interface.

## Description

KanbanLife is a learning project that implements a Kanban board system, allowing users to manage their tasks and projects efficiently. Built with TypeScript and NestJS, this project serves as both a learning experience and a practical task management tool.

## API Documentation

Explore our API documentation at:
[KanbanLife API Documentation](https://f7yj54n7qf.apidog.io/)

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- Yarn package manager
- Docker and Docker Compose (for database)

## Installation and Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd kanbanlife-back
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit the `.env` file with your configuration.

4. Start the database:
```bash
yarn docker:db
```

5. Run database migrations:
```bash
yarn prisma:migrate:dev
```

## Running the Application

### Development Mode
```bash
# Start in development mode with hot-reload
yarn start:dev
```

### Production Mode
```bash
# Build the application
yarn build

# Start in production mode
yarn start:prod
```

### Testing
```bash
# Run unit tests
yarn test

# Run e2e tests
yarn test:e2e

# Generate test coverage report
yarn test:cov
```

## Contributing

This is a learning project, but contributions are welcome! Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
