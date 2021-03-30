const { client} = require('../../bot')
const youtube = require('ytdl-core');
const { SongArgumentError,
        NonValidateUrl,
        NotInVoiceChannel,
        NowPlaying, 
        NextSong,
        Disconnect,
        AddToQueue,
        FindMessages } = require("../../res/song");

var servers = {}
let connectionParameter = null
let lastMessage = []
let msg = ''

const play = async (args, message) => {
    const musica = args.pop();
    msg = message
    
    async function ValidateSong(musica){
        return youtube.validateURL(musica)
    }

    const validatedSong = await ValidateSong(musica)
    if(!musica){ SongArgumentError(message); return }
    if(!validatedSong){ NonValidateUrl(message); return }
    if(!message.member.voice.channel){ NotInVoiceChannel(message); return }
    
    message.member.voice.channel.join().then(async function(connection){
        server.queue.push(await GetVideoDetails(musica))
        server.queue.length <= 1 ? tocar(connection, message) : AddToLista(message)
        connectionParameter = connection
    })        

    async function GetVideoDetails(url){
        let video = await youtube.getInfo(url)
        let Song = {
            Url: url,
            Title: video.videoDetails.title,
            Author: video.videoDetails.author.name,
            Likes: video.videoDetails.likes,
            Deslikes: video.videoDetails.dislikes
        }
       return Song; 
    }

    async function tocar(connection, message){
        const server = servers[message.guild.id]

        server.dispatcher = connection.play(youtube(server.queue[0].Url, {filter:'audioonly'}));
        let info = server.queue[0]

        await NowPlaying(message, info)
        lastMessage.push(message.channel.lastMessageID)
        
        server.dispatcher.on('finish', async function(){
            server.queue.shift()
            if(server.queue[0]){
                await NextSong(message)
                lastMessage.push(message.channel.lastMessageID)
                tocar(connection, message)
            }else{
                setTimeout(async function (){ 
                    FindMessages(message, lastMessage)
                    limparLista()
                    Disconnect(message)
                    connection.disconnect(); 
                }, 60000)
            }
        })   
    }

    async function AddToLista(message){
        let info = await GetVideoDetails(musica)
        await AddToQueue(message, info)
        lastMessage.push(message.channel.lastMessageID)         
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

const limparLista = async () => {
    let server = servers[msg.guild.id]
    server.queue = []
    lastMessage = []
}

const getContextMessage = async () => {
    return msg
}

module.exports = {
    play,
    servers,
    client,
    getConexao,
    getLastMessage,
    getContextMessage,
    limparLista
}