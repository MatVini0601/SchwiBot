const embeds = require('../res/embeds');

module.exports = async (args, message) => {
    const user = message.mentions.users.first();

    try {
        await embeds.Touch(message, user);
    } catch (error) {
        await embeds.UserArgumentError(message);
    }
};