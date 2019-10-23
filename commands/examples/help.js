const { bot, modules, functions } = require('../../bot')
const { help } = modules.get('commandLoader')

exports.run = (m, a) => {
    // Get the prefix
    const prefix = functions.getPrefix(m.guild ? m.guild.id : null)

    // Create an embed and set the title
    const embed = functions.embed()
        .setAuthor('Help', bot.user.displayAvatarURL)
        .setFooter('[optional argument] | bold: DM command')

    const sendList = () => {
        // Generate list of categories
        const list = Array.from(help.keys())
            .map(category => `\`${prefix}help ${category}\``)

        // Add the list to the embed
        embed.addField('To see help, use:', `\`${prefix}help all\`\n${list.join('\n')}`)
        // Send the embed
        m.channel.send({embed})
    }

    // Send the list of categories if no arguments are provided
    if (a.length < 1 || !a[0] || typeof a[0] != 'string') return sendList()
    
    // If a valid category is provided
    if (Array.from(help.keys()).includes(a[0].toLowerCase())) {
        // Generate the help for this category
        const list = help.get(a[0].toLowerCase())
            .map(item => `${item.permissions.includes('DM') ? '**' : ''}\`${prefix}${item.names[0]}\` ` +
                `${item.description}${item.usage != '' ? ` \`${prefix}${item.names[0]} ${item.usage}\`` : ''}` +
                (item.permissions.includes('DM') ? '**' : ''))
        
        // Add the list to the embed
        embed.addField(a[0][0].toUpperCase() + a[0].slice(1).toLowerCase(), list.join('\n'))
        // Send the embed
        m.channel.send({embed})
        return
    
    // If the user wants all help
    } else if (a[0].toLowerCase() == 'all') {
        // Generate help for all categories
        Array.from(help.keys()).forEach(key => {
            const list = help.get(key)
                .map(item => `${item.permissions.includes('DM') ? '**' : ''}\`${prefix}${item.names[0]}\` ` +
                    `${item.description}${item.usage != '' ? ` \`${prefix}${item.names[0]} ${item.usage}\`` : ''}` +
                    (item.permissions.includes('DM') ? '**' : ''))
            
            // Add them to the embed
            embed.addField(key[0].toUpperCase() + key.slice(1).toLowerCase(), list.join('\n'))
        })

        // Send the embed
        m.channel.send({embed})
        return
    
    // Otherwise, send the list of categories
    } else sendList()
}

exports.meta = {
    names: ['help'],
    permissions: ['DM'],
    help: {
        description: 'See info about commands',
        usage: '',
        category: 'examples'
    }
}