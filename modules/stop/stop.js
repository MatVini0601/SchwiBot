const { servers, limparLista} = require("../play/play")
const { FindMessages, 
        NotInVoiceChannel,
        NoSongPlaying,
        StopDisconnect} = require("../../res/song")

const stop = async (message) => {
    const server = servers[message.guild.id]
    
    if(!message.member.voice.channel){
        await NotInVoiceChannel(message)
        return
    }

    if(!server){
        await NoSongPlaying(message)
        return
    }else{
        await StopDisconnect(message);
        FindMessages(message, server.lastMessage);
        limparLista();
        server.conexao[0].disconnect();
    }
};

module.exports = { 
    stop,
};