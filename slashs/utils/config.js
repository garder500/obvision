'use strict';
const Command = require("../../structure/Command.js");

class Config extends Command {
    constructor() {
        super({
            name: 'config',
        });
    }

     async run(client, button) {
      button.reply({ content:"This is not added at this time", ephemeral:true})
    }
}

module.exports = new Config;