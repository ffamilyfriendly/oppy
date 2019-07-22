const { bot } = require('../../bot')

exports.run = async (m, a) => {
    // Don't say anything if the reload should be silent
    if (!a[0] || a[0].toLowerCase() != 'silent') {
        await m.reply('Stopping the bot')
        console.log('Stopping the bot')
    }

    // Log out and stop the process
    bot.destroy().then(() => process.exit())    
}

exports.meta = {
    names: ['stop'],
    permissions: ['BOT_OWNER'],
    help: {
        description: 'Stop the bot',
        usage: '',
        category: 'dev'
    }
}