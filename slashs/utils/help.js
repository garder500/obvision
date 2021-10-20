'use strict';

const Command = require("../../structure/Command.js");

class Help extends Command {
    constructor() {
        super({
            name: 'help',
        });
    }

   async run(client, button) {
      button.reply({ content:"This is not added at this time", ephemeral:true})
    }
}

module.exports = new Help;