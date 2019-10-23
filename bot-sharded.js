const discord = require('discord.js')
const config = require('./config')

// Create the sharding manager
const manager = new discord.ShardingManager('./bot.js', {
    token: config.tokens.discord,
    totalShards: config.shards
})

// Spawn the shards
console.log(`Spawning ${config.shards == 'auto' ? 'the recommended amount of': config.shards} shards`)
manager.spawn()

// Log when a shard is spawned
manager.on('launch', shard => console.log(`Spawned shard ${shard.id}`))