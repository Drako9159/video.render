# Stage 1: Build the backend
FROM node:14-alpine AS backend-builder
WORKDIR /app
COPY package.json package-lock.json index.js /app/
RUN npm install
COPY . /app


# Stage 3: Create the production image
FROM node:14-alpine
WORKDIR /app
COPY --from=backend-builder /app/ /app/

# Copy Storage
# COPY storage /app/storage
# COPY credentials.json /app/

# Set the environment variable backend
RUN apk update
RUN apk add ffmpeg


ENV PORT='3000'

# Expose the desired port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start"]
