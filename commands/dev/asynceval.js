const { bot, modules, db, functions, config } = require('../../bot')

exports.run = async (m, a) => {
    const inspect = require('util').inspect

    if (a.length < 1) return
    try {
        m.channel.send('```js\nRunning...\n```').then(m2 => {
            eval(`(async () => { ${a.join(' ')} })()`).then(out => {
                const fixedOut = inspect(out).replace(/`/g, '\`').slice(0, 1980)
                m2.edit(`\`\`\`js\n${fixedOut}\n\`\`\``)
            })
        })
        
    } catch (e) {
        m.channel.send(`\`ERROR\`\n\`\`\`js\n${e}\n\`\`\``)
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