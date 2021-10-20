'use strict';

const Command = require("../../structure/Command.js");

class Invite extends Command {
    constructor() {
        super({
            name: 'invite',
        });
    }
  async run(client, button) {
      button.reply({ content:"This is not added at this time", ephemeral:true})
    }
}

module.exports = new Invite;