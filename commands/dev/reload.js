const { functions, modules } = require('../../bot')

exports.run = async (m, a) => {
    if (!a[0] || a[0].toLowerCase() != 'silent') {
        const embed = functions.embed()
            .setDescription('Reloading commands')
        
        await m.channel.send({embed})
        console.log('Reloading commands')
    }

    modules.get('commandLoader').run()
}

exports.meta = {
    names: ['reload', 'rel', 'r'],
    permissions: ['BOT_OWNER'],
    help: {
        description: 'Reload the commands without restarting the bot',
        usage: '',
        category: 'dev'
    }
}