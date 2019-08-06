# The help map
The help map is exported from `modules/commandLoader.js`

The keys are all command categories and the values are objects formed from the commands' `meta` objects
The entry is not added to help if the category doesn't exist or is empty

This can later be turned into a help command, docs etc
See an example in `commands/examples/help.js`