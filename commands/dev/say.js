const { bot, modules, db } = require('../../bot')
const config = require('../../config')

exports.run = (m, a) => {
    // Ignore if there is nothing to say
    if (a.length < 1) return

    // Send the text
    m.channel.send(a.join(' '))
}

exports.meta = {
    names: ['say', 'talk'],
    permissions: ['BOT_OWNER'],
    help: {
        description: 'Make the bot say something',
        usage: 'text',
        category: 'dev'
    }
}