const getFileList = require('../../library/getFileList')

const commands = {
    aliases: new Map(),
    commands: new Map()
} 
const help = new Map()

exports.help = help
exports.commands = commands

exports.run = () => {
    // Clear maps in case of a reload
    commands.aliases.clear()
    commands.commands.clear()
    help.clear()

    getFileList('./commands').forEach(commandDir => {
        commandDir = `../.${commandDir}`
        
        // Delete command if it's already loaded
        if (require.resolve(commandDir))
            delete require.cache[require.resolve(commandDir)]

        // Require command
        const command = require(commandDir)

        // Load aliases
        command.meta.names.forEach(name => commands.aliases.set(name, command.meta.names[0]))

        // Load command
        commands.commands.set(command.meta.names[0], command)

        // Ignore if there's no help category
        if (!command.meta.help.category) return

        // Categories can't be named `all`
        if (command.meta.help.category.toLowerCase() == 'all')
            throw console.error('You can\'t have a command category named `all`')

        // Create help category if it doesn't exist
        if (!help.has(command.meta.help.category)) help.set(command.meta.help.category, [])

        // Load help
        help.get(command.meta.help.category).push({
            names: command.meta.names,
            description: command.meta.help.description,
            usage: command.meta.help.usage,
            permissions: command.meta.permissions
        })
    })
}

exports.meta = {
    name: 'commandLoader',
    autorun: 1
}