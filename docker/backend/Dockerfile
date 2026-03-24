# docker/backend/Dockerfile
FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    netcat-traditional \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Add the app directory to PYTHONPATH
ENV PYTHONPATH=/app

# Copy the start script first and make it executable
COPY scripts/start-api.sh /usr/local/bin/start-api.sh
RUN chmod +x /usr/local/bin/start-api.sh

# Copy requirements and install dependencies
COPY backend/requirements-minimal.txt .
RUN python3 -m pip install -r requirements-minimal.txt

# Copy the backend code
COPY backend/ .

# Command will be overridden by docker-compose in dev, but set as default
CMD ["start-api.sh"]
