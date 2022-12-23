const fs = require('fs').promises;

const stop = require("../modules/stop");
const play = require("../modules/play")
const help = require("../modules/help");
const skip = require("../modules/skip")
const queue = require("../modules/queue");
const config = require('../config.json');

const getModules = async() => {
    var commands = []
    var modules = await fs.readdir("modules")       
      modules.forEach(element => {  
        if (element != ".DS_Store") commands.push(element)   
    })
    config.resources = commands
}

const executeCommand = async (args, command, message) => {
    const avaliableResources = config.resources
    var commandName = command + ".js"
    if (avaliableResources.includes(commandName)) { execute(args, command, message) }
    else{ message.channel.send("Comando não existe")}
}

const execute = (args, command, message) => {
    switch (command) {
        case 'help': help.help(message); break;
        case 'play': play.play(args, message); break;
        case 'skip': skip.skip(message); break;
        case 'stop': stop.stop(message); break;
        case 'queue': queue.queue(message); break;
        default: message.channel.send("Comando não existe"); break;
    }
}
  

module.exports = {
    executeCommand,
    getModules
}