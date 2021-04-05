const { client } = require('../../bot')
const youtube = require('ytdl-core');
const { SongArgumentError,
        NonValidateUrl,
        NotInVoiceChannel,
        NowPlaying, 
        NextSong,
        Disconnect,
        AddToQueue,
        FindMessages,
        GetVideoDetails } = require('../../res/song');

var servers = {}
let msg = ''
let Timeout;

const play = async (args, message) => {
    const musica = args.pop();
    msg = message
    
    async function ValidateSong(musica){
        return youtube.validateURL(musica)
    }

    const validatedSong = await ValidateSong(musica)
    if(!musica){ await SongArgumentError(message); return }
    if(!validatedSong){ await NonValidateUrl(message); return }
    if(!message.member.voice.channel){ await NotInVoiceChannel(message); return }
    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: [],
        lastMessage: [],
        conexao: [],
        channelID: []
    }
    const server = servers[message.guild.id] 
    
    message.member.voice.channel.join().then(async function(connection){
        connection.voice.setSelfDeaf(true)
        server.queue.push(await GetVideoDetails(musica))
        server.conexao.push(connection)
        if(!server.channelID.includes(message.member.voice.channelID)){
            server.channelID.push(message.member.voice.channelID)
        }
        server.queue.length <= 1 ? tocar(connection, message) : AddToLista(message)
        connectionParameter = connection
    })        

   
    async function tocar(connection, message){
        clearTimeout(Timeout)
        const server = servers[message.guild.id]
        
        server.dispatcher = connection.play(youtube(server.queue[0].Url, {filter:'audioonly'}));
        let info = server.queue[0]

        try{await NowPlaying(message, info)}
        catch(error){console.log(error)}
        
        server.lastMessage.push(message.channel.lastMessageID)
        
        server.dispatcher.on('finish', async function(){
            server.queue.shift()
            if(server.queue[0]){
                try{await NextSong(message)}
                catch(error){console.log(error)}
                server.lastMessage.push(message.channel.lastMessageID)
                tocar(connection, message)
            }else{
                Timeout = setTimeout(async function (){ 
                    FindMessages(message, server.lastMessage)
                    limparLista()
                    Disconnect(message)
                    server.conexao[0].disconnect(); 
                }, 10000)
            }
        })   
    }

    async function AddToLista(message){
        let info = await GetVideoDetails(musica)
        await AddToQueue(message, info)
        server.lastMessage.push(message.channel.lastMessageID)         
    }        
};

const limparLista = async () => {
    const server = servers[msg.guild.id]
    server.queue = []
    server.lastMessage = []
    server.channelID = []
}

const getContextMessage = async () => {
    return msg
}

module.exports = {
    play,
    servers,
    client,
    getContextMessage,
    limparLista
}