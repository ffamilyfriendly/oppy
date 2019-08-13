const { bot, db } = require('../../bot')
const config = require('../../config')

exports.run = (m, a) => {
    const prefix = a.join(' ') // Get the prefix

    // Make sure the guild object exists in the database
    functions.ensure.guild(m.guild.id)

    // If the prefix is not empty or not the default
    if (prefix && prefix != config.defaultPrefix) {
        // Set the prefix
        db.guild.set(m.guild.id, prefix, 'prefix')
        // Send a message
        functions.respond(m, `Set the prefix to \`${prefix}\``)
    } else {
        // Remove the prefix
        db.guild.set(m.guild.id, undefined, 'prefix')
        // Send a message
        functions.respond(m, `Reset the prefix to \`${config.defaultPrefix}\``)
    }
}

exports.meta = {
    names: ['prefix', 'setprefix'],
    permissions: ['MANAGE_MESSAGES'],
    help: {
        description: 'Change the prefix in this server',
        usage: '[new prefix]',
        category: 'examples'
    }
}