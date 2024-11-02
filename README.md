# portal-berita
Portal Berita Aplikasi Portal Berita adalah sebuah proyek web berbasis Express.js yang dikembangkan sebagai bagian dari proses rekrutmen PT Recharge POD LTD Bali

# API Documentation

This is an API application built with Express and Sequelize. The application allows users to manage news articles and their categories, with JWT-based authentication and API key verification. Swagger has been set up for API documentation.

## Requirements

- Node.js (v14 or higher)
- MySQL database

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/yourrepository.git
cd yourrepository

**### 2. Install dependencies**
npm install

**### 3. Configure Environment Variables**
Create .env  file in the root directory and add the following environment variables:
DB_HOST_DEV = your_db_host
DB_USER_DEV = your_db_username
DB_PASS_DEV = your_db_password
DB_NAME_DEV = your_db_name

JWT_KEY = your_jwt_key

**### 4. Set up database**
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

**### 5. Sart Server**
npm start

**### 6. JWT Authentication**
Some routes require JWT authentication. Obtain a token by logging in and include it in the authorization header as follows:
authorization: <your_jwt_token>


**### 7. API Documentation**
http://<your_localhost>/api-docs
