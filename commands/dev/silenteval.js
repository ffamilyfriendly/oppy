const { bot, modules, db, functions, config } = require('../../bot')

exports.run = (m, a) => {
    if (a.length < 1) return
    try {
        eval(a.join(' '))
    }
    catch (e) {
        console.error(e)
    }
}

exports.meta = {
    names: ['silenteval', 'se'],
    permissions: ['BOT_OWNER'],
    help: {
        description: 'Run code silently',
        usage: 'someCode()',
        category: 'dev'
    }
}