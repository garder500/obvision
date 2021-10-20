'use strict';

const Command = require("../../structure/Command.js");

class Suggest extends Command {
    constructor() {
        super({
            name: 'suggest',
        });
    }

   async run(client, button) {
      button.reply({ content:"This is not added at this time", ephemeral:true})
    }
}

module.exports = new Suggest;