const bcrypt = require('bcryptjs');

// In-memory user store. Data resets every time the server restarts.
const users = [
  {
    id: 1,
    name: 'Demo User',
    email: 'demo@test.com',
    password: bcrypt.hashSync('password123', 10),
  },
];

let nextId = 2;

const findUserByEmail = (email) => users.find((u) => u.email === email);

const findUserById = (id) => users.find((u) => u.id === id);

const createUser = ({ name, email, password }) => {
  const user = { id: nextId++, name, email, password };
  users.push(user);
  return user;
};

module.exports = { findUserByEmail, findUserById, createUser };
