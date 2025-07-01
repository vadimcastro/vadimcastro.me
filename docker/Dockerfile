# docker/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Git information build args
ARG GIT_BRANCH=unknown
ARG GIT_COMMIT_HASH=unknown
ARG GIT_COMMIT_MESSAGE=unknown
ARG GIT_COMMIT_DATE=unknown

# Set Python path
ENV PYTHONPATH=/app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set git information as environment variables
ENV GIT_BRANCH=${GIT_BRANCH}
ENV GIT_COMMIT_HASH=${GIT_COMMIT_HASH}
ENV GIT_COMMIT_MESSAGE=${GIT_COMMIT_MESSAGE}
ENV GIT_COMMIT_DATE=${GIT_COMMIT_DATE}

# Install system dependencies including Docker CLI
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    gnupg \
    lsb-release \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update \
    && apt-get install -y docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY backend/requirements-minimal.txt /app/
RUN python3 -m pip install -r requirements-minimal.txt

# Copy the rest of the application
COPY backend/ /app/

# Make the migration script executable
RUN chmod +x /app/scripts/migrate.sh

# Command to run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]