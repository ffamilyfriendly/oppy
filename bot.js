// Load discord.js and enmap
const Discord = require('discord.js')
const Enmap = require('enmap')

// Load config
const config = require('./config')

// Start loading the bot
console.log(`Starting ${require('./config').name}`)

// Create databases
const db = {
    bot: new Enmap({ name: 'botdata' }),
    guild: new Enmap({ name: 'guilddata', ensureProps: true }),
    user: new Enmap({ name: 'userdata', ensureProps: true })
}

// Create a Discord client
const bot = new Discord.Client()

// Create a collection for modules
const modules = new Discord.Collection()

// Export client, databases, modules and config
module.exports = { bot, db, modules, config }

// Mod discord.js and expand db
require('./library/mods')(Discord, db)

// Load functions
module.exports.functions = require('./library/functions')

// Load modules
const getFileList = require('./library/getFileList')
getFileList('./modules').forEach(moduleName => {
    const module = require(moduleName)
    modules.set(module.meta.name, module)
})

// Run modules in order
modules
    .filter(module => module.meta.autorun)
    .sort((a, b) => a.meta.autorun - b.meta.autorun)
    .forEach(module => module.run())