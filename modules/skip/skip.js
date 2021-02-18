const { client, config, Discord} = require('../../bot')
const youtube = require('ytdl-core');
const {servers} = require("../play/play")

const skip = async (message) =>{
    const server = servers[message.guild.id];
    if(server.dispatcher) server.dispatcher.end()
};

module.exports = {
    skip,
}