const Discord = require('discord.js')
const config = require('../../config')
const { bot, db } = require('../../bot')

exports.run = () => {
    bot.helpers = {}

    // Embed
    bot.helpers.embed = col => new Discord.RichEmbed().setColor(col || config.embedColor)
    // Sleep
    bot.helpers.sleep = ms => new Promise(res => setTimeout(res, ms))

    // Total guild count
    bot.helpers.guildCount = async () => {
        if (bot.shard) {
            const values = await bot.shard.fetchClientValues('guilds.size')
            return values.reduce((p, v) => p + v, 0)
        } else return bot.guilds.size
    }
    // Total user count
    bot.helpers.userCount = async () => {
        if (bot.shard) {
            const values = await bot.shard.fetchClientValues('users.size')
            return values.reduce((p, v) => p + v, 0)
        } else return bot.users.size
    }

    // DB ensure
    bot.helpers.ensure = {
        user: id => db.user.ensure(id, config.dbDefaults.user),
        guild: id => db.guild.ensure(id, config.dbDefaults.guild)
    }

    // Get prefix
    bot.helpers.getPrefix = id => {
        bot.helpers.ensure.guild(id)
        return db.guild.get(id, 'prefix') || config.defaultPrefix
    }
}

exports.meta = {
    name: 'helpers',
    autorun: 1
}