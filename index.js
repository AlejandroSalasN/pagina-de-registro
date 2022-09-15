const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');

//inicializando
const app = express();

app.use(express.static(__dirname + '/'));

//
app.set('port', process.env.PORT || 3000);
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb+srv://alejandro_s:salas1610@cluster0.rwtkpqx.mongodb.net/mana?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB conected"))
.catch(err => console.log(err));

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is connected');
});

//esquema
const registroEsquema = {
    nombre: {
        type: String,
        trim: true,
    },
    apellido: {
        type: String,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    }
};

const Persona = mongoose.model("registro", registroEsquema);

app.get('/', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'index.html'));
    res.render('index');
});

app.get('/registrados', async (req, res) => {
    const users = await Persona.find();
    console.log(users);
    res.json(users);
});

app.post("/", async (req, res) => {
    let usuario = new Persona({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
    });
    await usuario.save();
    res.redirect("/");
});



app.listen(app.get('port'), () => {
    console.log("El servidor está corriendo en el puerto: ", app.get('port'));
});