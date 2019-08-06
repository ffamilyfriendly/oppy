# Adding commands
Adding commands to the bot is as simple as just creating a file in `/commands/`
The name of the file does not matter, neither does the name of the directory you put it in

# An example with comments
This is an example `ping.js` command:
```js
const { bot, functions } = require('../../bot') // Require the client

exports.run = (m, a) => { // m is the message object, a is an array of arguments.
    const embed = functions.embed() // Easy way to create an embed with the default color
        .setAuthor('Ping', bot.user.displayAvatarURL)
        .setDescription(`:ping_pong: ${Math.floor(bot.ping)} ms`)

    m.channel.send({embed}) // Send the embed
}

exports.meta = {
    names: ['ping', 'pong'], // Names of the command. The first one is considered to be the main name
    permissions: [], // An array of permissions needed to run this command
        // Can be BAN_MEMBERS, MANAGE_MESSAGES etc. or BOT_OWNER
    help: {
        description: 'See the bot\'s ping', // The description of the command used in help
        usage: '', // Usage of the command. Use [] for optional arugments: !ping [@member]
        category: 'examples' // The category used in help
    }
}
```

Adding this command will automatically add it to the help

# Discord.js docs
For more info, check out [discord.js.org](https://discord.js.org/#/)