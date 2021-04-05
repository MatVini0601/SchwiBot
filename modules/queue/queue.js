const { servers } = require("../play/play")
const { NoQueue, GenerateList } = require('../../res/song')

let lista = ''
let fila

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
        await GenerateList(message, listInfo)
    } else{
        await NoQueue(message)
    }
}  

module.exports = {
    queue,
}