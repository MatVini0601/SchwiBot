<<<<<<< Updated upstream:modules/skip/skip.js
const {servers} = require('../play/play')
=======
const {servers} = require('./play')
>>>>>>> Stashed changes:modules/skip.js

const skip = async (message) =>{
    const server = servers[message.guild.id];
    if(server.dispatcher) server.dispatcher.end()
};

module.exports = {
    skip,
}