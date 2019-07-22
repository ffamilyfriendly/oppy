const { bot } = require('../../bot')
const { commands } = require('./commandLoader') 
const config = require('../../config')

exports.run = () => {
    bot.on('message', m => {
        // Ignore if the author is a bot or if the channel is not a text channel
        if (m.author.bot || m.channel.type != 'text') return
        // Get the prefix
        const prefix = bot.helpers.getPrefix(m.guild.id)

        // If the message starts with the prefix
        if (m.content.startsWith(prefix)) {
            // Form an array of arguments
            const args = m.content.split(/\s+/g)
            // Get the command name
            const commandName = args.shift().slice(prefix.length).toLowerCase()
            // If the command exists
            if (commands.aliases.has(commandName)) {
                // Get the command
                const command = commands.commands.get(commands.aliases.get(commandName))

                // Check permissions
                const embed = bot.helpers.embed()
                    .setAuthor('Missing permission', bot.user.displayAvatarURL)
                // If the command is owner only
                if (command.meta.permissions.includes('BOT_OWNER')) {
                    // If the user is not the owner
                    if (!config.owners.includes(m.author.id)) {
                        // Update the embed
                        embed.setDescription('You are not the bot owner')
                        // Send the embed
                        m.channel.send({embed})
                            .then(m2 => m2.delete(20 * 1000)) // Delete the message in 20 s
                        return
                    }
                }
                // If the member doesn't have permissions
                if (!m.member.hasPermission(command.meta.permissions)) {
                    embed.setDescription(`You need ${command.meta.permissions.map(perm => `\`${perm}\``).join(', ')} to run this command.`)
                    // Send the embed
                    m.channel.send({embed})
                        .then(m2 => m2.delete(20 * 1000)) // Delete the message in 20 s
                    return
                }

                // Run the command
                command.run(m, args)

                // Command logger
                if (config.logCommands.enabled) {
                    // Ignore bot owners if enabled
                    if (config.logCommands.ignoreBotOwners && config.owners.includes(m.author.id)) return
                    // Log
                    console.log(`${m.author.tag} / ${m.author.id} in ${m.guild.name} used ${m.content}`)
                }
            }
        }
    })
}

exports.meta = {
    name: 'messageHandler',
    autorun: 4
}