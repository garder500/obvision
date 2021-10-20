'use strict';

const Command = require("../../structure/Command.js");

class Ban extends Command {
    constructor() {
        super({
            name: 'ban',
        });
    }

   async run(client, button) {
      button.reply({ content:"This is not added at this time", ephemeral:true})
    }
}

module.exports = new Ban;