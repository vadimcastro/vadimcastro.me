FROM python:3.11-slim

WORKDIR /app

# Install pip explicitly
RUN python3 -m ensurepip --upgrade

# Copy backend requirements
COPY backend/requirements-minimal.txt .

# Install dependencies using python3 -m pip
RUN python3 -m pip install --no-cache-dir -r requirements-minimal.txt

# Copy backend application
COPY backend/ backend/

# Set Python path
ENV PYTHONPATH=/app
ENV ENVIRONMENT=production
ENV AWS_DEFAULT_REGION=us-east-2

# Expose port
EXPOSE 8080

# Run the application
CMD ["python3", "-m", "uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8080"]