const { bot, modules, db, functions, config } = require('../../bot')

exports.run = (m, a) => {
    const inspect = require('util').inspect

    if (a.length < 1) return
    try {
        const output = inspect(eval(a.join(' '))).replace(/`/g, '\`').slice(0, 1980)
        m.channel.send(`\`\`\`js\n${output}\n\`\`\``)
    } catch (e) {
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