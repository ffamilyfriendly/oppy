const Discord = require('discord.js')
const Enmap = require('enmap')

console.log(`Starting ${require('./config').name}`)

// Database
const db = {
    bot: new Enmap({ name: 'botdata' }),
    guild: new Enmap({ name: 'guilddata', ensureProps: true }),
    user: new Enmap({ name: 'userdata', ensureProps: true })
}

// Client
const bot = new Discord.Client()

// Modules
const modules = new Discord.Collection()

// Exports
module.exports = { bot, db, modules }

// Module loader
const { getFileList } = require('./library/getFileList')
getFileList('./modules').forEach(moduleName => {
    const module = require(moduleName)
    modules.set(module.meta.name, module)
})

// Module autorun
modules
    .filter(module => module.meta.autorun)
    .sort((a, b) => a.meta.autorun - b.meta.autorun)
    .forEach(module => module.run())
