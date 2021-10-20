'use strict';

const Command = require("../../structure/Command.js");

class Kick extends Command {
    constructor() {
        super({
            name: 'kick',
        });
    }

   async run(client, button) {
      button.reply({ content:"This is not added at this time", ephemeral:true})
    }
}

module.exports = new Kick;