const { bot, modules, db, functions, config } = require('../../bot')

exports.run = (m, a) => {
    // Load the inspector
    const inspect = require('util').inspect

    // If arguments are provided
    if (a.length > 0) {
        try {
            // Run the code and inspect the output
            const output = inspect(eval(a.join(' '))).replace(/`/g, '\`').slice(0, 1980)
            // Send the output in a message
            m.channel.send(`\`\`\`js\n${output}\n\`\`\``)
        } catch (e) {
            // Output any errors
            m.channel.send(`\`ERROR\`\n\`\`\`js\n${e}\n\`\`\``)
        }
    }
    
}

exports.meta = {
    names: ['eval', 'e'],
    permissions: ['BOT_OWNER'],
    help: {
        description: 'Run code',
        usage: 'someCode()',
        category: 'dev'
    }
}