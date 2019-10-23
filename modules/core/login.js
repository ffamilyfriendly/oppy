const { bot, config, db, functions } = require('../../bot')

exports.run = () => {
    console.log('Logging in\n')
    bot.login(config.tokens.discord)

    bot.on('ready', async () => {
        const lines = [
            `${config.name} is online`,
            `${await functions.guildCount()} guilds, ${await functions.userCount()} users` +
                (bot.shard ? `, ${bot.shard.count} shard${bot.shard.count > 1 ? 's' : ''}` : ''),
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

        const activity = async () => config.activity.text
            .replace(/BOTservers/g, await functions.guildCount())
            .replace(/BOTusers/g, await functions.userCount())
            .replace(/BOTprefix/g, config.defaultPrefix)

        bot.user.setActivity(await activity(), config.activity)
        setInterval(async () => {
            bot.user.setActivity(await activity(), config.activity)
        }, 60 * 1000)
    })

    bot.on('error', () => {})
}

exports.meta = {
    name: 'login',
    autorun: 3
}