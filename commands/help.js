const { MessageEmbed } = require('discord.js');

module.exports = async (_args, message) => {
    const embed = new MessageEmbed()
        .setColor('#e534eb')
        .setTitle('📋 Schwi — Central de Comandos')
        .setDescription('Schwi registrou todos os comandos disponíveis. Use o prefixo `s!` antes de cada um.')
        .addField('🎵 Música',
            '`s!play`   → Toca músicas do Youtube (apenas links)\n' +
            '`s!skip`   → Toca a próxima música da fila\n' +
            '`s!stop`   → Para a música e limpa a fila\n' +
            '`s!queue`  → Lista a fila de reprodução',
            true)
        .addField('🐱 Neko',
            '`s!neko`      → Envia uma imagem aleatória\n' +
            '`s!nekotags`  → Lista as tags disponíveis para filtrar no comando s!neko',
            true)
        .setFooter('Schwi está sempre aprendendo mais sobre o coração humano.');

    await message.channel.send(embed);
};
