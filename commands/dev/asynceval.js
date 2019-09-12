const { bot, modules, db, functions, config } = require('../../bot')

exports.run = async (m, a) => {
    // Load the inspector
    const inspect = require('util').inspect

    // If there are arguments provided
    if (a.length > 0) {
        try {
            // Send a message to start the process
            m.channel.send('```js\nRunning...\n```').then(m2 => {
                // Run the code once the message is sent
                eval(`(async () => { ${a.join(' ')} })()`).then(out => {
                    // When the code finishes running, inspect the output
                    const fixedOut = inspect(out).replace(/`/g, '\`').slice(0, 1980)
                    // Edit the message to have the output
                    m2.edit(`\`\`\`js\n${fixedOut}\n\`\`\``)
                })
            })
        
        // Output any errors
        } catch (e) {
            m.channel.send(`\`ERROR\`\n\`\`\`js\n${e}\n\`\`\``)
        }
    }
}

exports.meta = {
    names: ['asynceval', 'ae'],
    permissions: ['BOT_OWNER'],
    help: {
        description: 'Run code asynchronously ',
        usage: 'await someCode()',
        category: 'dev'
    }
}