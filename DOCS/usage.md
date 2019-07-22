# Usage
This guide explains how to download, configure and use the bot step by step.

- Install `git`
    - [Download git](https://git-scm.com/downloads)
    - If you're using linux, use your package manager instead. The exact command depends on your distribution
        - Arch/manjaro: `sudo pacman -S git`
        - Debian/ubuntu/*buntu: `sudo apt-get install git`
        - ... use google
- Install `nodejs`
    - [Download Node.js](https://nodejs.org/en/download/)
    - If you're using linux, use your package manager instead. The exact command depends on your distribution
        - Look up nodesource on google for more info
- Open a terminal window
    - This can be cmd, powershell, bash or whatever else you like
- Clone the repository
    > git clone https://gitlab.com/BarkingDog/discord-bot-boilerplate.git
- Install yarn
    - If you already installed nodejs, this can be done using `npm`
        > npm install --global yarn
    - You can also [download yarn here](https://yarnpkg.com/lang/en/docs/install/)
- Go into the project directory
    > cd discord-bot-boilerplate
- Install the dependencies using `yarn`
    > yarn install
    - If you get warnings about missing optional dependencies, ignore them
    - This may take some time to install
    - If you get errors, read them and resolve them
        - You may need to install build tools:
            - Windows: `yarn global add windows-build-tools`
                - This may take a while to install
            - Linux: `sudo apt-get install build-essential` (the exact command depends on your distribution)
- Edit `config_template.js` using a text editor (like notepad or nano or something)
    - Set the discord token. You can get the token from the 
        [Discord Developer Portal](https://discordapp.com/developers/applications)
        - [How to create a discord bot account](https://anidiots.guide/getting-started/getting-started-long-version)
            - Create an application
            - Add a bot account to it
            - [Generate a bot invite](https://discordapi.com/permissions.html) and invite it to your server
        - Do not share the token with anyone. It's like your bot's password.
            - Don't publish it on git either obviously
    - Set the default prefix. Example: `!`
        - The bot will respond to commands that start with the prefix you set
    - Set the owner IDs (this should probably just be you and maybe your alt)
        - Enable `Developer Mode` in your discord settings under `Appearance`
        - Right click your profile picture in a chat
        - Click `Copy ID`
    - You should keep `shards` on `auto`, unless you know what you're doing.
        - You'll need sharding once your bot reaches 2500 guilds
    - Set the bot name
    - Set the default embed color. Example: `#ffffff`
    - Set the activity
    - Choose if you want to log command use or not
    - Check out [Database](database.md) for more info on `dbDefaults`
        - Don't touch it for now
- Rename `config_template.js` to `config.js`
    - Windows: `rename config_template.js config.js`
        - You can just use windows explorer instead
    - Linux, android or MacOS: `mv config_template.js config.js`
- Start the bot
    - `node bot` or `yarn start`
    - If you get an error, read what it says on the first or second line. Don't give up just yet!
        - Ask someone about it if you can't figure it out yourself or use google.
        - Make sure you ran `yarn install`
    - If you want the bot to restart itself when it crashes, use `pm2`
        - `yarn global add pm2`
        - `pm2 start bot.js`
        - `pm2 logs bot`
- Check if the bot is working by using the `!ping` command (the prefix depends on what you set in the config) in a server
    - If the bot responds, it's working

# Done!
At this point, your bot should be working. To run it 24/7 you'll probably need a VPS, unless you want to keep your computer running all day and night.

# What's next?
Check out [Adding commands](addingCommands.md) and [Adding modules](addingModules.md)
