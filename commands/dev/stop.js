const { bot, functions } = require('../../bot')

exports.run = async (m, a) => {
    if (!a[0] || a[0].toLowerCase() != 'silent') {
        const embed = functions.embed()
            .setDescription('Stopping the bot')
        
        await m.channel.send({embed})
        console.log('Stopping the bot')
    }

    await bot.destroy()
    process.exit()
}

exports.meta = {
    names: ['stop', 'kys'],
    permissions: ['BOT_OWNER'],
    help: {
        description: 'Stop the bot',
        usage: '',
        category: 'dev'
    }
}