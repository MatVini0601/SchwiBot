const { servers } = require('./play');
const { MessageEmbed } = require('discord.js');

module.exports = async (args, message) => {
    const server = servers[message.guild.id];

    if (!message.guild.voice.channel || !server || !server.queue.length) {
        const emptyEmbed = new MessageEmbed()
            .setColor('#e534eb')
            .setTitle('Lista de Reprodução vazia');
        message.channel.send(emptyEmbed);
        return;
    }

    const lista = server.queue
        .map((song, i) => `${i + 1} - ${song.title}`)
        .join('\n');

    const queueEmbed = new MessageEmbed()
        .setTitle('Lista de Reprodução')
        .setColor('#e534eb')
        .addField('🎶 Músicas 🎶', lista);

    message.channel.send(queueEmbed);
};
