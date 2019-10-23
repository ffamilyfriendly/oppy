const { help } = require('../../modules/core/commandLoader')

exports.run = (m, a) => {
    // Generate help in markdown, too stupid to explain
    const categories = Array.from(help.keys())
    const output = []

    output.push('# Help')

    const cap = word => word[0].toUpperCase() + word.slice(1).toLowerCase()

    const commandToMd = cmd => {
        const out = []

        out.push(`### ${cap(cmd.names[0])}`)
        out.push(`- ${cmd.description}`)

        if (cmd.names.length > 1)
            out.push(`- Aliases: ${cmd.names.slice(1).map(name => `\`${name}\``).join(', ')}`)

        if (cmd.usage)
            out.push(`- Usage: \`${cmd.names[0]} ${cmd.usage}\``)
            
        if (cmd.permissions.filter(name => !['DM', 'BOT_OWNER'].includes(name)).length > 0) {
            const perms = cmd.permissions
                .filter(name => !['DM', 'BOT_OWNER'].includes(name))
                .map(name => `\`${name.replace(/_/g, ' ')}\``)
                .join(', ')
        
            out.push(`- You need ${perms} to run this command`)
        }

        if (cmd.permissions.includes('BOT_OWNER'))
            out.push('- Bot owner only')

        if (cmd.permissions.includes('DM'))
            out.push('- Allowed in DMs')

        return out.join('\n')
    }

    categories.forEach(category => {
        const markdown = help.get(category).map(commandToMd)
        output.push(`## ${cap(category)}\n${markdown.join('\n')}`)
    })

    console.log(output.join('\n'))

    m.respond('Help generated. Check the console')
}
exports.meta = {
    names: ['generatehelp'],
    permissions: ['BOT_OWNER'],
    help: {
        description: 'Generates command documentation in markdown',
        usage: '',
        category: 'dev'
    }
}