const mongoose = require("mongoose");

const carroSchemma = new mongoose.Schema({
  name: String,
});

const carro = mongoose.model("Automoviles", carroSchemma);

module.exports = carro;