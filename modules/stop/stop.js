const { servers, limparLista } = require("../play/play")
const { FindMessages, 
        NotInVoiceChannel,
        NoSongPlaying,
        StopDisconnect} = require("../../res/song")



const stop = async (message) => {
    const server = servers[message.guild.id]
    if(!server){ return }
    
    if(!message.member.voice.channel){
        await NotInVoiceChannel(message)
        return
    }

    if(!server.queue[0]){
        NoSongPlaying(message)
        return
    }else{
        server.channelID.forEach(element => {
            if(element == message.member.voice.channelID){
                StopDisconnect(server.message);
                FindMessages(server.message, server.lastMessage);
                limparLista(server.message);
                server.conexao[0].disconnect();
            }
        });
    }
};

module.exports = { 
    stop,
};