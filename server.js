const path = require("path");
const express = require("express");
const fs = require('fs');
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

app.get('/api/notes', (req, res) => {
    console.log(notes)
    res.json(notes);
})

/**
 * LISTENER
 */

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})