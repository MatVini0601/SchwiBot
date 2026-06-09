const { MessageEmbed } = require('discord.js');
const { TAG_MAP, CATEGORIES } = require('./nekoTags');

const SongArgumentError = async (message) => {
    const embed = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle('❌ Parâmetro não reconhecido')
        .addField('Análise:', 'Schwi não consegue reproduzir sem um link. Forneça um link do YouTube.');
    message.channel.send(embed);
};

const NonValidateUrl = async (message) => {
    const embed = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle('❌ Parâmetro não reconhecido')
        .addField('Análise:', 'Schwi processou o link fornecido... ele não é válido.');
    await message.channel.send(embed);
};

const NotInVoiceChannel = async (message) => {
    const embed = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle('❌ Conexão impossível')
        .addField('Análise:', 'Schwi precisa que você esteja em um canal de voz para prosseguir.');
    await message.channel.send(embed);
};

const NowPlaying = async (message, song) => {
    const embed = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle('🎶 Reproduzindo agora')
        .addField('Título:', song.title)
        .addField('Canal:', song.author)
        .addField('👍 Likes:', String(song.likes), true)
        .addField('👎 Dislikes:', String(song.dislikes), true);
    await message.channel.send(embed);
};

const NextSong = async (message) => {
    const embed = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle('🎶 Carregando próxima música...');
    await message.channel.send(embed);
};

const Disconnect = async (message) => {
    const embed = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle('Schwi está se desconectando... 🖐')
        .addField('Motivo:', 'Nenhuma música detectada na fila. Até a próxima.');
    await message.channel.send(embed);
};

const StopDisconnect = async (message) => {
    const embed = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle('❌ Música encerrada')
        .addField('Desconectando...', 'Schwi está encerrando a sessão. Foi um prazer.');
    await message.channel.send(embed);
};

const AddToQueue = async (message, song) => {
    const embed = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle('🎶 Adicionado à fila de reprodução')
        .addField('Título:', song.title)
        .addField('Canal:', song.author);
    await message.channel.send(embed);
};

const NoSongPlaying = async (message) => {
    const embed = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle('❌ Nenhuma música em execução')
        .addField('Schwi informa:', 'Não há nada tocando no momento. Use `s!play` para começar.');
    await message.channel.send(embed);
};

const FindMessages = async (message, ids) => {
    ids.forEach(async (id) => {
        try {
            const msg = await message.channel.messages.fetch(id);
            msg.delete();
        } catch (_) {}
    });
};

const UserArgumentError = async (message) => {
    const embed = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle('❌ Parâmetro ausente')
        .addField('Análise:', 'Schwi precisa saber quem você quer mencionar para executar este comando.')
        .setImage('https://i.imgur.com/p9zGbxh.gif')
        .setTimestamp()
        .setFooter('Schwi está sempre aprendendo mais sobre o coração humano.');
    await message.channel.send(embed);
};

const Touch = async (message, user) => {
    const embed = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle('👋 Toque recebido')
        .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription('Schwi registrou um gesto humano')
        .addField('Resultado:', `**${user.username}**, você foi tocado por **${message.author.username}** — Schwi ainda está tentando entender o sentimento por trás disso.`)
        .setTimestamp()
        .setFooter('Schwi está sempre aprendendo mais sobre o coração humano.');
    await user.send(embed);
};

const Leftright = async (message, resp) => {
    const embed = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle('⬅️➡️ Análise concluída')
        .addField('Resultado:', `${resp}`)
        .setTimestamp()
        .setFooter('Schwi está sempre aprendendo mais sobre o coração humano.');
    await message.channel.send(embed);
};

const NekoImage = async (message, image, color,data) => {
    const embed = new MessageEmbed()
        .setColor(color)
        .setTitle('Schwi encontrou uma imagem para você')
        .setDescription('Schwi processou a imagem e extraiu as seguintes informações:')
        .addField('🎨 Artista: ', data.artist_name ? ` ${data.artist_name}` : 'Artista desconhecido')
        .addField('🔞 Rating:', data.rating)
        .setImage(image.url)
        .setTimestamp()
    if (image.tags?.length > 0) {
        embed.setFooter(image.tags.join(', '));
    }
    await message.channel.send(embed);
};

const NekoNoResult = async (message) => {
    const embed = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle('❌ Sem resultados')
        .setDescription('Schwi não encontrou imagens para essa combinação de tags. Tente outras.')
        .setImage('https://i.imgur.com/p9zGbxh.gif')
        .setTimestamp()
        .setFooter({ text: 'Schwi está sempre aprendendo mais sobre o coração humano.' });
    await message.channel.send(embed);
};

const NekoError = async (message) => {
    const embed = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle('❌ Falha no processamento')
        .setDescription('Schwi encontrou um erro inesperado. Tente novamente.')
        .setImage('https://tenor.com/pt-BR/view/no-gif-18505019')
        .setTimestamp()
        .setFooter({ text: 'Schwi está sempre aprendendo mais sobre o coração humano.' });
    await message.channel.send(embed);
};

const NekoTags = async (message) => {
    const embed = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle('🏷️ Banco de tags — s!neko')
        .setDescription('Schwi mapeou todas as tags disponíveis. Combine-as para refinar sua busca.\nExemplo: `s!neko -c -pu -ni`');
    for (const { label, keys } of CATEGORIES) {
        const lines = keys.map(k => `\`${k}\` → ${TAG_MAP.get(k)}`).join('\n');
        embed.addField(label, lines, true);
    }
    embed.setFooter('Schwi também aceita o nome direto da tag sem alias.');
    await message.channel.send(embed);
};

module.exports = {
    SongArgumentError,
    NonValidateUrl,
    NotInVoiceChannel,
    NowPlaying,
    NextSong,
    Disconnect,
    StopDisconnect,
    AddToQueue,
    NoSongPlaying,
    FindMessages,
    UserArgumentError,
    Touch,
    Leftright,
    NekoImage,
    NekoNoResult,
    NekoError,
    NekoTags,
};
