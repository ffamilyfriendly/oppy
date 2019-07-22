module.exports = {
    tokens: {
        discord: '' // Do not share the token with anyone
    },
    defaultPrefix: '>',
    owners: [ // User IDs of owners of the bot
        ''
    ],
    shards: 'auto', // 'auto' or number, up to 2500 guilds per shard
    name: 'TestBot',
    embedColor: '#ffffff', // Default color for embeds
    activity: {
        text: 'BOTservers servers | BOTprefixhelp',
        /* BOTservers - server count
           BOTusers - user count
           BOTprefix - default prefix */
        type: 'PLAYING' 
        /* PLAYING
           STREAMING
           LISTENING
           WATCHING */

    },  
    logCommands: {
        enabled: false, // Creates a mess in the console
        ignoreBotOwners: true
    },
    dbDefaults: { // Default objects in the database
        user: {},
        guild: {
            prefix: undefined
        }
    }
}