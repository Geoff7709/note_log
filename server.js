const path = require("path");
const express = require("express");
const fs = require('fs');
const uniqid = require('uniqid');
const app = express();
const PORT = process.env.PORT || 3000;
const notes = require("./db/db.json")

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended:true }));
app.use(express.json());

/**
 * HTML ROUTES
 */

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
})

/**
 * API ROUTES
 */
//renders notes in DOM 
app.get('/api/notes', (req, res) => {
    res.json(notes);
})

// saves new notes
app.post('/api/notes', (req, res) => {
    const newNote = req.body
    newNote.id = uniqid();
    notes.push(newNote);
    res.json(notes);
    fs.writeFile('./db/db.json', JSON.stringify(notes), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
})

// deletes notes from the list

app.delete('api/notes/:id', (req, res) => {
    console.log(req.params.id)
})

/**
 * LISTENER
 */

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})