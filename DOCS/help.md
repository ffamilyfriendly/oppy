# The help map
The help map is exported from `modules/commandLoader.js`.

The keys are all command categories and the values are 2d arrays of command names and `help` objects from each command's `meta.help`.
The command is not added to help if the category doesn't exist or is empty.

This can later be turned into a help command, docs etc.
See an example in `commands/examples/help.js`.