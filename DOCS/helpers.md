# Helpers 
Helpers are functions that do very useful things. They are meant to save time and make code
more readable.

You can access them from `bot.helpers`

- `embed([color])`
    - Returns a RichEmbed with the default color so you wouldn't have to require discord and the config
- `sleep(ms)`
    - Returns a Promise that's resolved in a specified amount of miliseconds
    - Usage: `await sleep(500)`
- `guildCount()` / `userCount()`
    - Returns a promise with the total guild/user count from all shards
- `getPrefix(id)`
    - Gets the prefix in a guild
- `ensureUser(id)` / `ensureGuild(id)`
    - Makes sure the database entry for this user has all the required properties specified in `config.js`
    - More info on this in [Database](database.md)
