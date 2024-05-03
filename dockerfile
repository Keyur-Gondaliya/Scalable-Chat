# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY Scalable-Chat/apps/server/package*.json ./Scalable-Chat/apps/server/
COPY Scalable-Chat/apps/web/package*.json ./Scalable-Chat/apps/web/

# Install npm dependencies for server and web
RUN cd Scalable-Chat/apps/server && npm install
RUN cd Scalable-Chat/apps/web && npm install

# Copy the entire project directory to the working directory
COPY . .

# Expose ports for frontend and backend
EXPOSE 3000
EXPOSE 3001


# Command to run the server
CMD ["npm", "run", "dev"]