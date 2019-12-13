const { bot, config} = require('../bot')


module.exports = (Discord, db, DBL) => {
    // Discord mods
    Discord.Embed = class extends Discord.RichEmbed {
        constructor(color, data) {
            super(data)
            this.setColor(color || config.embedColor)
        }
    }

    Discord.Message.prototype.respond = function(content, title) {
        if (!content || typeof content != 'string' || content.length < 1 || content.length > 2048)
            throw new Error('DiscordMod error: content must be a string from 1 to 2048 characters')

        if (title && (typeof title != 'string' || title.length < 1 || title.length > 256))
            throw new Error('DiscordMod error: title must be undefined or a string from 1 to 256 characters')

        const embed = new Discord.Embed()
            .setDescription(content)

        if (title) embed.setAuthor(title, bot.user.displayAvatarURL)

        return this.channel.send({embed})
    }

    Discord.Message.prototype.prompt = async function(question,rt) {
        let embed = new Discord.RichEmbed()
        embed.addField(question,`question terminated ${rt} seconds after this message is sent...`)
        let questionMessage = await this.channel.send({embed})
        let r = await this.channel.awaitMessages(response => response.author.id === this.author.id, { max: 1, time: rt * 1000, errors: ['time'] })
                .catch(e => {
                    embed.setFooter("error: something went wrong")
                    embed.setColor("RED")
                    questionMessage.edit({embed})
                    return 
                })
        return r
    }

    Discord.User.prototype.hasVoted = function() {
        return DBL.hasVoted(this.id)
    }

    // Database mods
    db.ensure = {
        user: id => db.user.ensure(id, config.dbDefaults.user),
        guild: id => db.guild.ensure(id, config.dbDefaults.guild)
    }
}