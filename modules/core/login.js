const { bot, config, db } = require('../../bot')

exports.run = () => {
    console.log('Logging in\n')
    bot.login(config.tokens.discord)

    bot.on('ready', () => {

        const lines = [
            `${config.name} is online`,
            `${bot.guilds.size} guilds, ${bot.users.size} users`,
            `Owner${config.owners.length > 1 ? 's:' : ' -'} ` +
                `${config.owners.map(id => bot.users.get(id).tag).join(', ')}`,
            `Prefix: ${config.defaultPrefix}`,
            `DB stats: ${db.user.size} user${db.user.size > 1 ? 's' : ''}, ` +
                `${db.guild.size} guild${db.guild.size > 1 ? 's' : ''}`
        ]

        const lineLength = Math.max(...lines.map(line => line.length))

        console.log([
            '#'.repeat(lineLength + 4),
            lines.map(line => `# ${line}${' '.repeat(lineLength - line.length)} #`).join('\n'),
            '#'.repeat(lineLength + 4)
        ].join('\n'))

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