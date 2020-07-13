const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const youtube = require('ytdl-core');


var parametro = ''
var servers = {}
let modo = 0;

client.on("ready",() =>{
console.log(`Bot ativo com ${client.users.cache.size} usuarios em ${client.guilds.cache.size}`);
client.user.setActivity('s!help | Ex-Machina');
});

client.on("message", async message =>{
    if(message.author.bot) return
    if(message.channel.type == 'dm') return message.channel.send('Schwi não tem permissão para conversar por dm... Schwi triste')
    if(!message.content.toLowerCase().startsWith('s!')) return

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    const comandosAceitos = {

        async ping () {
            const m = await message.channel.send("Ping?")
            m.edit(`Esta unidade diz: Latência de Schwi é ${m.createdTimestamp - message.createdTimestamp}ms.`);
        },
        async play(){
            const musica = args.pop();
            
            function tocar(connection, message){
                const server = servers[message.guild.id]
                if(server.queue.length == 1){

                        if(modo == 0){
                            message.channel.send("```Esta unidade diz:\nSchwi encontrou a música, Schwi feliz...iniciando dispositivo de áudio```")
                        }
                                     
                    server.dispatcher = connection.play(youtube(server.queue[0],{filter:'audioonly'}));

                    youtube.getInfo(server.queue[0],function(err,info){
                            const songTitle = info.title
                            message.channel.send(`Sendo tocada agora: ${songTitle}`)
                        })
                    
                        server.dispatcher.on('finish', function(){
                        server.queue.shift()
                            if(server.queue[0]){
                                message.channel.send("```Esta unidade diz:\nIndo para próxima música da lista```")
                                tocar(connection, message)
                            }else{
                                message.channel.send("```Esta unidade diz:\nNenhuma música detectada na fila...desconectando```")
                                connection.disconnect();
                            }
                        }) 
                }else{
                    youtube.getInfo(server.queue[0],function(err,info){
                        const songTitle = info.title
                        message.channel.send(```Esta unidade diz: ${songTitle} foi adicionada à lista de reprodução```) 
                    })                   
                }            
            }

            if(!musica){
                message.channel.send("```Esta unidade diz\nSchwi precisa de um link para executar essa função```")
                return
            }
            if (!message.member.voice.channel) {
                message.channel.send("```Esta unidade diz:\nVocê não esta conectado a um canal de música```")
                return
            }
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            const server = servers[message.guild.id]
            server.queue.push(musica);

            if(message.member.voice.channel) message.member.voice.channel.join()
            .then(function(connection){
                modo = 0;
                tocar(connection, message)
                parametro = connection;
            })
        },
        async skip(){
            const server = servers[message.guild.id]
            message.channel.send("```Esta unidade diz:\nExecutando comando...indo para próxima música da lista```")
            modo = 1
            if(server.dispatcher) server.dispatcher.end()
        },
        async stop(){
            const server = servers[message.guild.id]
            const connection = parametro
            if(parametro){
                message.channel.send("```Esta unidade diz:\nExecutando comando...parando a música...desconectando```")
                for(i = server.queue.length -1; i >= 0;i--){
                    server.queue.splice(i,1)
                }
                connection.disconnect()
            }else{
                message.channel.send("```Esta unidade diz:\nNenhuma música tocando no momento```")
            }
        },
        async help (){
            let User = message.author
            User.send("```Esta unidade diz:\n-ping: Este comando retorna a latência de Schwi\n-play: Toca música do youtube\n-skip: Passa para próxima música adicionada na fila\n-stop: Para todas as músicas e desconecta a Schwi```") 
        }
    };

        var chamarComando = comandosAceitos[comando]
        if(comando in comandosAceitos){
            chamarComando()
        }else{
            message.channel.send("```Esta unidade diz:\nDesculpa... Schwi não reconhece esse comando```")
        }

});
client.login(config.token);