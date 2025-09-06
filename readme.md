# Gemini Clone - Backend

This is the backend service for the Gemini Clone application, a full-featured chat application that leverages Google's Gemini for conversational AI. It is built with Node.js, Express, and MongoDB, and provides a robust, secure, and scalable foundation for the chat functionalities.

## Features

*   **🤖 AI-Powered Chat**: Core functionality powered by the Google Gemini API for intelligent and context-aware conversations.
*   **🔐 Secure Authentication**: Robust authentication system using JSON Web Tokens (JWT) with Access and Refresh tokens.
    *   **Access Tokens**: Short-lived tokens for accessing protected resources.
    *   **Refresh Tokens**: Long-lived tokens (30 days) stored securely in `httpOnly` cookies to get new access tokens without requiring the user to log in again.
    *   **Token Rotation**: Refresh tokens are automatically rotated upon use to enhance security.
*   **👤 User Management**:
    *   User registration with password hashing using `bcrypt`.
    *   Secure login with email/username and password.
    *   Secure logout that invalidates the refresh token on the server.
*   **🎭 Role-Based Access Control (RBAC)**:
    *   Middleware to protect routes based on user roles (e.g., `user`, `admin`).
    *   Easily extensible to add more roles and protect different API endpoints.
*   **💬 Chat History**:
    *   Persists entire chat conversations for each user in the MongoDB database.
    *   Supports multimodal chat history, including text, images, audio, and video parts in messages.
*   **🛠️ Modern Tech Stack**:
    *   **Node.js & Express**: For a fast and efficient server.
    *   **MongoDB & Mongoose**: For flexible and scalable data storage.
    *   **JWT (jsonwebtoken)**: For stateless and secure authentication.
    *   **CORS**: Configured to work with a separate frontend application.
    *   **ES Modules**: Uses modern JavaScript syntax.

## Project Structure

```
Backend/
├── middlewares/
│   └── auth.js         # JWT authentication and authorization middleware
├── models/
│   ├── Chat.js         # Mongoose schema for Chats
│   └── users.js        # Mongoose schema for Users
├── routes/
│   ├── auth.js         # Routes for /register, /login, /logout, /token
│   └── chatRoutes.js   # Routes for chat interactions
├── utils/
│   ├── gemini.js       # Utility for interacting with the Gemini API
│   └── jwt.js          # JWT generation and verification helpers
├── .env.example        # Example environment variables
├── app.js              # Main Express application setup
└── package.json
```

## Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   MongoDB
*   A Google Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd gemini-clone/Backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `Backend` directory and add the following variables:

    ```env
    # Server Configuration
    NODE_ENV=development
    FRONTEND_URL=http://localhost:3000 # Or your frontend's URL

    # MongoDB
    MONGO_URI=mongodb://127.0.0.1/gemini-clone

    # JWT Secrets
    JWT_SECRET=your_super_secret_jwt_key
    JWT_REFRESH_SECRET=your_super_secret_jwt_refresh_key

    # Google Gemini API
    GEMINI_API_KEY=your_gemini_api_key
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    The server will be running on `http://localhost:8080`.

## API Endpoints

*   `POST /api/auth/register` - Register a new user.
*   `POST /api/auth/login` - Log in a user and receive tokens.
*   `POST /api/auth/token` - Refresh an access token.
*   `POST /api/auth/logout` - Log out a user.
*   `GET /api/chats` - Get all chats for the authenticated user.
*   `POST /api/chats` - Create a new chat.
*   ... and more in `routes/`.

---

This README provides a solid starting point for your project. Feel free to customize it further as you add more features!

<!--
[PROMPT_SUGGESTION]How can I improve the security of my JWT implementation?[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Can you help me write the JSDoc comments for the `auth.js` routes?[/PROMPT_SUGGESTION]
