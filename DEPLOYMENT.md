# VectorShift - Complete Deployment & Development Guide

Everything you need to build, test, deploy, and run the VectorShift project.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Local Development](#local-development)
4. [GitHub Actions CI/CD](#github-actions-cicd)
5. [Accessing Built Images](#accessing-built-images)
6. [Deployment Options](#deployment-options)
7. [Environment Configuration](#environment-configuration)
8. [Troubleshooting](#troubleshooting)
9. [Architecture & Code](#architecture--code)
10. [Advanced Topics](#advanced-topics)

---

## Quick Start

### Prerequisites
- **Docker Desktop** (includes Docker & Docker Compose)
- **Git**

### Run Locally in 3 Steps

```bash
# 1. Clone your repository
git clone https://github.com/YOUR-USERNAME/VectorShift.git
cd VectorShift

# 2. Start everything with Docker Compose
docker-compose up --build

# 3. Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

That's it! Both frontend and backend are running with hot reload enabled.

---

## Project Structure

```
VectorShift/
├── frontend/                          # React Application
│   ├── Dockerfile                    # Multi-stage optimized build
│   ├── .dockerignore                 # Excludes node_modules from build
│   ├── package.json                  # React 18, ReactFlow, Zustand
│   ├── public/
│   │   ├── index.html               # Entry HTML
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src/
│       ├── App.js                   # Main React component
│       ├── index.js                 # Entry point
│       ├── store.js                 # Zustand state management
│       ├── draggableNode.js         # Node wrapper for ReactFlow
│       ├── toolbar.js               # Toolbar UI component
│       ├── submit.js                # Submit handler
│       ├── ui.js                    # UI utilities
│       ├── nodes/                   # 9 Custom Node Types
│       │   ├── inputNode.js         # Input node (red)
│       │   ├── outputNode.js        # Output node (teal)
│       │   ├── textNode.js          # Text node (mint)
│       │   ├── llmNode.js           # LLM node (yellow)
│       │   ├── calculatorNode.js    # Calculator node (green)
│       │   ├── conditionalNode.js   # Conditional node (orange)
│       │   ├── emailNode.js         # Email node (blue)
│       │   ├── filterNode.js        # Filter node (purple)
│       │   ├── databaseNode.js      # Database node (red)
│       │   └── utils/BaseNode.js    # Reusable base (3-section structure)
│       ├── variables.css            # 60+ design tokens (colors, spacing, etc)
│       ├── utilities.css            # 100+ utility classes
│       ├── nodes-enhanced.css       # Node styling & color variants
│       ├── buttons.css              # Button styles
│       ├── forms.css                # Form input styles
│       ├── toolbar.css              # Toolbar layout
│       ├── alert.css                # Alert & modal styles
│       ├── app.css                  # Global layout & ReactFlow theming
│       └── index.css                # Base CSS
│
├── backend/                          # FastAPI Application
│   ├── Dockerfile                   # Python 3.11-slim image
│   ├── .dockerignore                # Excludes __pycache__ from build
│   ├── main.py                      # FastAPI app with CORS
│   ├── requirements.txt             # Python dependencies
│   │   ├── fastapi==0.104.1
│   │   ├── uvicorn==0.24.0
│   │   ├── pydantic==2.5.0
│   │   └── python-multipart
│   └── (additional modules as needed)
│
├── docker-compose.yml               # Local development setup
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml               # GitHub Actions automation
│
├── DEPLOYMENT.md                   # This file
├── README.md                        # Project overview
└── .git/                           # Version control

```

---

## Local Development

### Starting Development Services

```bash
docker-compose up --build
```

**What happens:**
1. **Frontend Service** (http://localhost:3000)
   - React dev server with hot reload
   - Changes to files auto-reload
   - Built on Node 18-alpine

2. **Backend Service** (http://localhost:8000)
   - FastAPI with auto-reload
   - Changes to code auto-restart service
   - Built on Python 3.11-slim
   - Interactive API docs at http://localhost:8000/docs

### Stopping Services

```bash
docker-compose down
```

### Viewing Logs

```bash
# All services
docker-compose logs -f

# Frontend only
docker-compose logs -f frontend

# Backend only
docker-compose logs -f backend

# Last 50 lines
docker-compose logs -f --tail=50
```

### Rebuilding After Dependency Changes

```bash
# New npm packages
docker-compose up --build frontend

# New Python packages
docker-compose up --build backend

# Both
docker-compose up --build
```

### Port Conflicts

If ports 3000 or 8000 are in use, modify `docker-compose.yml`:

```yaml
services:
  frontend:
    ports:
      - "3001:3000"      # Change first number (external)
  backend:
    ports:
      - "8001:8000"      # Change first number (external)
```

---

## GitHub Actions CI/CD

The `.github/workflows/ci-cd.yml` file automates testing, building, and pushing Docker images.

### How It Works

**Trigger Events:**
- Push to `main` branch
- Push to `develop` branch  
- Pull requests to `main` or `develop`

**Automated Steps:**

```
1. Checkout code
   ↓
2. Test Frontend
   - npm install
   - npm test (if tests exist)
   - npm run build
   ↓
3. Test Backend
   - pip install -r requirements.txt
   - pytest (if tests exist)
   ↓
4. Build Docker Images
   - Frontend (multi-stage, optimized)
   - Backend (Python 3.11)
   ↓
5. Push to GitHub Container Registry
   - ghcr.io/YOUR-USERNAME/vectorshift/frontend:latest
   - ghcr.io/YOUR-USERNAME/vectorshift/backend:latest
   ↓
6. Security Scanning
   - Scan images with Trivy
   - Report vulnerabilities
```

### Viewing Pipeline Status

1. Go to **Actions** tab in GitHub
2. See list of workflow runs
3. Click on a run to view:
   - Overall status (✓ passed / ✗ failed)
   - Individual job logs
   - Build duration
   - Artifacts

### Manual Trigger

Run the pipeline manually without pushing code:

1. Go to **Actions** tab
2. Select **CI/CD Pipeline** from left sidebar
3. Click **Run workflow**
4. Select branch
5. Click **Run workflow** button

### Failed Pipeline?

1. Click on the failed workflow run
2. Expand the failed job (red ✗)
3. Expand failed step
4. Read error message and fix code
5. Push to trigger pipeline again

---

## Accessing Built Images

### GitHub Container Registry (ghcr.io)

After a successful pipeline run, your Docker images are automatically pushed to GitHub Container Registry.

### Login to ghcr.io

```bash
# Method 1: Using GitHub Token (Recommended)
docker login ghcr.io -u YOUR-USERNAME -p YOUR-GITHUB-TOKEN

# Method 2: Using Personal Access Token
# 1. Go to GitHub Settings → Developer settings → Personal access tokens
# 2. Generate new token with 'read:packages' scope
# 3. Use token as password in login command above
```

### Pull and Run Images Locally

```bash
# Pull frontend
docker pull ghcr.io/YOUR-USERNAME/vectorshift/frontend:latest

# Pull backend
docker pull ghcr.io/YOUR-USERNAME/vectorshift/backend:latest

# Run frontend
docker run -p 3000:3000 ghcr.io/YOUR-USERNAME/vectorshift/frontend:latest

# Run backend
docker run -p 8000:8000 ghcr.io/YOUR-USERNAME/vectorshift/backend:latest

# Run both with compose (create docker-compose-prod.yml)
docker-compose -f docker-compose-prod.yml up
```

### Using Images in Production

The images are:
- ✓ Tested automatically
- ✓ Security scanned
- ✓ Multi-stage optimized for small size
- ✓ Ready for any Docker-compatible platform

Get the full image URI from **Packages** tab:
- Go to your GitHub repository
- Click **Packages** tab on right
- Find your VectorShift packages
- Copy the full image URI

---

## Deployment Options

### Option 1: Docker Compose on Linux Server

Best for: Small to medium deployments, simple setup

```bash
# SSH into your server
ssh user@your-server.com

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clone repository
git clone https://github.com/YOUR-USERNAME/VectorShift.git
cd VectorShift

# Run in background
docker-compose up -d

# Check status
docker-compose ps
```

### Option 2: Google Cloud Run

Best for: Serverless, auto-scaling, minimal ops

```bash
# Backend only on Cloud Run
gcloud run deploy vectorshift-backend \
  --image ghcr.io/YOUR-USERNAME/vectorshift/backend:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8000 \
  --set-env-vars ALLOWED_ORIGINS=https://your-frontend-domain.com

# Frontend on Cloud Storage + CDN
gcloud storage buckets create gs://vectorshift-frontend
gcloud storage cp "./frontend/build/*" gs://vectorshift-frontend/
```

### Option 3: AWS ECS

Best for: Enterprise, advanced networking, tight AWS integration

```bash
# Create ECR repositories
aws ecr create-repository --repository-name vectorshift-backend
aws ecr create-repository --repository-name vectorshift-frontend

# Push images
docker tag ghcr.io/YOUR-USERNAME/vectorshift/backend:latest YOUR-ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/vectorshift-backend:latest
docker push YOUR-ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/vectorshift-backend:latest

# Use AWS CloudFormation or CDK to deploy ECS tasks
# Reference ECR image URIs in task definitions
```

### Option 4: Kubernetes

Best for: High availability, complex orchestration

```bash
# Create namespace
kubectl create namespace vectorshift

# Create deployment from image
kubectl create deployment vectorshift-backend \
  --image=ghcr.io/YOUR-USERNAME/vectorshift/backend:latest \
  -n vectorshift

# Expose service
kubectl expose deployment vectorshift-backend \
  --port=8000 --target-port=8000 -n vectorshift

# Scale replicas
kubectl scale deployment vectorshift-backend --replicas=3 -n vectorshift
```

### Option 5: DigitalOcean App Platform

Best for: Developer-friendly, straightforward deployments

1. Connect GitHub repository
2. Auto-detect Dockerfile
3. Configure services
4. Deploy (automatic on push)

---

## Environment Configuration

### Frontend Environment Variables

Create `frontend/.env` or set in docker-compose.yml:

```bash
REACT_APP_API_URL=http://localhost:8000
REACT_APP_DEBUG=false
```

### Backend Environment Variables

Create `backend/.env` or set in docker-compose.yml:

```bash
ALLOWED_ORIGINS=http://localhost:3000,http://yourdomain.com
DEBUG=False
HOST=0.0.0.0
PORT=8000
```

### Docker Compose Environment Setup

```yaml
services:
  frontend:
    environment:
      - REACT_APP_API_URL=http://localhost:8000
      - REACT_APP_DEBUG=false
  
  backend:
    environment:
      - ALLOWED_ORIGINS=http://localhost:3000,http://yourdomain.com
      - DEBUG=False
```

---

## Troubleshooting

### Common Issues & Solutions

#### ❌ Docker Daemon Won't Start

```bash
# Windows/Mac: Restart Docker Desktop
# Linux: Restart Docker service
sudo systemctl restart docker

# Check status
docker ps
```

#### ❌ Port 3000 or 8000 Already in Use

```bash
# Find process using port
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000

# Kill process
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>

# Or use different ports in docker-compose.yml
```

#### ❌ Docker Build Fails / Out of Disk Space

```bash
# Clear everything
docker system prune -a --volumes

# Rebuild
docker-compose up --build
```

#### ❌ Node Modules Permission Errors

```bash
# Clear volumes and rebuild
docker-compose down -v
docker-compose up --build
```

#### ❌ Backend Can't Connect to Frontend URL

Check CORS config in `backend/main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)
```

If needed, modify and restart:
```bash
docker-compose restart backend
```

#### ❌ Frontend Can't Reach Backend

1. Check backend is running: `docker-compose ps`
2. Check backend URL in frontend: should be `http://backend:8000` (not localhost) when running in Docker
3. Check CORS is enabled in backend
4. View frontend logs: `docker-compose logs frontend`

#### ❌ GitHub Actions Workflow Failed

1. Click the red ✗ in Actions tab
2. Click failed job
3. Expand the failed step
4. Read error message
5. Fix code and push:

```bash
git add .
git commit -m "Fix CI/CD issue"
git push
```

Most common failures:
- Missing dependencies in `requirements.txt`
- Missing Node modules (check `package.json`)
- Test failures (fix code)
- Docker build context issues

#### ❌ Images Not Pushing to ghcr.io

Check GitHub Action permissions:

1. Go to Settings → Actions → General
2. Under "Workflow permissions" select "Read and write permissions"
3. Re-run failed workflow

---

## Architecture & Code

### Frontend Architecture

**Tech Stack:**
- React 18.2.0 with Hooks
- ReactFlow 11.8.3 for visual node graphs
- Zustand for state management
- CSS3 with design tokens

**Node System:**
```
BaseNode (wrapper with 3 sections)
├── Header (title + delete button)
├── Content Wrapper (form inputs)
└── Handles Section (connection ports)
```

All 9 node types inherit from BaseNode for consistency.

**State Management (Zustand):**
```javascript
// store.js
const useStore = create((set) => ({
  nodes: [],
  edges: [],
  addNode: (node) => set(state => ({...})),
  deleteNode: (id) => set(state => ({...})),
  // ... other actions
}));
```

**CSS Design System:**

60+ variables defined in `variables.css`:
```css
/* Colors */
--input-primary: #ef4444;
--output-primary: #14b8a6;
--text-primary: #a7f3d0;
/* ... etc */

/* Spacing */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
/* ... */

/* Typography */
--font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-size-base: 14px;
```

100+ utility classes in `utilities.css`:
```css
.flex { display: flex; }
.flex-col { flex-direction: column; }
.gap-md { gap: 16px; }
.p-md { padding: 16px; }
/* ... etc */
```

### Backend Architecture

**Tech Stack:**
- FastAPI 0.104.1 (modern async framework)
- Uvicorn 0.24.0 (ASGI server)
- Pydantic 2.5.0 (validation)

**Basic Structure:**
```python
# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "VectorShift API"}

@app.post("/api/process")
async def process(data: dict):
    # Process pipeline data
    return {"result": data}
```

**Auto Documentation:**
- Swagger UI at `http://localhost:8000/docs`
- ReDoc at `http://localhost:8000/redoc`
- OpenAPI schema at `http://localhost:8000/openapi.json`

### Docker Images

**Frontend Image:**
```dockerfile
# Multi-stage build (optimized)
# Stage 1: Build
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM node:18-alpine
RUN npm install -g serve
COPY --from=0 /app/build /app/build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

**Backend Image:**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## Advanced Topics

### Adding a New Node Type

1. **Create new node file** (`frontend/src/nodes/CustomNode.js`):

```jsx
import BaseNode from './utils/BaseNode';

export default function CustomNode({ id, data }) {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Custom Node"
      nodeType="custom"
      content={
        <div className="node-content">
          {/* Your inputs here */}
        </div>
      }
    />
  );
}
```

2. **Register in App.js**:

```jsx
import CustomNode from './nodes/CustomNode';

const nodeTypes = {
  custom: CustomNode,
  input: InputNode,
  // ... other nodes
};
```

3. **Add styling** (`frontend/src/variables.css`):

```css
--custom-primary: #your-color;
--custom-dark: #darker-shade;
--custom-light: #lighter-shade;
```

4. **Update toolbar** to create the new node type.

### Extending Backend API

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class ProcessRequest(BaseModel):
    nodes: list
    edges: list

@app.post("/api/process")
async def process_pipeline(request: ProcessRequest):
    try:
        # Validate pipeline
        # Execute nodes in order
        # Return results
        return {"status": "success", "results": [...]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/node-types")
async def get_node_types():
    return {
        "types": [
            {"name": "input", "color": "#ef4444"},
            # ... other types
        ]
    }
```

### Custom Docker Build Arguments

```bash
# Build with custom build args
docker build \
  --build-arg NODE_ENV=production \
  --build-arg API_URL=https://api.example.com \
  -f frontend/Dockerfile \
  -t vectorshift/frontend:custom .

# Push to registry
docker tag vectorshift/frontend:custom ghcr.io/YOUR-USERNAME/vectorshift/frontend:custom
docker push ghcr.io/YOUR-USERNAME/vectorshift/frontend:custom
```

### Multi-Architecture Builds

GitHub Actions automatically builds for multiple architectures (linux/amd64, linux/arm64):

```yaml
# Already in ci-cd.yml
- name: Set up Docker Buildx
  uses: docker/setup-buildx-action@v2

- name: Build and push
  uses: docker/build-push-action@v4
  with:
    platforms: linux/amd64,linux/arm64
    # ... other config
```

This means your images work on:
- Intel/AMD processors (x86-64)
- ARM processors (Raspberry Pi, M1/M2 Mac, AWS Graviton)

---

## Checklists

### Before Pushing to GitHub

- [ ] Local build works: `docker-compose up --build`
- [ ] Frontend loads at http://localhost:3000
- [ ] Backend API responds at http://localhost:8000
- [ ] API docs available at http://localhost:8000/docs
- [ ] CORS errors in console
- [ ] All files committed: `git status`

### Before Deploying to Production

- [ ] Update ALLOWED_ORIGINS in backend for your domain
- [ ] Set REACT_APP_API_URL to production backend URL
- [ ] Review environment variables in docker-compose.yml
- [ ] Test with production URLs locally
- [ ] GitHub Actions pipeline passes (green ✓)
- [ ] Security scan passes (no critical vulnerabilities)
- [ ] Images pushed to ghcr.io successfully

### Monitoring Deployed Application

- [ ] Set up log aggregation (Datadog, Splunk, ELK, etc.)
- [ ] Monitor CPU/Memory usage
- [ ] Monitor request latency
- [ ] Set up alerts for errors
- [ ] Track error rates
- [ ] Monitor API response times

---

## Quick Reference

### Essential Commands

```bash
# Development
docker-compose up --build          # Start all services
docker-compose down                # Stop all services
docker-compose logs -f             # View all logs
docker-compose ps                  # Status of services

# Docker
docker build -t myapp .            # Build image
docker run -p 3000:3000 myapp      # Run container
docker login ghcr.io                # Login to registry

# Git
git init                           # Initialize repo
git add .                          # Stage all changes
git commit -m "message"            # Commit changes
git push origin main               # Push to GitHub
```

### Architecture Overview

```
GitHub Repository
    ↓
    → GitHub Actions (on push)
        ↓
        → Run Tests (frontend + backend)
        ↓
        → Build Docker Images
        ↓
        → Push to ghcr.io
        ↓
        → Security Scan
    ↓
Production Deployment (your choice)
    ↓
    → Cloud Run / ECS / Kubernetes / Docker Compose
```

---

## Resources

- **React**: https://react.dev
- **ReactFlow**: https://reactflow.dev
- **FastAPI**: https://fastapi.tiangolo.com
- **Docker**: https://docs.docker.com
- **GitHub Actions**: https://docs.github.com/en/actions
- **GitHub Container Registry**: https://docs.github.com/en/packages

---

## Support

For issues or questions:
1. Check logs: `docker-compose logs -f`
2. Review GitHub Actions logs
3. Check Troubleshooting section above
4. Consult project documentation

---

**Last Updated**: 2024
**Project Version**: 1.0.0
