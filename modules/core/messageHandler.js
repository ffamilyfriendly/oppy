const { bot, functions, db, config } = require('../../bot')
const { commands } = require('./commandLoader') 

exports.run = () => {
    bot.on('message', m => {
        if (m.author.bot || m.channel.type != 'text') return
        
        const prefix = functions.getPrefix(m.guild.id)

        if (m.content.startsWith(prefix)) {
            db.ensure.user(m.author.id)
            if (db.user.get(m.author.id, 'blacklist')) return

            const args = m.content.split(/\s+/g)
            const commandName = args.shift().slice(prefix.length).toLowerCase()

            if (args.slice(args.length - 1, args.length)[0] == '-d') {
                args.pop()
                m.delete().catch(() => {})
            }

            if (commands.names.has(commandName)) {
                const command = commands.commands.get(commands.names.get(commandName))

                if (command.meta.permissions.includes('BOT_OWNER')) {
                    if (!config.owners.includes(m.author.id)) return
                } else if (!m.member.hasPermission(command.meta.permissions)) {
                    m.respond(`You need ${command.meta.permissions.map(perm => `\`${perm}\``).join(', ')}` +
                        'to run this command')
                        .then(m2 => m2.delete(20 * 1000).catch(() => {}))
                        .catch(() => {})

                    return
                }

                command.run(m, args)

                if (config.logCommands.enabled) {
                    if (config.logCommands.ignoreBotOwners && config.owners.includes(m.author.id)) return
                    console.log(`${m.author.tag} / ${m.author.id} in ${m.guild.name} used ${m.content}`)
                }
            }
        } else if (m.content.startsWith(`<@${bot.user.id}>`) || m.content.startsWith(`<@!${bot.user.id}>`))
            m.respond(`The prefix is \`${prefix}\`. Use \`${prefix}prefix\` to change it`)
    })
}

exports.meta = {
    name: 'messageHandler',
    autorun: 2
}