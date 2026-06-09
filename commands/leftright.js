const embeds = require('../res/embeds');

module.exports = async (args, message) => {
    const random = Math.random() < 0.5 ? 'Esquerda' : 'Direita';
    await embeds.Leftright(message, random);
};