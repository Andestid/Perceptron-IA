const express = require('express');
const app = express();
app.use(express.json()); //para json
app.use(express.urlencoded({ extended: true })); //para formularios

app.set('view engine','ejs'); //motores de plantilla jes 

app.set('views',__dirname + '/views'); //le decimos plantilla en views

app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    const body = req.body;
    console.log(body);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})
