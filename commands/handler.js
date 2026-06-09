const commands = new Map([
    ['help',  require('./help')],
    ['play',  require('./play').play],
    ['skip',  require('./skip')],
    ['stop',  require('./stop')],
    ['queue', require('./queue')],
    ['ping',  require('./ping')],
    ['touch', require('./touch')],
    ['neko',  require('./neko')],
    ['nekotags', require('./nekotags')],
    ['leftright', require('./leftright')]
]);

const handleCommand = async (command, args, message) => {
    if (!commands.has(command)) {
        await message.channel.send('Comando não existe');
        return;
    }
    await commands.get(command)(args, message);
};

module.exports = { handleCommand };
