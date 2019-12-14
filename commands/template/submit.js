const Preset = require("../../library/models/presets")
const { client } = require('../../bot')
exports.run = async(m, a) => {
   


const template = {
    creds: m.member.tag,
    roles: m.guild.roles.map(r => {
        return {
            name: r.name,
            id: r.id,
            color: r.hexColor,
            perms: r.permissions,
            hoist: r.hoist,
        }
    }),
    channels: m.guild.channels.filter(c => c.type === "category").map(c => {
        return {
            name:c.name,
            position:c.position,
            perms: c.permissionOverwrites.filter(p => p.type === "role"),
            children: c.children.map(child => {
                return {
                    name:child.name,
                    type:child.type,
                    position:child.position,
                    perms: child.permissionOverwrites.filter(p => p.type === "role")
                }
            })
        }
    })
}
let meta = {
    tags:[],
    name:"",
    userID:m.author.id,
    description:"",
    username:m.member.tag
}



m.prompt("what do you want to name this preset?",20)
.then(a => {
    if(!a) return;
    meta.name = a.first().content.toLowerCase()
    m.prompt('what tags do you want to give this preset? (separate with ",")',30)
    .then(a2 => {
        if(!a2) return;
        meta.tags = a2.first().content.toLowerCase().split(",")
        m.prompt('give a description of your server',40)
        .then(a3 => { 
            meta.description = a3.first().content.toLowerCase()

            Preset.find({userID:m.author.id},async (err,lines) => {
                if(err) return m.respond("could not fetch templates","error")
                const voted = await m.author.hasVoted()
                if(lines.length >= 3 && !voted) return m.respond(`You cannot have more then **3** templates unless you are a __[premium user](https://familyfriendly.xyz/s/bot/premium.html)__`,"sorry")
                else {
                    const preset = new Preset({
                        username: meta.username,
                        userID: meta.userID,
                        name: meta.name,
                        description: meta.description,
                        tag1:meta.tags[0],
                        tag2:meta.tags[1],
                        tag3:meta.tags[2],
                        preset: template
                    })
                    
                    preset.save()
                    .then(result => {
                        m.respond(`**preset id:** ${result._id}`,`preset succesfully added to database!`)
                    })
                    .catch(err => console.error(err))
                }
            })
         })
    })
})
}

exports.meta = {
    names: ['submit', 'upload'],
    permissions: ["ADMINISTRATOR"],
    help: {
        description: 'submit a preset',
        usage: '',
        category: 'main'
    },
    cooldown: {
        enabled:true,
        time:1000 * 60 * 5
    }
}
