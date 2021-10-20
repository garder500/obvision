'use strict';

const Command = require("../../structure/Command.js");

class ReloadCommand extends Command {
    constructor() {
        super({
            name: 'reload',
        });
    }

   async run(client, button) {
      button.reply({ content:"This is not added at this time", ephemeral:true})
    }
}

module.exports = new ReloadCommand;