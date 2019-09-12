const { modules } = require('../../bot')

exports.run = async (m, a) => {
    // If a 'silent' argument is not provided, output the action
    if (!a[0] || a[0].toLowerCase() != 'silent') {        
        await m.respond('Reloading commands')
        console.log('Reloading commands')
    }

    // Get the command loader module and run it
    modules.get('commandLoader').run()
}

exports.meta = {
    names: ['reload', 'rel', 'r'],
    permissions: ['BOT_OWNER'],
    help: {
        description: 'Reload the commands without restarting the bot',
        usage: '[silent]',
        category: 'dev'
    }
}