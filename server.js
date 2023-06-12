const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv  = require("dotenv");
dotenv.config();
const NoteModule = require('./models/Notes.js');
const cors = require('cors');

app.use(express.json());
app.use(cors());

 mongoose.set("strictQuery", true);

 mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then( () => console.log("Connected to DB"))
.catch((error) => console.log(error.message));

app.get('/notes', async (req, res) => {
    const notes = await NoteModule.find();
   
    res.json(notes)
    });

app.post('/add', async (req,res) =>{
    const note = new NoteModule({
        title: req.body.title,
        content: req.body.content
    });
    await note.save();
    res.json(note);
    //console.log(note);
    console.log("New Note Added Successfully");
});


app.delete('/notes/delete/:id', async (req,res) => {
    const result = await NoteModule.findByIdAndDelete(req.params.id);

    res.json(result);
});


const port = process.env.PORT || 5000;
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${port}`);
});