'use strict';

const Command = require("../../structure/Command.js");

class Leave extends Command {
    constructor() {
        super({
            name: 'leave',
        });
    }

      async run(client, button) {
      button.reply({ content:"This is not added at this time", ephemeral:true})
    }
}

module.exports = new Leave;