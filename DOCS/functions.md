# Functions 
The bot has some functions that do very useful things. They are meant to save time and make code
more readable.

You can access them from `const { functions } = require('./bot')`

- `embed([color])`
    - Returns a RichEmbed with the default color so you wouldn't have to require `discord.js` or `config`
- `sleep(ms)`
    - Returns a Promise that's resolved in a specified amount of miliseconds
    - Usage: `await sleep(500)`
- `guildCount()` / `userCount()`
    - Returns a Promise with the total guild/user count from all shards
- `getPrefix(id)`
    - Gets the prefix in a guild

## Example usage
```js
const { functions } = require('../bot')

const foo = async () => {
    console.log('hi')
    await functions.sleep(2 * 1000) // Will wait for 2 seconds
    console.log('hello')
}
foo()
```