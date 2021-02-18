const { client, config, Discord} = require('../../bot')
const { servers, getConexao, getLastMessage} = require("../play/play")
const { MessageEmbed } = require('discord.js');



const stop = async (message) =>{
    const connection = await getConexao()
    const lastMessage = await getLastMessage()
    const server = servers[message.guild.id]
    if(!server){
        const SongInfoEmbed = new MessageEmbed()
        .setColor("#e534eb")
        .setTitle("❌ Nenhuma música tocando ❌")
        .addField("Dica", "Tente colocar algo para tocar 😉")

        message.channel.send(SongInfoEmbed)
    }else{
        if(message.guild.voice.channel){
            const SongInfoEmbed = new MessageEmbed()
                .setColor("#e534eb")
                .setTitle("❌ Parando a música ❌")
                .addField("Desconectando...", "Até mais")
    
            message.channel.send(SongInfoEmbed)
            server.queue = []
            lastMessage.delete()
            connection.disconnect();
        }else{
            const SongInfoEmbed = new MessageEmbed()
            .setColor("#e534eb")
            .setTitle("❌ Nenhuma música tocando ❌")
            .addField("Dica", "Tente colocar algo para tocar 😉")
    
            message.channel.send(SongInfoEmbed)
        }
    }
};

module.exports = { 
    stop,
};