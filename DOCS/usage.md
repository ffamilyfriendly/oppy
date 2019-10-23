# Usage
This guide explains how to download, configure and use `discord-bot-boilerplate` step by step

## Installing programs
### Git
- [Download git](https://git-scm.com/downloads)
- If you're using linux, use your package manager instead. The exact command depends on your distribution
    - Arch-based: `sudo pacman -S git`
    - Debian-based: `sudo apt-get install git`
    - ... use google

### Nodejs
- [Download Node.js](https://nodejs.org/en/download/)
- If you're using linux, use your package manager instead. The exact command depends on your distribution
    - On Arch-based systems use `sudo pacman -S nodejs`
    - On Debian-based or other systems search for `nodesource` on google

### Yarn
- If you already installed nodejs, this can be done using `npm`
    > npm install --global yarn
- Alternatively, you can [download yarn here](https://yarnpkg.com/lang/en/docs/install/)

### Build tools
- Windows:
    - Open a terminal window as the administrator
        - Right click the Windows icon
        - Windows Powershell **(admin)**
        - Run `npm install --global windows-build-tools`
            - Due to some bugs, this doesn't work with `yarn`, so use `npm`
        - This will probably take a _very, very_  long time
        - It's not done until it says `PS C:/WINDOWS/system32` again
        - Did I mention that this is going to take a very long time?
- Linux: `sudo apt-get install build-essential` (the exact command depends on your distribution)

## Setting up
- Open a terminal window
    - This can be cmd, powershell, bash or whatever else you like

- Go to the folder where you want to install the bot
    - For example on Windows: `cd C:/Users/User/Desktop`
    - On linux: `cd ~/`

- Clone the repository
    - > git clone https://gitlab.com/Wait_What_/discord-bot-boilerplate.git
    - This will create a folder called `discord-bot-boilerplate` and install the bot inside

- Go into the project directory
    > cd discord-bot-boilerplate

- Install the dependencies using `yarn`
    - > yarn install
    - If you get warnings about missing optional dependencies, ignore them
    - This will probably take a few minutes
    - If you get errors, read them and resolve them
        - Are you sure you installed build tools properly?

- Edit `config_template.js` using a text editor (like notepad, vscode, nano or something else)
    - Set the discord token. You can get the token from the 
        [Discord Developer Portal](https://discordapp.com/developers/applications)
        - [How to create a discord bot account](https://anidiots.guide/getting-started/getting-started-long-version)
            - Create an application
            - Add a bot account to it
            - [Generate a bot invite](https://discordapi.com/permissions.html) and invite it to your server
        - Do not share the token with anyone. It's like your bot's password
            - Don't publish it on git either obviously
    - Set the default prefix. Example: `!`
        - The bot will respond to commands that start with the prefix you set
    - Set the owner IDs (this should probably just be you and maybe your alt)
        - Enable `Developer Mode` in your discord settings under `Appearance`
        - Right click your profile picture in a chat
        - Click `Copy ID`
        - Bot owners have access to the dev commands, which can be very dangerous. People with access to commands such as `eval` basically have full control over your computer, can access and delete all your files etc.
    - You should keep `shards` on `auto`, unless you know what you're doing
        - You'll need sharding once your bot reaches 2500 guilds
        - You need 1 shard per about 1000 guilds
    - Set the bot name
    - Set the default embed color. Example: `#ffffff`
    - Set the activity
    - Choose if you want to log command use or not
        - It's useful for debugging, but creates a mess in the console
    - Check out [Database](database.md) for more info on `dbDefaults`
        - Don't touch it for now

- Rename `config_template.js` to `config.js`
    - Windows: `rename config_template.js config.js`
        - You can just use windows explorer instead
    - Linux: `mv config_template.js config.js`

- Start the bot
    - Run `node bot`
    - If you get an error, read what it says on the first or second line. Don't give up just yet!
        - Ask someone about it if you can't figure it out yourself or use google
        - Make sure you ran `yarn install`
    - If you want the bot to restart itself when it crashes, use `pm2`
        - `npm install --global pm2`
        - `pm2 start bot.js`
        - `pm2 logs bot` / `pm2 stop bot` / `pm2 restart bot`

- Check if the bot is working by using the `!ping` command (the prefix depends on what you set in the config)

# Done!
At this point, your bot should be working. To run it 24/7 you'll probably need a VPS, unless you want to keep your computer running all day

# What's next?
Check out [Adding commands](addingCommands.md) and [Adding modules](addingModules.md)
