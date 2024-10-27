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
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY backend/ .

# Use the full path to the script
CMD ["start-api.sh"]