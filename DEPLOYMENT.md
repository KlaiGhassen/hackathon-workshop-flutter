# Deployment Guide

This guide explains how to deploy the Hackathon API using Docker and Docker Compose.

## Prerequisites

- Docker installed on your system
- Docker Compose installed on your system

## Quick Start

### 1. Build and Start Services

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 2. Access the Application

- **API**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api
- **MongoDB Express**: http://localhost:8081 (admin/password123)

## Services

### 1. NestJS Application (Port 3000)
- Main API server
- Swagger documentation available at `/api`
- Health check endpoint at `/`

### 2. MongoDB Database (Port 27017)
- Database server
- Persistent data storage
- Initialized with sample data

### 3. MongoDB Express (Port 8081)
- Web-based MongoDB admin interface
- Username: `admin`
- Password: `password123`

## Environment Variables

The application uses the following environment variables:

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://admin:password123@mongodb:27017/hackathon?authSource=admin
```

## Volumes

- `mongodb_data`: Persistent MongoDB data
- `uploads_data`: Persistent file uploads

## Health Checks

Both the application and MongoDB have health checks configured:

- **App**: Checks if the server responds on port 3000
- **MongoDB**: Checks if the database is accessible

## Production Deployment

### 1. Environment Configuration

Create a `.env` file for production:

```env
NODE_ENV=production
MONGODB_ROOT_USERNAME=your_secure_username
MONGODB_ROOT_PASSWORD=your_secure_password
```

### 2. Security Considerations

- Change default passwords
- Use HTTPS in production
- Configure proper firewall rules
- Use secrets management for sensitive data

### 3. Scaling

To scale the application:

```bash
# Scale the app service
docker-compose up -d --scale app=3

# Scale with load balancer (requires additional configuration)
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   # or
   netstat -tulpn | grep :3000
   ```

2. **MongoDB connection issues**
   ```bash
   # Check MongoDB logs
   docker-compose logs mongodb
   ```

3. **Application not starting**
   ```bash
   # Check application logs
   docker-compose logs app
   ```

### Useful Commands

```bash
# View all containers
docker-compose ps

# Restart a specific service
docker-compose restart app

# View logs for a specific service
docker-compose logs app

# Execute commands in a container
docker-compose exec app sh
docker-compose exec mongodb mongosh

# Clean up everything
docker-compose down -v --remove-orphans
```

## Backup and Restore

### Backup MongoDB

```bash
# Create backup
docker-compose exec mongodb mongodump --out /data/backup

# Copy backup from container
docker cp hackathon-mongodb:/data/backup ./backup
```

### Restore MongoDB

```bash
# Copy backup to container
docker cp ./backup hackathon-mongodb:/data/

# Restore
docker-compose exec mongodb mongorestore /data/backup
```

## Monitoring

### Health Check Endpoints

- Application: `http://localhost:3000/`
- MongoDB: Internal health check

### Logs

```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View logs for specific service
docker-compose logs -f app
```

## Performance Optimization

1. **Database Indexes**: Already configured in `mongo-init.js`
2. **Connection Pooling**: Configured in database config
3. **File Uploads**: Stored in persistent volume
4. **Caching**: Consider adding Redis for caching

## Security Best Practices

1. Change default passwords
2. Use environment variables for secrets
3. Enable HTTPS in production
4. Regular security updates
5. Monitor logs for suspicious activity
6. Use non-root user in containers
7. Implement rate limiting
8. Add authentication/authorization 