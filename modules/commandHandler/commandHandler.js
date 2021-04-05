const fs = require('fs').promises;

const stop = require("../stop/stop");
const play = require("../play/play")
const help = require("../help/help");
const skip = require("../skip/skip")
const queue = require("../queue/queue");

const execute = async (comando, args, module, message) => {
    var dir = await fs.readdir(`modules/${module}`)
    dir.forEach(fileName => {
        if(fileName == comando + ".js"){
            switch (comando) {
                case 'help':
                    help.help(message)
                    break;
                case 'play':
                    play.play(args, message)
                    break;
                case 'skip':
                    skip.skip(message)
                    break;
                case 'stop':
                    stop.stop(message)
                    break;
                case 'queue':
                    queue.queue(message)
                    break;
                default:
                    message.channel.send("Comando não existe")
                    break;
            }
        }
    });
}



const commandQuery = async (args, comando, message) => {
    var modules = await fs.readdir("modules")       
      modules.forEach(element => {
          var commands = []
          commands.push(element)
          commands.forEach(com => {
            if(com == comando){
                execute(comando, args, element, message)
            }
        })
    })
}

module.exports = {
    commandQuery,
}