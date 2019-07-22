const { bot } = require('../../bot')

exports.run = (m, a) => {
    // Create an embed
    const embed = bot.helpers.embed()
        .setDescription(`Pong! ${Math.floor(bot.ping)} ms :ping_pong:`)

    // Send the embed
    m.channel.send({embed})
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