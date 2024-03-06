// dependencies
const path = require('path');

// routing
module.exports = (app) => {
  // creating routes
  // GET /notes should return the notes.html file.
  app.get('/notes', (req, res) => {
    // Sends the notes.html file when the /notes route is accessed
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  // GET * should return the index.html file.
  app.get('*', (req, res) => {
    // Sends the index.html file for all other routes (catch-all route)
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
};
