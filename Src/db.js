const mongoose = require('mongoose');



async function connection() {
    

mongoose.connect('mongodb+srv://andersonsosa1015:Alvarado15@@cluster0.jcqddrw.mongodb.net/?retryWrites=true&w=majority')

.catch((err) => console.log(err));

};

module.exports = {connection};






