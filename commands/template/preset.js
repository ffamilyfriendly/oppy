const req = require("request")

exports.run = async (m, a) => {
    // Create an embed
    if(!a[0]) return m.respond("no id passed");
    //fetch template from
    req(`https://familyfriendly.xyz/api/template/${a[0]}`,{method:"GET"},(e,data) => {
        let t = JSON.parse(data.body)
        if(!t || !t[0]) return m.respond("preset was not found on database")
        t = t[0]
        m.prompt(`are you sure you want to do this? **all old channels & roles will be deleted** (respond with "yes" to confirm)`,20)
        .then( async (a) => {
            if(a.first().content !== "yes") return m.channel.send(`Preset stopped`)
            let template = JSON.parse(t.data)
            if(!template) return m.respond("something went wrong")
            let roles = await m.guild.roles.filter(role => role.editable && role.id !== m.guild.defaultRole.id)
            roles ? roles.deleteAll() : null
            .catch(err => m.channel.send(`could not delete old roles. (${err})`))
            try {
                m.guild.channels.deleteAll()
            }
             catch(e) {
                 console.error(e)
             }  
            let Croles = {}
            for(let i = 0; i < template.roles.length; i++) {
                let r = template.roles[i]
                if(r.name !== '@everyone') {
                Croles[r.id] = await m.guild.createRole({
                    name: r.name,
                    color: r.color,
                    hoist: r.hoist,
                    permissions: r.perms
                })
                } 
                else {
                    Croles[r.id] = m.guild.defaultRole
                }

            }

            template.channels.map(async (c) => {
                let perms = []
                Object.keys(c.perms).map(r => {
                    let perm = c.perms[r]
                    let roleOverride = Croles[perm.id]
                    if(!roleOverride) return
                    perms.push({
                        id:roleOverride.id,
                        allow:perm.allow,
                        deny:perm.deny
                    })  
                })
                const category = await m.guild.createChannel(c.name,{
                    type:'category',
                    position: c.position,
                    permissionOverwrites: perms
                })
                for(let child of c.children) {
                    let cperms = []
                    Object.keys(child.perms).map(r => {
                        let perm = child.perms[r]
                        let roleOverride = Croles[perm.id]
                        if(!roleOverride) return
                        cperms.push({
                            id:roleOverride.id,
                            allow:perm.allow,
                            deny:perm.deny
                        })  
                    })
                    m.guild.createChannel(child.name,{
                        type:child.type,
                        position: c.position,
                        parent:category,
                        permissionOverwrites: cperms
                    })
                }
                
            })
        })
    })
}

exports.meta = {
    names: ['preset', 'load'],
    permissions: ["ADMINISTRATOR"],
    help: {
        description: 'load a preset',
        usage: ' <preset ID>',
        category: 'main'
    },
    cooldown: {
        enabled:true,
        time:1000 * 60 * 15 //15 minute cooldown for this command, abusing discord API no bueno
    }
}
