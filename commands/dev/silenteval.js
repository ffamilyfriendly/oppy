const { bot, modules, db } = require('../../bot')
const config = require('../../config')

exports.run = (m, a) => {
    // Ignore if there is nothing to run
    if (a.length < 1) return
    try {
        // Run the code
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