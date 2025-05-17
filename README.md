# Event Booking App

A full-featured event booking web application that allows users to browse, register, and book events. The app includes secure authentication (local and Google OAuth), server-side rendering, and robust validation and logging.

---

## 🚀 Features

- User registration and login (Email & Google OAuth 2.0)
- Secure authentication with JWT and password hashing
- Email notifications (e.g., booking confirmation)
- File upload support (e.g., event images)
- Admin dashboard to manage events and users
- Pagination for browsing events efficiently
- Input validation using JSON Schema (AJV)
- Logging and error tracking with Winston & Morgan
- Rate limiting and HTTP security headers
- Redis integration (for session/cache handling)

---

## 🛠️ Technologies Used

### Backend
- **Node.js & Express.js** – RESTful API and server-side logic
- **Prisma ORM** – Database access and modeling
- **Redis** – Caching and session management
- **Passport.js & Google OAuth 2.0** – Authentication strategies
- **jsonwebtoken** – Token-based authentication
- **bcrypt** – Password hashing
- **helmet, cors, express-rate-limit** – App security
- **AJV + ajv-errors + ajv-formats** – JSON schema validation

---

## Installation and Setup
Follow these steps to set up and run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/MOHAMedelhennawy/Bookify_ATC_01103623709.git
cd Bookify
```

2. Create an `.env` file with the following example:

```
# Server
PORT=4000
NODE_ENV=development

# Database
DB_HOST=db
DB_PORT=5432
DB_USER=root
DB_PASSWORD=root
DB_NAME=bookify
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}

# Redis
REDIS_HOST=caching
REDIS_PORT=6379

# JWT
JWT_SECRET=<your-secret-uuid>

# Google OAuth
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

# Email (Nodemailer)
MAILER_USER=<your-email>
MAILER_PASSWORD="<your-app-password>"
```

3. Install dependencies:
```bash
npm install
```

4. Build and start the Docker containers:
```bash
docker-compose -f docker-compose.dev.yml up --build
```

## Prerequisites
- Docker