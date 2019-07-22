const { bot, modules, db } = require('../../bot')
const config = require('../../config')

exports.run = (m, a) => {
    const inspect = require('util').inspect

    // Ignore if there is nothing to run
    if (a.length < 1) return
    try {
        // Run the code and send the output
        m.channel.send(`\`\`\`js\n${inspect(eval(a.join(' ')))}\n\`\`\``)
    }
    catch (e) {
        m.channel.send(`\`ERROR\`\n\`\`\`js\n${e}\n\`\`\``)
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