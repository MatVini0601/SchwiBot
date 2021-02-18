const { servers} = require("../play/play")
const { MessageEmbed } = require('discord.js');
const youtube = require('ytdl-core');

let lista = ''
let fila = ''

async function GetVideoDetails(url){
    let video = await youtube.getInfo(url)
    const songTitle = video.videoDetails.title
    return Details = {title: songTitle}
}

async function getLista(sv) {
    lista = ''
    fila = ''
    for(const [index, url] of sv.queue.entries()){
        let title = await GetVideoDetails(url)
        lista = (`${index+1} - ${title.title}\n`)
        fila += lista
    }   
    return fila
    // let Reproducao = sv.queue.forEach(async element => {
    //     let details = await GetVideoDetails(element)        
    //     musicInfo = `${index} - ${details.title}`
    //     lista.push(musicInfo)
    //     index++
    // });
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
    }else{
        const queueList = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle("Lista de Reprodução vazia")

        message.channel.send(queueList)
    }
}  

module.exports = {
    queue,
}