# MongoDB Setup Guide

This guide explains how to set up and use MongoDB with your NestJS application.

## Prerequisites

1. **Local MongoDB Installation**
   - Install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Or use Docker: `docker run -d -p 27017:27017 --name mongodb mongo:latest`

2. **MongoDB Atlas (Cloud) - Alternative**
   - Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string

## Environment Configuration

Create a `.env` file in your project root with the following variables:

```env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/hackathon

# For MongoDB Atlas (replace with your actual connection string)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hackathon?retryWrites=true&w=majority

# Application Configuration
PORT=3000
NODE_ENV=development
```

## Database Configuration

The MongoDB connection is configured in `src/config/database.config.ts` with the following settings:

- **Connection URI**: Uses environment variable `MONGODB_URI` or defaults to local MongoDB
- **Connection Options**: Optimized for performance and reliability
- **Pool Size**: Maximum 10 connections
- **Timeouts**: Configured for production use

## Usage Example

The application includes a complete example with a `Users` module that demonstrates:

### Schema Definition (`src/users/schemas/user.schema.ts`)
```typescript
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  age: number;

  @Prop({ default: true })
  isActive: boolean;
}
```

### Service Methods (`src/users/users.service.ts`)
- `create()` - Create new user
- `findAll()` - Get all users
- `findOne()` - Get user by ID
- `update()` - Update user
- `remove()` - Delete user

### REST API Endpoints (`src/users/users.controller.ts`)
- `POST /users` - Create user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Testing the Connection

1. Start your application:
   ```bash
   npm run start:dev
   ```

2. Test the API endpoints:
   ```bash
   # Create a user
   curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"john@example.com","age":30}'

   # Get all users
   curl http://localhost:3000/users
   ```

## Adding New Collections

To add a new MongoDB collection:

1. Create a schema file in `src/[module]/schemas/[name].schema.ts`
2. Create a service file in `src/[module]/[name].service.ts`
3. Create a controller file in `src/[module]/[name].controller.ts`
4. Create a module file in `src/[module]/[module].module.ts`
5. Import the new module in `src/app.module.ts`

## Troubleshooting

### Connection Issues
- Ensure MongoDB is running on the specified port
- Check your connection string format
- Verify network connectivity for Atlas connections

### Performance Tips
- Use indexes for frequently queried fields
- Implement pagination for large datasets
- Use projection to limit returned fields
- Consider using aggregation pipelines for complex queries

## Dependencies

The following packages have been installed:
- `@nestjs/mongoose` - NestJS MongoDB integration
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variable management 