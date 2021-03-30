const { servers, getConexao, getLastMessage, limparLista} = require("../play/play")
const { FindMessages, 
        NotInVoiceChannel,
        NoSongPlaying,
        StopDisconnect} = require("../../res/song")

let msg = []

const stop = async (message) => {
    msg = await getLastMessage()
    const connection = await getConexao()
    const server = servers[message.guild.id]
    
    if(!message.member.voice.channel){
        await NotInVoiceChannel(message)
        return
    }

    if(!server){
        await NoSongPlaying(message)
        return
    }else{
        await StopDisconnect(message)
        FindMessages(message, msg)
        limparLista()
        connection.disconnect();
    }
};

module.exports = { 
    stop,
};