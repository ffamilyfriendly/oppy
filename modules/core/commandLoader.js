const getFileList = require('../../library/getFileList')

const commands = {
    names: new Map(),
    commands: new Map()
}
const help = new Map()

exports.help = help
exports.commands = commands

exports.run = () => {
    // Clear maps in case of a reload
    commands.names.clear()
    commands.commands.clear()
    help.clear()

    getFileList('./commands').forEach(commandDir => {
        commandDir = `../.${commandDir}`
        
        // Delete command if it's already loaded
        if (require.resolve(commandDir))
            delete require.cache[require.resolve(commandDir)]

        // Load command
        const command = require(commandDir)

        // Push names
        command.meta.names.forEach(name => commands.names.set(name, command.meta.names[0]))

        // Push command
        commands.commands.set(command.meta.names[0], command)

        // Load help if a category is provided
        if (command.meta.help.category) {
            // Categories can't be named `all`
            if (command.meta.help.category.toLowerCase() == 'all')
                throw new Error('Command category can\'t be \'all\'')

            // Create help category if it doesn't exist
            if (!help.has(command.meta.help.category)) help.set(command.meta.help.category, [])

            // Push help
            help.get(command.meta.help.category).push({
                names: command.meta.names,
                description: command.meta.help.description,
                usage: command.meta.help.usage,
                permissions: command.meta.permissions
            })
        }

        
    })
}

exports.meta = {
    name: 'commandLoader',
    autorun: 1
}