const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

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
 * LISTENER
 */

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})