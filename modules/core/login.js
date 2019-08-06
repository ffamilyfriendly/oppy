const { bot, config } = require('../../bot')

exports.run = () => {
    console.log('Logging in\n')
    bot.login(config.tokens.discord)

    bot.on('ready', () => {
        console.log(
            '##################################################\n' +
            `# ${config.name} was started\n` + 
            `# In ${bot.guilds.size} guilds with ${bot.users.size} users\n` +
            `# The owners are: ${config.owners.map(id => bot.users.get(id).tag).join(', ')}\n` +
            `# The default prefix is ${config.defaultPrefix}\n` +
            '##################################################\n'
        )

        const activity = () => config.activity.text
            .replace(/BOTservers/g, bot.guilds.size)
            .replace(/BOTprefix/g, config.defaultPrefix)
            .replace(/BOTusers/g, bot.users.size)

        bot.user.setActivity(activity(), config.activity)
        setInterval(() => {
            bot.user.setActivity(activity(), config.activity)
        }, 60 * 1000)
    })

    bot.on('error', () => {})
}

exports.meta = {
    name: 'login',
    autorun: 3
}