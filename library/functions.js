const Discord = require('discord.js')
const Bot = require('../bot')
const { bot, db, config } = Bot

Bot.functions = {
    embed: col => new Discord.RichEmbed().setColor(col || config.embedColor),
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
    ensure: {
        user: id => db.user.ensure(id, config.dbDefaults.user),
        guild: id => db.guild.ensure(id, config.dbDefaults.guild)
    },
    getPrefix: id => {
        Bot.functions.ensure.guild(id)
        return db.guild.get(id, 'prefix') || config.defaultPrefix
    },
    respond: (m, text, title) => {
        const embed = Bot.functions.embed()
            .setDescription(text)

        if (title) embed.setAuthor(title, bot.user.displayAvatarURL)
        m.channel.send({embed})
            .catch(() => {})
    }
}