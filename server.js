const path = require("path");
const express = require("express");
const fs = require('fs');
const uniqid = require('uniqid');
const app = express();
const PORT = process.env.PORT || 3000;
// const notes = require("./db/db.json");
const { json } = require("express");

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
    const readNotes = JSON.parse(fs.readFileSync("./db/db.json"))
    res.json(readNotes);
})

// saves new notes
app.post('/api/notes', (req, res) => {
    const newNote = req.body
    newNote.id = uniqid();
    const readNotes = JSON.parse(fs.readFileSync("./db/db.json"))
    readNotes.push(newNote);
    res.json(readNotes);
    fs.writeFile('./db/db.json', JSON.stringify(readNotes), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
})

// deletes notes from the list

app.delete('/api/notes/:id', (req, res) => {
    const deleteId = req.params.id;
    const readNotes = JSON.parse(fs.readFileSync("./db/db.json"))
    const newNotes = () => {
        readNotes.map(note => {
            if (note.id === deleteId) {
                const index = readNotes.indexOf(note)
                readNotes.splice(index, 1);
            }
        })
        return readNotes;
    }
    const writeNotes = () => {
        newNotes();
        fs.writeFile('./db/db.json', JSON.stringify(readNotes), function (err) {
            if (err) throw err;
            console.log('Saved!');
        })
    }
    writeNotes()
    res.json(deleteId)    
})

/**
 * LISTENER
 */

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})