FROM node:22-alpine

WORKDIR /app

# Install dependencies first so this layer is cached between code changes.
# node_modules stays owned by root, so the user cannot modify it.
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm ci && npm cache clean --force

# Problem files. Only the editable folders are owned by the non-root user.
COPY README.md problem.yaml ./
COPY --chown=node:node frontend ./frontend
COPY --chown=node:node backend/src ./backend/src
COPY backend/tests ./backend/tests

USER node
WORKDIR /app/backend

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "dev"]
