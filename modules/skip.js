const {servers} = require('./play')

const skip = async (message) =>{
    const server = servers[message.guild.id];
    if(server.dispatcher) server.dispatcher.end()
};

module.exports = {
    skip,
}