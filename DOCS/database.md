# Database
This bot uses enmap. You can find better usage guides on google

# Usage guide
```js
const { db } = require('../bot')
// The db object contains 3 enmaps: user, guild and bot
// And an object 'ensure' with 2 functions: user and guild

// Set a value
db.user.set('someUserID', { hi: 'hello' })

// Get the value
const value = db.user.get('someUserID')
console.log(value.hi) // 'hello'
```
The database won't disappear after restarting the bot, unless you remove the name property from the constructor

# Defaults
Before reading/writing anything to the database, you should ensure that all the required values exist in them
```js
const { db } = require('../bot)

db.ensure.user(id)
// Will set the user's value to the default specified in config.js
// This will not delete existing values

// Also works with guilds
db.ensure.guild(id)

// And only then
db.user.set(id, 420, 'balance')
```

# Enmap docs
For more info, check out [enmap.evie.dev](https://enmap.evie.dev/)