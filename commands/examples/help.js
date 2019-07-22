const { bot } = require('../../bot')
const { help } = require('../../modules/core/commandLoader')

exports.run = (m, a) => {
    // Get the prefix
    const prefix = bot.helpers.getPrefix(m.guild.id)

    // Create an embed
    const embed = bot.helpers.embed()
        .setAuthor('Help', bot.user.displayAvatarURL)
        .setFooter('[optional argument]')

    const sendList = () => {
        // Get a list of all categories
        const list = Array.from(help.keys())
            .map(category => `\`${prefix}help ${category}\``)

        // Add the list to the embed
        embed.addField('To see help, use:', `\`${prefix}help all\`\n${list.join('\n')}`)
        m.channel.send({embed}) // Send the embed
    }

    // Send the list if the category is missing or is invalid
    if (a.length < 1 || !a[0] || typeof a[0] != 'string') return sendList()
    
    // If the category is valid
    if (Array.from(help.keys()).includes(a[0].toLowerCase())) {
        // A mess, but basically form an array of strings out of an array of objects
        const list = help.get(a[0].toLowerCase())
            .map(item => `\`${prefix}${item.names[0]}\` ${item.description}${item.usage != '' ? ` \`${prefix}${item.names[0]} ${item.usage}\`` : ''}`)
        
        // Add the list to the embed
        embed.addField(a[0][0].toUpperCase() + a[0].slice(1).toLowerCase(), list.join('\n'))

        // Send it
        m.channel.send({embed})
        return
    } else if (a[0].toLowerCase() == 'all') { // If the category is `all`
        // For each category
        Array.from(help.keys()).forEach(key => {
            const list = help.get(key)
                .map(item => `\`${prefix}${item.names[0]}\` ${item.description}${item.usage != '' ? ` \`${prefix}${item.names[0]} ${item.usage}\`` : ''}`)
            
            // Add the list to the embed
            embed.addField(key[0].toUpperCase() + key.slice(1).toLowerCase(), list.join('\n'))
        })

        // Send the embed
        m.channel.send({embed})
        return
    } else sendList() // Send the list if the category is invalid
}

exports.meta = {
    names: ['help'],
    permissions: [],
    help: {
        description: 'See the list of all commands',
        usage: '',
        category: 'examples'
    }
}