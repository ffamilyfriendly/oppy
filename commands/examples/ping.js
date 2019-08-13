const { bot, functions } = require('../../bot')

exports.run = (m, a) => {
    // Send an embed with the ping rounded down
    functions.respond(m, `Pong! ${Math.floor(bot.ping)} ms :ping_pong:`)
}

exports.meta = {
    names: ['ping', 'pong'],
    permissions: [],
    help: {
        description: 'See the bot\'s ping',
        usage: '',
        category: 'examples'
    }
}