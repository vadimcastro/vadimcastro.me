FROM python:3.11-slim

WORKDIR /app

# Copy backend files
COPY backend/ ./backend/

# Set working directory to backend
WORKDIR /app/backend

# Install dependencies using python3 -m pip
RUN python3 -m ensurepip --upgrade
RUN python3 -m pip install -r requirements-minimal.txt

# Expose port
EXPOSE 8080

# Set environment variables
ENV ENVIRONMENT=production
ENV AWS_DEFAULT_REGION=us-east-2

# Run the application
CMD ["python3", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]