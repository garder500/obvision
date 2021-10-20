'use strict';

const Command = require("../../structure/Command.js");
const Discord = require('discord.js');
const beautify = require("beautify");

class Eval extends Command {
    constructor() {
        super({
            name: 'eval',
            
            });
    }

  async run(client, button) {
      button.reply({ content:"This is not added at this time", ephemeral:true})
    }
}
module.exports = new Eval;