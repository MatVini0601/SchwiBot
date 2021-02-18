const { MessageEmbed } = require('discord.js');

const help = async (message) =>{
    const helpEmbed = new MessageEmbed()
    .setColor("#e534eb")
    .setTitle("Help 👀")
    .addField('__play:__', 'Toca músicas do Youtube (Apenas links)')
    .addField('__skip:__', 'Toca a próxima música da fila de reprodução')
    .addField('__stop:__', 'Para a música e limpa a fila de reprodução')
    .addField('__queue:__', 'Lista a fila de reprodução')

    message.channel.send(helpEmbed) 
}

module.exports = {
    help,
}