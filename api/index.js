const path = require('path');

// Importa o arquivo compilado main.js
const server = require(path.join(process.cwd(), 'dist/main'));

// Exporta o handler para a Vercel
module.exports = server; 