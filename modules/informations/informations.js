const ping = async () => {
    const m = await message.channel.send("Ping?")
    m.edit(`Esta unidade diz: Latência de Schwi é ${m.createdTimestamp - message.createdTimestamp}ms.`);
}