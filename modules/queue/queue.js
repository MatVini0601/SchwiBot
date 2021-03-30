const { servers} = require("../play/play")
const { MessageEmbed } = require('discord.js');

let lista = ''
let fila = ''

async function getLista(sv) {
    fila = ''
    for(const [index] of sv.queue.entries()){
        let title = await sv.queue[index].Title
        lista = (`${index+1} - ${title}\n`)
        fila += lista
    }   
    return fila
}

const queue = async (message) => {
    const server = servers[message.guild.id]
    if(message.guild.voice.channel){
        let listInfo = await getLista(server)
        const queueList = new MessageEmbed()
            .setTitle("Lista de Reprodução")
            .setColor("#e534eb")
            .addField('🎶 Músicas 🎶', listInfo);
        message.channel.send(queueList)
    } else{
        const queueList = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle("Lista de Reprodução vazia")

        message.channel.send(queueList)
    }
}  

module.exports = {
    queue,
}