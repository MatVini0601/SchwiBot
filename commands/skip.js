const { servers } = require('./play');

module.exports = async (args, message) => {
    const server = servers[message.guild.id];
    if (!server || !server.dispatcher) return;
    server.dispatcher.end();
};
