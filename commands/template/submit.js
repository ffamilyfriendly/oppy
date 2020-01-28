exports.run = (m, a) => {
   m.respond("you can now only upload templates from [the website](https://familyfriendly.xyz/bot/dash.html)","moved")
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
