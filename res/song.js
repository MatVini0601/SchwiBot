const { MessageEmbed } = require('discord.js');

const SongArgumentError = async (message) => {
    const SongInfoEmbed = new MessageEmbed()
        .setColor("#e534eb")
        .setTitle("❌ Erro ❌")
        .addField("Argumento:", "Schwi precisa de um link para poder tocar alguma música")

    message.channel.send(SongInfoEmbed)
}

const NonValidateUrl = async (message) => {
    const SongInfoEmbed = new MessageEmbed()
        .setColor("#e534eb")
        .setTitle("❌ Erro ❌")
        .addField("Música não encontrada:", "Link inválido")

    await message.channel.send(SongInfoEmbed)
}

const NotInVoiceChannel = async (message) => {
    const ErrorEmbed = new MessageEmbed()
    .setColor("#e534eb")
    .setTitle("❌ Erro ❌")
    .addField("Conexão:", "Você não está conectado a um canal de voz")

    await message.channel.send(ErrorEmbed)
}

const NowPlaying = async (message, info)  => {
    const SongInfoEmbed = new MessageEmbed()
                .setColor("#e534eb")
                .setTitle("🎶 Tocando Agora 🎶")
                .addField("Título:", info.Title)
                .addField("Canal:", info.Author)
                .addField("👍Likes:", info.Likes, true)
                .addField("👎Dislikes:", info.Deslikes, true);
    await message.channel.send(SongInfoEmbed)
}

const NextSong = async (message) => {
    const SongInfoEmbed = new MessageEmbed()
                    .setColor("#e534eb")
                    .setTitle("🎶 Indo para a próxima música 🎶")
    await message.channel.send(SongInfoEmbed)
}

const Disconnect = async (message) => {
    const SongInfoEmbed = new MessageEmbed()
                    .setColor("#e534eb")
                    .setTitle("Good Bye🖐")
                    .addField("Desconectando","Nenhuma música detectada na fila")
    await message.channel.send(SongInfoEmbed)
}

const StopDisconnect = async (message) => {
    const SongInfoEmbed = new MessageEmbed()
            .setColor("#e534eb")
            .setTitle("❌ Parando a música ❌")
            .addField("Desconectando...", "Até mais")
    await message.channel.send(SongInfoEmbed)
}

const AddToQueue = async (message, info) => {
    const SongInfoEmbed = new MessageEmbed()
                .setColor("#e534eb")
                .setTitle("🎶 Adicionada à fila de reprodução 🎶")
                .addField("Título:", info.Title)
                .addField("Canal:", info.Author)
    await message.channel.send(SongInfoEmbed)
}

const NoSongPlaying = async (message) => {
    const SongInfoEmbed = new MessageEmbed()
            .setColor("#e534eb")
            .setTitle("❌ Nenhuma música tocando ❌")
            .addField("Dica", "Tente colocar algo para tocar 😉")
    await message.channel.send(SongInfoEmbed)
}

const FindMessages = async (message, Id) => {
    Id.forEach(async element => {
        let msg = await message.channel.messages.fetch(element)
        msg.delete()
    });
}

module.exports = {
    SongArgumentError,
    NonValidateUrl,
    NotInVoiceChannel,
    NowPlaying,
    NextSong,
    Disconnect,
    StopDisconnect,
    AddToQueue,
    FindMessages, 
    NoSongPlaying
}