const { bot } = require('../../bot')

exports.run = async (m, a) => {
    // If a 'silent' argument is not provided, output the action
    if (!a[0] || a[0].toLowerCase() != 'silent') {
        await m.respond('Stopping the bot')
        console.log('Stopping the bot')
    }

    // Log out
    await bot.destroy()
    // End the process
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