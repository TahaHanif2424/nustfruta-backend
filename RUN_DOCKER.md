# Running NustFruta Backend with Docker Compose

## 📁 File Structure

```
nustfruta-backend/
├── Dockerfile              ✅ Container configuration
├── docker-compose.yml      ✅ Docker Compose config
├── .env                    ✅ Environment variables
├── .dockerignore          ✅ Exclude files from build
├── src/                    (Application code)
├── public/                 (Static files)
└── package.json
```

## 🚀 Quick Start

### 1. Ensure .env is configured

Your `.env` file should have:
```env
MONGODB_URI=mongodb+srv://tahahanif009_db_user:abd24hui@shahzil.fqysiha.mongodb.net/nustfruta?retryWrites=true&w=majority&appName=shahzil
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=production
```

### 2. Run with Docker Compose

```bash
# Navigate to the backend directory
cd ~/nustfruta-backend
# OR on Windows
cd C:\Users\tahah\OneDrive\Desktop\nustfruta-backend

# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Test the API
curl http://localhost:5000/api/health
```

## 📋 Common Commands

### Start/Stop Services

```bash
# Start in background
docker-compose up -d

# Start with logs visible
docker-compose up

# Build and start (after code changes)
docker-compose up -d --build

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### View Logs

```bash
# Follow logs (real-time)
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100

# Since 5 minutes ago
docker-compose logs --since 5m
```

### Container Management

```bash
# Check status
docker-compose ps

# Restart container
docker-compose restart

# Rebuild without cache
docker-compose build --no-cache
docker-compose up -d

# Execute command in container
docker-compose exec backend sh
docker-compose exec backend npm run seed:admin
docker-compose exec backend npm run seed:products
```

### Database Operations

```bash
# Seed admin user
docker-compose exec backend npm run seed:admin

# Seed products
docker-compose exec backend npm run seed:products

# List products
docker-compose exec backend npm run list:products

# Calculate revenue
docker-compose exec backend npm run calculate:revenue
```

## 🔧 Configuration

### Environment Variables

The `docker-compose.yml` automatically loads `.env` file:

```yaml
env_file:
  - .env
```

All variables in `.env` are available in the container.

### Port Mapping

```yaml
ports:
  - "5000:5000"
```
- **Host Port**: 5000 (access from your machine)
- **Container Port**: 5000 (internal app port)

Access the API at: `http://localhost:5000`

### Health Check

Automatic health monitoring:
```yaml
healthcheck:
  test: curl http://localhost:5000/api/health
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

Check health status:
```bash
docker inspect nustfruta-backend | grep -A 10 Health
```

## 🐛 Troubleshooting

### "uri parameter must be a string, got undefined"

**Problem**: Environment variables not loaded

**Solution**:
```bash
# Check .env exists
ls -la .env

# Verify MONGODB_URI is set
cat .env | grep MONGODB_URI

# Rebuild
docker-compose down
docker-compose up -d --build
```

### Port 5000 Already in Use

**Problem**: Another service using port 5000

**Solution 1**: Stop conflicting service
```bash
# Find process using port 5000
lsof -i :5000
# OR on Windows
netstat -ano | findstr :5000

# Kill it
kill -9 <PID>
```

**Solution 2**: Change port in docker-compose.yml
```yaml
ports:
  - "8080:5000"  # Use 8080 on host, 5000 in container
```

Then access: `http://localhost:8080/api/health`

### Container Keeps Restarting

```bash
# Check logs for errors
docker-compose logs --tail=50

# Common issues:
# - MongoDB connection failed
# - Missing JWT_SECRET
# - Syntax error in code
```

### MongoDB Connection Failed

**Check**:
1. ✅ MONGODB_URI is correct in `.env`
2. ✅ MongoDB Atlas IP whitelist includes your IP
3. ✅ Database credentials are correct
4. ✅ Internet connection is working

**Test connection**:
```bash
# Ping MongoDB Atlas
ping shahzil.fqysiha.mongodb.net

# Check logs
docker-compose logs | grep -i mongo
```

### Changes Not Reflected

```bash
# Force rebuild without cache
docker-compose build --no-cache
docker-compose up -d

# OR rebuild specific service
docker-compose up -d --build --force-recreate
```

### Cannot Access Logs

```bash
# If container crashed
docker ps -a

# Check exit code
docker inspect nustfruta-backend | grep -A 5 State
```

