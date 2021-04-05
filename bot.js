const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const { FindMessages } = require('./res/song')
const { servers, getContextMessage, limparLista } = require('./modules/play/play')
require('dotenv').config()

const { MessageEmbed } = require('discord.js');
const { commandQuery } = require('./modules/commandHandler/commandHandler');

client.on("ready",() =>{
console.log(`Bot ativo com ${client.users.cache.size} usuarios em ${client.guilds.cache.size} servidores`);
client.user.setActivity('No Game No Life Zero | s!help', {type: 'WATCHING'});
console.clear()
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

client.on('voiceStateUpdate', async (bot)  => {
    if(bot.id == '728993532303507556' && !bot.connection){
        let message = await getContextMessage()
        const server = servers[message.guild.id]
        await FindMessages(message, server.lastMessage)
        await limparLista()
    }
})

client.on('guildMemberAdd', member => {
    if(member.user.bot) return
    const channel = member.guild.channels.cache.find(ch => ch.name === 'boas-vindas');

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