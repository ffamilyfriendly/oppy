const req = require("request")

exports.run = async (m, a) => {
    // Create an embed
    if(!a[0]) return m.respond("no search query passed");
    const query = a.join(" ")
    //fetch template from
    req(`https://familyfriendly.xyz/api/query?q=${encodeURIComponent(query)}`,{method:"GET"},(e,data) => {
    const dat = JSON.parse(data.body)
    if(dat.length <= 0) {
        return m.channel.send("no templates found matching your query")
    }
    let resStr = `**found ${data.length} result(s):**\`\`\`ini\n`
    for(let i = 0; i < dat.length; i++) {
        resStr+=`[${i} - ${dat[i].name}]\ndescription= ${dat[i].description}\nid= ${dat[i].id}\n`
    }
    resStr+="```"
    m.channel.send(resStr)
    })
}

exports.meta = {
    names: ['search', 'find'],
    permissions: [],
    help: {
        description: 'search for templates',
        usage: ' <query>',
        category: 'main'
    },
    cooldown: {
        enabled:true,
        time:1000 * 10
    }
}
