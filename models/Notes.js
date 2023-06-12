
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String, 
    content: String
});

const NoteModule = mongoose.model("Note", noteSchema);

module.exports = NoteModule;

// export default NoteModule;