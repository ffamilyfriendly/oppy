const req = require("request");

const load = async (m,template) => {
   m.respond(`confirm loading of template by responding with \`yes\`.\n*please note that this will delete old channels & roles.* `,"load template");
   m.channel.awaitMessages(response => response.author.id === m.author.id, { max: 1, time: 1000 * 10, errors: ['time'] })
   .then(async col => {
    if(col.first().content != "yes") return m.respond("canceling")

    //main loading part
    const roles = await m.guild.roles.filter(role => role.editable && role.id !== m.guild.defaultRole.id)
    try {
        roles.deleteAll()
        m.guild.channels.deleteAll()
    } catch(err) {console.error(`could not delete roles/channels on guild with ID "${m.guild.id}"`)}

    let roleList = {}

    for(let i = 0; i < template.roles.length; i++) {
        const role = template.roles[i]
        //skip @everyone role, this will skip any normal role called that but why would anyone have that
        if(role.name !== "@everyone") { 
            roleList[roleList.id] = await m.guild.createRole({
                name:role.name,
                color:role.color,
                hoist:role.hoist,
                permissions: role.perms
            })
        } else roleList[role.id] = m.guild.defaultRole
    }

    //endof main loading part
   })
   .catch(e => {
       return m.respond(`${e}`,"something went wrong | loading of template halted")
   })
   
}

exports.run = async (m, a) => {
    // Create an embed
    if (!a[0]) return m.respond("no id passed");
    req(`https://familyfriendly.xyz/api/template/${a[0]}`, { method: "GET" }, (e, data) => {
        if(e) return m.respond("could not query template","server error")
        const t = JSON.parse(data.body)[0]
        if(!t) return m.respond(`no template with id "${a[0]}" found`,"not found")
        load(m,JSON.parse(t.data))
    })
};
exports.meta = {
    names: ['preset', 'load'],
    permissions: ["ADMINISTRATOR"],
    help: {
        description: 'load a preset',
        usage: ' <preset ID>',
        category: 'main'
    },
    cooldown: {
        enabled: true,
        time: 1000 * 60 * 7 //15 minute cooldown for this command, abusing discord API no bueno
    }
};
