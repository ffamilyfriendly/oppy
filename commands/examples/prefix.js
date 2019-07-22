const { bot, db } = require('../../bot')
const config = require('../../config')

exports.run = (m, a) => {
    const prefix = a.join(' ') // Get the prefix

    // Create an embed
    const embed = bot.helpers.embed()
        .setAuthor('Updated prefix', bot.user.displayAvatarURL)

    // Make sure the guild object exists in the database
    bot.helpers.ensure.guild(m.guild.id)

    // If the prefix is not empty or not the default
    if (prefix && prefix != config.defaultPrefix) {
        // Set the prefix
        db.guild.set(m.guild.id, prefix, 'prefix')
        // Update the embed
        embed.setDescription(`Set the prefix to \`${prefix}\``)
    } else {
        // Remove the prefix
        db.guild.set(m.guild.id, undefined, 'prefix')
        // Update the embed
        embed.setDescription(`Reset the prefix to \`${config.defaultPrefix}\``)
    }

    m.channel.send({embed}) // Send the embed
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