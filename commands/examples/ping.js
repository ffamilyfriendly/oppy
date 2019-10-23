const { bot } = require('../../bot')

exports.run = (m, a) => {
    // Send an embed with the ping rounded down
    m.respond(`Pong! ${Math.floor(bot.ping)} ms :ping_pong:`)
}

exports.meta = {
    names: ['ping', 'pong'],
    permissions: ['DM'],
    help: {
        description: 'See the bot\'s ping',
        usage: '',
        category: 'examples'
    }
}