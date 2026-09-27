const app = require('./app');
const { PORT } = require('./config');

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Auth app running on http://localhost:${PORT}`);
});
