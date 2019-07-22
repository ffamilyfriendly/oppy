const { modules } = require('../../bot')

exports.run = async (m, a) => {
    // Don't say anything if the reload should be silent
    if (!a[0] || a[0].toLowerCase() != 'silent') {
        await m.reply('Reloading commands')
        console.log('Reloading commands')
    }

    // Reload
    modules.get('commandLoader').run()
}

exports.meta = {
    names: ['reload'],
    permissions: ['BOT_OWNER'],
    help: {
        description: 'Reload the commands without restarting the bot',
        usage: '',
        category: 'dev'
    }
}