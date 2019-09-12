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
            
        if (cmd.permissions.length > 0)
            out.push(`- You need ${cmd.permissions.map(name => `\`${name.replace(/_/g, ' ')}\``).join(', ')} ` +
                'to run this command')

        return out.join('\n')
    }

    categories.forEach(category => {
        const markdown = help.get(category).map(commandToMd)
        output.push(`## ${cap(category)}\n${markdown.join('\n')}`)
    })

    console.log(output.join('\n'))
}
exports.meta = {
    names: ['genhelpmd'],
    permissions: ['BOT_OWNER'],
    help: {
        description: 'Generates help documentation in markdown',
        usage: '',
        category: 'dev'
    }
}