const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const { FindMessages, LeftVoiceChannel } = require('./res/song')
const { servers, limparLista } = require('./modules/play/play')
const { MessageEmbed } = require('discord.js');
const { commandQuery } = require('./modules/commandHandler/commandHandler');
require('dotenv').config()

client.on("ready",() =>{
console.log(`Bot ativo com ${client.users.cache.size} usuarios`);
client.user.setActivity('No Game No Life Zero | s!help', {type: 'WATCHING'});
});

client.on("message", async message => {
    if(message.author.bot) return
    if(message.channel.type == 'dm') return
    if(message.content.toLowerCase().startsWith(config.prefix)){
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const comando = args.shift().toLowerCase();
        await commandQuery(args, comando, message)  
    }
});

client.on('voiceStateUpdate', async (oldMember)  => { 
    if(!oldMember.channelID || oldMember == "undefined"){ return }
    let bot = oldMember.guild.member(client.user)
    if(oldMember.id != '728993532303507556' && oldMember.channelID && oldMember.channel.members.size == 1){
        if(bot.voice.connection){
            let server = servers[oldMember.guild.id]
            LeftVoiceChannel(server.message)
            await FindMessages(server.message, server.lastMessage)
            await limparLista(server.message)
            bot.voice.connection.disconnect()
        }
    }
    if(oldMember.id == '728993532303507556' && oldMember.channel.members.size != 0 && !bot.voice.connection){
        let guildID = oldMember.guild.id
        let server = servers[guildID]
        if(server.message.length == 0){ return }
        else{
            await FindMessages(server.message, server.lastMessage)
            await limparLista(server.message)
        }
    }
})

client.on('guildMemberAdd', member => {
    if(member.user.bot) return
    if(!member.guild.channels.cache.find(ch => ch.name === 'boas-vindas')){
        member.guild.channels.create('boas-vindas',{type:"text"})
    }
    let channel = member.guild.channels.cache.find(ch => ch.name === 'boas-vindas');

    const WelcomeEmbed = new MessageEmbed()
        .setAuthor(`${client.user.username}`, client.user.avatarURL({size: 16, format:'jpg'}))
        .setColor("#e534eb")
        .setTitle("Seja Bem-Vindo 😊")
        .addField('Olá', `**${member.user.username}**, seja bem vindo(a) ao servidor **${member.guild.name}** 🎉.`)
        .setImage("https://i.imgur.com/zlRP3m2.gif");

        channel.send(WelcomeEmbed)
  });

client.login(process.env.TOKEN);

module.exports = {
    client,
    config,
    Discord,
}