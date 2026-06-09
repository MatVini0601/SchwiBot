const { servers, limparServidor } = require('./play');
const embeds = require('../res/embeds');

module.exports = async (args, message) => {
    if (!message.member.voice.channel) {
        await embeds.NotInVoiceChannel(message);
        return;
    }

    const server = servers[message.guild.id];
    if (!server || !server.queue.length) {
        await embeds.NoSongPlaying(message);
        return;
    }

    await embeds.StopDisconnect(message);
    embeds.FindMessages(message, server.lastMessage);
    server.connection.disconnect();
    limparServidor(message.guild.id);
};
