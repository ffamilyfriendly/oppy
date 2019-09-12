const Discord = require('discord.js')
const { bot, db, config } = require('../bot')

module.exports = {
    embed: col => new Discord.Embed(col),
    sleep: ms => new Promise(res => setTimeout(res, ms)),
    guildCount: async () => {
        if (bot.shard) {
            const values = await bot.shard.fetchClientValues('guilds.size')
            return values.reduce((p, v) => p + v, 0)
        } else return bot.guilds.size
    },
    userCount: async () => {
        if (bot.shard) {
            const values = await bot.shard.fetchClientValues('users.size')
            return values.reduce((p, v) => p + v, 0)
        } else return bot.users.size
    },
    getPrefix: id => {
        db.ensure.guild(id)
        return db.guild.get(id, 'prefix') || config.defaultPrefix
    }
}