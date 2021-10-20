'use strict';

const Command = require("../../structure/Command.js");

class Ping extends Command {
    constructor() {
        super({
            name: 'ping',
        });
    }

    async run(client, button) {
      button.reply({ content:"This is not added at this time", ephemeral:true})
    }
}

module.exports = new Ping;