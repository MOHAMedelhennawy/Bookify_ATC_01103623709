# Base image
FROM node:20 AS base

WORKDIR /app
COPY package*.json ./

# Development stage
FROM base AS development
ENV NODE_ENV=development

COPY . .

RUN npm install

EXPOSE 4000
CMD ["npm", "run", "start-dev"]

# Production stage
FROM base AS production
ENV NODE_ENV=production

COPY . .

RUN npm install --only=production

EXPOSE 4000
CMD ["npm", "start"]
