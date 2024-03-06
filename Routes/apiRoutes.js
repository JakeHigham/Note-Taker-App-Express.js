// apiRoutes.js
const path = require('path');
const fs = require('fs').promises; // Using promises-based fs module for asynchronous operations
const uniqid = require('uniqid');

module.exports = (app) => {
  // GET /api/notes
  app.get('/api/notes', async (req, res) => {
    try {
      const dbPath = path.join(__dirname, '../db/db.json');
      const dbContent = await fs.readFile(dbPath);
      res.json(JSON.parse(dbContent));
    } catch (error) {
      console.error('Error reading notes:', error);
      res.status(500).send('Error reading notes');
    }
  });

  // POST /api/notes
  app.post('/api/notes', async (req, res) => {
    try {
      const dbPath = path.join(__dirname, '../db/db.json');
      const dbContent = await fs.readFile(dbPath);
      const db = JSON.parse(dbContent);
      
      const { title, text } = req.body;
      if (!title || !text) {
        return res.status(400).send('Title and text are required');
      }
      
      const userNote = {
        title,
        text,
        id: uniqid(),
      };

      db.push(userNote);
      await fs.writeFile(dbPath, JSON.stringify(db));
      res.json(db);
    } catch (error) {
      console.error('Error adding note:', error);
      res.status(500).send('Error adding note');
    }
  });

  // DELETE /api/notes/:id
  app.delete('/api/notes/:id', async (req, res) => {
    try {
      const dbPath = path.join(__dirname, '../db/db.json');
      const dbContent = await fs.readFile(dbPath);
      let db = JSON.parse(dbContent);

      const noteId = req.params.id;
      const updatedNotes = db.filter(note => note.id !== noteId);
      
      await fs.writeFile(dbPath, JSON.stringify(updatedNotes));
      res.json(updatedNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).send('Error deleting note');
    }
  });
};
