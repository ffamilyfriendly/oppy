# Adding modules
Adding modules to the bot is as simple as just creating a file in `/modules/`.
The name of the file does not matter, neither does the name of the directory you put it in.

# Core modules
Core modules are required for the bot to work, unless they're not needed to you.

# Example module with comments
Here is an example of a `login.js` module
```js
const { bot } = require('../../bot') // Require the client
const config = require('../../config') // And the config

exports.run = () => {
    console.log('Logging in...')
    bot.login(config.token) // Log in

    bot.on('ready', () => console.log('Logged in!'))
}

exports.meta = {
    name: 'login', // The name of the module. You can't have multiple modules with the same name.
    autorun: 2 // This module will be the 2nd module to run. You can set it to 0 to not have it execute automatically.
}
```