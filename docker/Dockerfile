FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Set Python path
ENV PYTHONPATH=/app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy only what we need
COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Create app directory
RUN mkdir -p /app/app

# Copy only the app code
COPY backend/app/ /app/app/

# Command to run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]