const fs = require('fs').promises;
const { client, config, Discord, message } = require('../../bot')

const stop = require("../stop/stop");
const play = require("../play/play")
const help = require("../help/help");
const skip = require("../skip/skip")
const queue = require("../queue/queue");

const execute = async (comando, args, module, message) => {
    var dir = await fs.readdir(`modules/${module}`)
    dir.forEach(fileName => {
        if(fileName == comando + ".js"){
            if(comando == 'help'){
                help.help(message)
            }else if(comando == 'play'){
                play.play(args, message)
            }else if(comando == 'skip'){
                skip.skip(message)
            }else if(comando == 'stop'){
                stop.stop(message)
            }else if(comando == 'queue'){
                queue.queue(message)
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