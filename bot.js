const { Client, MessageEmbed } = require('discord.js');
const config = require('./config.json');
const { handleCommand } = require('./commands/handler');
const { onBotDisconnect } = require('./commands/play');
require('dotenv').config();

const client = new Client();

client.on('ready', () => {
    console.log(`Bot ativo com ${client.users.cache.size} usuarios em ${client.guilds.cache.size} servidores`);
    client.user.setPresence({
        activity: {
            name: 'No Game No Life Zero | s!help',
            type: 'WATCHING',
            timestamps: { start: Date.now() },
        },
    });
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    console.log(`MSG: ${message.guild.name} | Mensagem de ${message.author.tag} em #${message.channel.name}: ${message.content}`);
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;

    const args    = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    await handleCommand(command, args, message);
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    if (oldState.member.id !== client.user.id) return;
    if (oldState.channelID && !newState.channelID) {
        await onBotDisconnect(oldState.guild.id);
    }
});

client.on('guildMemberAdd', member => {
    if (member.user.bot) return;
    const channel = member.guild.channels.cache.find(ch => ch.name === 'boas-vindas');
    if (!channel) return;

    const WelcomeEmbed = new MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL({ size: 16, format: 'jpg' }))
        .setColor('#e534eb')
        .setTitle('Seja Bem-Vindo 😊')
        .addField('Olá', `**${member.user.username}**, seja bem vindo(a) ao servidor **${member.guild.name}** 🎉.`)
        .setImage('https://i.imgur.com/zlRP3m2.gif');

    channel.send(WelcomeEmbed);
});

client.login(process.env.TOKEN);

module.exports = { client };