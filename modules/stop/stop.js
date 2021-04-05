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
                StopDisconnect(message);
                FindMessages(message, server.lastMessage);
                server.conexao[0].disconnect();
                limparLista();
            }
        });
    }
};

module.exports = { 
    stop,
    limparLista
};