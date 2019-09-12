const { bot, modules, db, functions, config } = require('../../bot')

exports.run = (m, a) => {
    // If there are arguments provided
    if (a.length > 0) {
        try {
            // Run the code
            eval(a.join(' '))
        } catch (e) {
            // Log the error
            console.error(e)
        }
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