/// /*-------------------------EXPRESS-------------- */
// /* Conexión y configuración de express */
const express = require("express"); //importo el modulo de express
const cors = require("cors"); //importo el modulo de cors
const app = express(); // lo ejecutamos y guardamos en una variable (guardamos una INSTANCIA de express)
const port = 3000;
const jwt = require('jsonwebtoken'); // constante del puerto que levantare en el servidor
//conectamos a mongo---
require("./db.js"); /* ESTA LINEA ME CONECTA CON MONGO DB */

// /* ------MIDDLEWARES (configuraciones express)---------------------------------------------------------- */
app.use(express.json()); /*--Para aceptar json(body) en mis peticiones http-- */
app.use(cors()); /* Para aceptar peticiones del front o postman*/

/* -------------------------- */
// /* Vinculo mis modelos para usar rutas */
const carro = require("./Models/Automoviles"); /* Conectamos el model correspondiente */
const User = require("./Models/Users");
// /* RUTAS */

app.get("/", (req, res) => {
  res.send(
    "Hello World!, Ruta inicial de ejemplo, Bienvenido a la api de automoviles y mongoose"
  );
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ username: user.username }, 'secreto', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/user", async (req, res) => {
  const {
    username,
    email,
    identification_number,
    password,
    phone_number,
    productos, 
  } = req.body;
  

  const productosEncontrados = await carro.find({ name: { $in: productos } });
  

 
  const user = new User({
    username: username,
    email: email,
    identification_number: identification_number,
    password: password,
    phone_number: phone_number,
    productos: productosEncontrados.map((producto) => producto._id), });

  
  user.password = await User.encryptPassword(password);

  
  const newUser = user.save();

  res.status(200).json({
    _id: newUser._id,
    username: newUser.username,
    mail: newUser.email,
  });


});


module.exports = { app, port };