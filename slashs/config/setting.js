'use strict';

const Command = require("../../structure/Command.js");

class setting extends Command {
    constructor() {
        super({
            name: 'setting',
            });
    }

     async run(client, button) {
      button.reply({ content:"This is not added at this time", ephemeral:true})
    }
}

module.exports = new setting;