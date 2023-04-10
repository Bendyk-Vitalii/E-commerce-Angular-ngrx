FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY authentication/package*.json ./
COPY checkout/package*.json ./

# Install dependencies for both authentication and checkout folders
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Expose port 3000 for authentication and 3001 for checkout
EXPOSE 3000 3001

# Start the authentication server and checkout server
CMD ["npm", "run", "start:dev"]
