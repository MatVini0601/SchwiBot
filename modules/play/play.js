const { client, config, Discord} = require('../../bot')
const youtube = require('ytdl-core');
const { MessageEmbed } = require('discord.js');

var servers = {}
let connectionParameter = null
let lastMessage = null

const play = async (args, message) => {
    const musica = args.pop();
    
    async function ValidateSong(musica){
        let validate = youtube.validateURL(musica)
        return validate 
    }

    let validatedSong = await ValidateSong(musica)
    if(!validatedSong){
        const SongInfoEmbed = new MessageEmbed()
        .setColor("#e534eb")
        .setTitle("❌ Erro ❌")
        .addField("Música não encontrada:", "Link inválido")

        message.channel.send(SongInfoEmbed)
        return
    }
    
    if(!musica){
        const SongInfoEmbed = new MessageEmbed()
        .setColor("#e534eb")
        .setTitle("❌ Erro ❌")
        .addField("Argumento:", "Schwi precisa de um link para poder tocar alguma música")

        message.channel.send(SongInfoEmbed)
        return
    }
    if (message.member.voice.channel) {
        message.member.voice.channel.join()
        .then(async function(connection){
            server.queue.push(musica)
            if(server.queue.length > 1){
                tocar(connection, message, 2)
            }else{
                tocar(connection, message, 1)
            }
            connectionParameter = connection
            
        })        
    }else{
        const SongInfoEmbed = new MessageEmbed()
        .setColor("#e534eb")
        .setTitle("❌ Erro ❌")
        .addField("Conexão:", "Você não está conectado a um canal de voz")

        message.channel.send(SongInfoEmbed)
        return
    }

    async function tocar(connection, message, versao){
        const server = servers[message.guild.id]

        async function GetVideoDetails(url){
            let video = await youtube.getInfo(url)
            const songTitle = video.videoDetails.title
            const author = video.videoDetails.author.name
            const likes = video.videoDetails.likes
            const dislikes = video.videoDetails.dislikes
            return Details = {title: songTitle, autor: author,likes: likes,dislikes: dislikes}
        }

        if(versao == 1){
            server.dispatcher = connection.play(youtube(server.queue[0],{filter:'audioonly'}));

            let info = await GetVideoDetails(server.queue[0])
            if(info){
                const SongInfoEmbed = new MessageEmbed()
                .setColor("#e534eb")
                .setTitle("🎶 Tocando Agora 🎶")
                .addField("Título:", info.title)
                .addField("Canal:", info.autor)
                .addField("👍Likes:", info.likes, true)
                .addField("👎Dislikes:", info.dislikes, true);

                if(lastMessage){
                    lastMessage.delete()
                    lastMessage = null
                }
                
                await message.channel.send(SongInfoEmbed)
                lastMessage = message.channel.lastMessage;

            }else{
                message.channel.send(`Informações não puderam ser obtida devido a algum erro`)
            }
        
            server.dispatcher.on('finish', async function(){
            server.queue.shift()
                if(server.queue[0]){
                    const SongInfoEmbed = new MessageEmbed()
                    .setColor("#e534eb")
                    .setTitle("🎶 Indo para a próxima música 🎶")

                    if(lastMessage){
                        lastMessage.delete()
                        lastMessage = null
                    }
                    await message.channel.send(SongInfoEmbed)
                    tocar(connection, message, 1)
                    lastMessage = message.channel.lastMessage;

                }else{
                    const SongInfoEmbed = new MessageEmbed()
                    .setColor("#e534eb")
                    .setTitle("Good Bye🖐")
                    .addField("Desconectando","Nenhuma música detectada na fila")

                    lastMessage.delete()
                    lastMessage = null

                    message.channel.send(SongInfoEmbed)
                    connection.disconnect();
                }
            }) 
        }else{
            let info = await GetVideoDetails(musica)
            if(info){
                const SongInfoEmbed = new MessageEmbed()
                .setColor("#e534eb")
                .setTitle("🎶 Adicionada à fila de reprodução 🎶")
                .addField("Título:", info.title)
                .addField("Canal:", info.autor)

                await message.channel.send(SongInfoEmbed)
                lastMessage = message.channel.lastMessage;
                
            }else{
                message.channel.send(`Informações não puderam ser obtida devido a algum erro`)
            }              
        }            
    }

    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
    }

    const server = servers[message.guild.id]    
};

const getConexao = async () =>{
    return connectionParameter
};

const getLastMessage = async () =>{
    return lastMessage
};
module.exports = {
    play,
    servers,
    client,
    getConexao,
    getLastMessage,
}