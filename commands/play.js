const youtube = require('@distube/ytdl-core');
const embeds = require('../res/embeds');

const servers = {};

const getVideoDetails = async (url) => {
    const video = await youtube.getInfo(url);
    return {
        url,
        title:    video.videoDetails.title,
        author:   video.videoDetails.author.name,
        likes:    video.videoDetails.likes,
        dislikes: video.videoDetails.dislikes,
    };
};

const tocar = async (connection, message) => {
    const server = servers[message.guild.id];
    if (!server) return;
    clearTimeout(server.timeout);

    server.dispatcher = connection.play(youtube(server.queue[0].url, { filter: 'audioonly' }));
    await embeds.NowPlaying(message, server.queue[0]);
    server.lastMessage.push(message.channel.lastMessageID);

    server.dispatcher.on('finish', async () => {
        const sv = servers[message.guild.id];
        if (!sv) return;

        sv.queue.shift();
        if (sv.queue[0]) {
            await embeds.NextSong(message);
            sv.lastMessage.push(message.channel.lastMessageID);
            tocar(connection, message);
        } else {
            sv.timeout = setTimeout(() => {
                embeds.FindMessages(message, sv.lastMessage);
                embeds.Disconnect(message);
                connection.disconnect();
                limparServidor(message.guild.id);
            }, 10000);
        }
    });
};

const play = async (args, message) => {
    const musica = args.pop();

    if (!musica)                        { await embeds.SongArgumentError(message); return; }
    if (!youtube.validateURL(musica))   { await embeds.NonValidateUrl(message);    return; }
    if (!message.member.voice.channel)  { await embeds.NotInVoiceChannel(message); return; }

    const guildId = message.guild.id;
    if (!servers[guildId]) {
        servers[guildId] = { queue: [], lastMessage: [], connection: null, message: null, dispatcher: null, timeout: null };
    }
    const server = servers[guildId];

    let connection;
    try {
        connection = await message.member.voice.channel.join();
    } catch (error) {
        await message.channel.send('Não foi possível conectar ao canal de voz.');
        await message.channel.send(`Erro: ${error.message}`);
        limparServidor(guildId);
        return;
    }

    connection.on('error', (err) => console.error('Erro na conexão de voz:', err));
    server.connection = connection;
    server.message    = message;

    const song = await getVideoDetails(musica);
    server.queue.push(song);

    if (server.queue.length === 1) {
        tocar(connection, message);
    } else {
        await embeds.AddToQueue(message, song);
        server.lastMessage.push(message.channel.lastMessageID);
    }
};

const limparServidor = (guildId) => {
    if (servers[guildId]) {
        clearTimeout(servers[guildId].timeout);
        delete servers[guildId];
    }
};

const onBotDisconnect = async (guildId) => {
    const server = servers[guildId];
    if (!server) return;
    if (server.message) embeds.FindMessages(server.message, server.lastMessage);
    limparServidor(guildId);
};

module.exports = { play, servers, limparServidor, onBotDisconnect };
