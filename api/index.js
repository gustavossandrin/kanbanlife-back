const path = require('path');
const app = require('../dist/main').default;

module.exports = async (req, res) => {
  const server = await app;
  server(req, res);
}; 