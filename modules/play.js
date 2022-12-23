const youtube = require('ytdl-core');
const SongMessageRes = require('../res/song')

var servers = {}
let Timeout;
let msg = ''

const play = async (args, message) => {
    const musica = args.pop();
    
    async function ValidateSong(musica){
        return youtube.validateURL(musica)
    }

    if(!musica){ await SongMessageRes.SongArgumentError(message); return }
    if(!await ValidateSong(musica)){ await SongMessageRes.NonValidateUrl(message); return }
    if(!message.member.voice.channel){ await SongMessageRes.NotInVoiceChannel(message); return }

    //Create a server object if it dont exist
    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: [],
        lastMessage: [],
        conexao: [],
        channelID: [],
        message: []
    }
    
    message.member.voice.channel.join().then(async function(connection){
        let channelID = message.member.voice.channelID
        connection.voice.setSelfDeaf(true)

        if(!server.channelID.includes(channelID)){ server.channelID.push(channelID) }
        server.queue.push(await SongMessageRes.GetVideoDetails(musica))
        server.conexao.push(connection)
        server.message.push(message)
        server.queue.length <= 1 ? tocar(connection, message) : AddToLista(message)
    })        

    async function tocar(connection, message){
        clearTimeout(Timeout)
        const server = servers[message.guild.id]
        msg = message
        server.dispatcher = await connection.play(youtube(server.queue[0].Url, {filter:'audioonly'}));
        let info = server.queue[0]
        try{await SongMessageRes.NowPlaying(message, info)}
        catch(error){console.log(error)}
        server.lastMessage.push(message.channel.lastMessageID)
        
        server.dispatcher.on('finish', async function(){
            server.queue.shift()
            if(server.queue[0]){
                try{await SongMessageRes.NextSong(message)}
                catch(error){console.log(error)}

                server.lastMessage.push(message.channel.lastMessageID)
                tocar(connection, message)
            }else{
                Timeout = setTimeout(async function (){ 
                    FindMessages(server.message, server.lastMessage)
                    SongMessageRes.Disconnect(message)
                    server.conexao[0].disconnect(); 
                    limparLista(server.message)
                }, 10000)
            }
        })   
    }

    const server = servers[message.guild.id] 

    async function AddToLista(message){
        let info = await GetVideoDetails(musica)
        await AddToQueue(message, info)
        server.lastMessage.push(message.channel.lastMessageID)         
    }        
};

const limparLista = async (message) => {
    let sv = servers[message[0].guild.id]
    sv.queue = []
    sv.lastMessage = []
    sv.channelID = []
    sv.message = []
}

const getContextMessage = async () => {
    return msg
}

module.exports = {
    play,
    servers,
    limparLista,
    getContextMessage
}