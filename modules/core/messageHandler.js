const { bot, functions, db, config } = require('../../bot')
const { commands } = require('./commandLoader')
const timeouts = new Set()

exports.run = () => {
    bot.on('message', m => {
        // Ignore bots
        if (m.author.bot) return

        // Get prefix
        const prefix = functions.getPrefix(m.guild ? m.guild.id : null)

        // If the message starts with the prefix
        if (m.content.startsWith(prefix)) {
            // Ignore blacklisted users
            db.ensure.user(m.author.id)
            if (db.user.get(m.author.id, 'blacklist')) return

            const args = m.content.split(/\s+/g)
            const commandName = args.shift().slice(prefix.length).toLowerCase()

            // -d flag to delete the command message (guilds only)
            if (m.guild && args.slice(args.length - 1, args.length)[0] == '-d') {
                args.pop() // Remove the last argument ('-d')
                m.delete().catch(() => {}) // Delete and ignore errors
            }

            if (commands.names.has(commandName)) {
                const command = commands.commands.get(commands.names.get(commandName))

                // Check bot owner permissions
                if (command.meta.permissions.includes('BOT_OWNER')) {
                    // Don't run if the user is not an owner
                    if (!config.owners.includes(m.author.id)) return
                }

                // If the command is in DMs and the command doesn't support DMs
                else if (m.channel.type == 'dm' && !command.meta.permissions.includes('DM')) {
                    if (timeouts.has(m.author.id)) return // Ignore if timed out
                    
                    // Inform the user
                    m.respond(`Use \`${prefix}help\` to see available commands`, 'You can\'t use this command in DMs')

                    // Add the user to timeouts
                    timeouts.add(m.author.id)
                    // Remove 5 seconds later
                    setTimeout(() => timeouts.delete(m.author.id), 5 * 1000)

                    return // Don't run the command
                }

                // If the channel is a text channel and the member doesn't have the required permissions
                else if (m.channel.type == 'text' &&
                    !m.member.hasPermission(command.meta.permissions.filter(p => p != 'DM'))) {
                    // Inform the member
                    m.respond(`You need ${command.meta.permissions.map(perm => `\`${perm}\``).join(', ')}` +
                        'to run this command')
                        .then(m2 => m2.delete(20 * 1000).catch(() => {})) // Delete after 20 seconds
                        .catch(() => {}) // Ignore errors

                    return // Don't run the command
                }

                command.run(m, args) // Run the command

                // Command logger for debugging
                if (config.logCommands.enabled) {
                    // Ignore owners if enabled
                    if (config.logCommands.ignoreBotOwners && config.owners.includes(m.author.id)) return

                    console.log(`${m.author.tag} / ${m.author.id} in ${m.guild ? m.guild.name : 'DMs'} used ${m.content}`)
                }
            }

        // Prefix checker
        } else if (m.content.startsWith(`<@${bot.user.id}>`) || m.content.startsWith(`<@!${bot.user.id}>`))
            m.respond(`The prefix is \`${prefix}\`. Use \`${prefix}prefix\` to change it`)
    })
}

exports.meta = {
    name: 'messageHandler',
    autorun: 2
}