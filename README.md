# Fix the Login Bug

**Framework:** Express.js  **Difficulty:** Easy  **Topic:** Authentication

## About the app

**SecureNotes** is a small app where users can register, log in, and view their profile.

- `POST /api/auth/register`: create an account (`name`, `email`, `password`)
- `POST /api/auth/login`: log in with `email` and `password`, returns a JWT token
- `GET /api/auth/profile`: returns the logged-in user (requires `Authorization: Bearer <token>`)

Users are stored in memory, so any accounts you register disappear when the server restarts.

## The problem

Users are reporting a serious security issue: **anyone can log in to any account using any password.**

### Current behaviour

Logging in with a registered email and a **wrong** password succeeds and returns a token.

### Expected behaviour

- A **correct** password logs in successfully: `200` with a `token`.
- A **wrong** password is rejected: `401` with `{ "message": "Invalid credentials" }`.
- An unknown email is rejected: `401` with `{ "message": "Invalid credentials" }`.

## How to reproduce

1. Open the preview.
2. Log in with the demo account using a wrong password:
   - Email: `demo@test.com`
   - Password: `anything`
3. You are logged in, but you should get **"Invalid credentials"**.

The demo account's real password is `password123`.

## Running and testing

From the `backend` folder:

```bash
npm run dev   # start the app with auto-reload (already running in the preview)
npm test      # run the sample tests
```

The sample tests only cover part of the expected behaviour. Your submission is graded against a larger set of hidden tests.

## Rules

- Do not change the API routes or the response format.
- Do not remove password hashing.
- You only need to change files inside `backend/src`.
