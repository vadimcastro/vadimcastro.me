# docker/backend/Dockerfile
FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the start script first and make it executable
COPY scripts/start-api.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/start-api.sh

# Copy requirements and install dependencies
COPY backend/requirements-minimal.txt .
RUN python3 -m pip install --no-cache-dir -r requirements-minimal.txt

# Copy the backend code
COPY backend/ .

# Use the full path to the script
CMD ["start-api.sh"]

FROM python:3.11-slim
WORKDIR /app
# Add the app directory to PYTHONPATH
ENV PYTHONPATH=/app
# Install system dependencies
RUN apt-get update && apt-get install -y \
build-essential \
libpq-dev \
netcat-traditional \
&& rm -rf /var/lib/apt/lists/*
# Copy the backend code
COPY backend/ .
# Copy minimal requirements
COPY backend/requirements-minimal.txt .
# Install Python dependencies
RUN python3 -m pip install --no-cache-dir -r requirements-minimal.txt
# Make sure the script is executable
RUN chmod +x scripts/start.sh
# Command will be overridden by docker-compose
CMD ["./scripts/start.sh"]