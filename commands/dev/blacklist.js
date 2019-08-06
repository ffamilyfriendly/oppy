const { bot, functions, db } = require('../../bot')

exports.run = (m, a) => {
    // Get a user object
    const user = m.mentions.users.first() || bot.users.get(a[0])
    if (!user || user.id == m.author.id) return functions.respond(m, 'Provide a valid user')

    // Make sure the user is present in the db
    functions.ensure.user(user.id)
    // Get the current status
    const current = db.user.get(user.id, 'blacklist')

    // Send an embed explaining the action
    functions.respond(m, `${current ? 'Unb' : 'B'}lacklisted **${user.tag}**`)

    // Toggle the status
    db.user.set(user.id, !current, 'blacklist')
}

exports.meta = {
    names: ['blacklist'],
    permissions: ['BOT_OWNER'],
    help: {
        description: 'Blacklist a user',
        usage: '',
        category: 'dev'
    }
}