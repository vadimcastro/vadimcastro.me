# docker/frontend/Dockerfile
FROM node:22-alpine
WORKDIR /app
ENV npm_config_fetch_retries=5
ENV npm_config_fetch_retry_factor=2
ENV npm_config_fetch_retry_mintimeout=20000
ENV npm_config_fetch_retry_maxtimeout=120000
ENV npm_config_maxsockets=1
ENV npm_config_loglevel=error

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --no-audit --no-fund || npm ci --no-audit --no-fund

COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/next.config.js ./
COPY frontend/postcss.config.js ./
COPY frontend/tsconfig.json ./

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_URL=https://vadimcastro.com
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

EXPOSE 3000
CMD ["sh", "-c", "npm start"]