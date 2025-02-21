# Use a compatible Node.js version (e.g., 18.x or 20.x)
FROM node:18-alpine 

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) first to leverage Docker's caching
COPY package.json package-lock.json ./

# Install dependencies (including dev dependencies for development)
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that Next.js runs on (default is 3000)
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]