## 📊 Monitoring

### Real-time Monitoring

```bash
# Watch logs continuously
docker-compose logs -f

# Monitor resource usage
docker stats nustfruta-backend

# Check container status every 2 seconds
watch -n 2 'docker-compose ps'
```

### Health Status

```bash
# Check if container is healthy
docker-compose ps

# Detailed health info
docker inspect nustfruta-backend --format='{{json .State.Health}}' | jq

# Test health endpoint manually
curl -v http://localhost:5000/api/health
```

### Log Analysis

```bash
# Search for errors
docker-compose logs | grep -i error

# Search for MongoDB connection
docker-compose logs | grep -i "mongodb connected"

# Check startup time
docker-compose logs | grep "Server is running"
```

## 🔐 Security Notes

### Running as Non-Root

The Dockerfile creates a `nodejs` user:
```dockerfile
USER nodejs
```

Verify:
```bash
docker-compose exec backend whoami
# Output: nodejs
```

### Environment Security

- ✅ `.env` is not copied into the image (in .dockerignore)
- ✅ Environment variables injected at runtime
- ✅ Secrets never committed to git
- ❌ Never log sensitive environment variables

### Network Isolation

Container runs on isolated network:
```yaml
networks:
  - nustfruta-network
```

Only exposed port 5000 is accessible from host.

## 🚀 Production Deployment

### Build for Production

```bash
# Build optimized image
docker-compose build --no-cache

# Tag for registry
docker tag nustfruta-backend:latest your-registry/nustfruta-backend:v1.0

# Push to registry
docker push your-registry/nustfruta-backend:v1.0
```

### Run in Production

```bash
# Ensure production .env
cp .env.production .env

# Start with restart policy
docker-compose up -d

# Verify health
curl http://localhost:5000/api/health
```

## 📝 Development Workflow

### Local Development with Hot Reload

For development with nodemon, modify docker-compose.yml:

```yaml
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - ./src:/app/src          # Mount source code
      - ./public:/app/public    # Mount public files
    command: npm run dev        # Use nodemon
    environment:
      - NODE_ENV=development
```

### Testing Changes

```bash
# Make code changes in src/

# Rebuild and restart
docker-compose up -d --build

# Check logs
docker-compose logs -f

# Test endpoint
curl http://localhost:5000/api/health
```

## 🎯 Example Commands

### Complete Setup from Scratch

```bash
# 1. Navigate to directory
cd ~/nustfruta-backend

# 2. Check .env is configured
cat .env

# 3. Build and start
docker-compose up -d --build

# 4. Watch logs
docker-compose logs -f

# 5. Wait for "Server is running" message

# 6. Test in another terminal
curl http://localhost:5000/api/health

# 7. Seed admin user
docker-compose exec backend npm run seed:admin

# 8. Seed products
docker-compose exec backend npm run seed:products
```

### Daily Operations

```bash
# Start morning
docker-compose up -d

# Check status
docker-compose ps

# View logs if needed
docker-compose logs -f

# Stop evening
docker-compose down
```

### Debugging

```bash
# 1. Check container status
docker-compose ps

# 2. View recent logs
docker-compose logs --tail=100

# 3. Enter container
docker-compose exec backend sh

# 4. Check environment variables inside container
docker-compose exec backend env | grep MONGODB_URI

# 5. Test MongoDB connection
docker-compose exec backend node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('OK')).catch(e => console.log(e.message))"
```

## 📞 Support

### Container won't start

```bash
# Check Docker daemon
docker info

# Check logs
docker-compose logs

# Check file permissions
ls -la .env Dockerfile

# Rebuild from scratch
docker-compose down -v
docker-compose up -d --build
```

### API not responding

```bash
# Check if container is running
docker-compose ps

# Check if port is accessible
curl http://localhost:5000/api/health

# Check firewall
sudo ufw status

# Check Docker network
docker network inspect nustfruta-backend_nustfruta-network
```

## ✅ Success Indicators

You should see:

```bash
# Logs show:
Server is running on port 5000
Environment: production
MongoDB Connected: shahzil.fqysiha.mongodb.net

# Health check returns:
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2024-11-11T..."
}

# Container status shows:
nustfruta-backend   Up 2 minutes (healthy)
```

---

**Next Steps**: Run `docker-compose up -d --build` in the `nustfruta-backend` directory!
