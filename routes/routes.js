const fs   = require("fs");
const path = require("path");

module.exports = app => {
    // Setup notes variable
    fs.readFile("db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        var myNotes = JSON.parse(data);

        /* 
            ======================================================================
                API ROUTES

                GET /api/notes - gets all notes from db.json
                GET /api/notes:id - gets a specific note from db.json
                POST /api/notes - posts a new note to db.json
                DELETE /api/notes:id - deletes a specfic note from db.json

                HTML ROUTES

                GET /notes - display notes.html
                GET * - display index.html
            ======================================================================
        */
        app.get("/api/notes", function(req, res) {
            res.json(myNotes);
        });

        app.get("/api/notes/:id", function(req, res) {
            let myId = req.params.id;

            res.json(myNotes[myId]);
        });

        app.post("/api/notes", function(req, res) {
            let myNote = req.body;

            myNotes.push(myNote);
            writeJSONFile();

            console.log("Note (add): " + myNote.title);
        });

        app.delete("/api/notes/:id", function(req, res) {
            let myId = req.params['id'];

            myNotes.splice(myId, 1);
            writeJSONFile();

            console.log("Note (delete): " + myId);
        });

        app.get('/notes', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        /*
            ======================================================================        
                Write changes to db.json whenever a note is modified (add, edit,
                    delete)
                consider writeFileSync if code continues to be buggy
            ======================================================================        
        */
        function writeJSONFile() {
            fs.writeFile("db/db.json", JSON.stringify(myNotes), err => {
                if (err) throw err;
                return true;
            });
        }
    });
}