'use strict';

const Command = require("../../structure/Command.js");

class Clear extends Command {
    constructor() {
        super({
            name: 'clear',
        });
    }

   async run(client, button) {
      button.reply({ content:"This is not added at this time", ephemeral:true})
    }
}

module.exports = new Clear;