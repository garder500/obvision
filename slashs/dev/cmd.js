'use strict';

const Command = require("../../structure/Command.js");
const Discord = require('discord.js');
const beautify = require("beautify");
const { exec } = require('child_process');

class Cmd extends Command {
    constructor() {
        super({
            name: 'cmd',
            });
    }
  async run(client, button) {
      button.reply({ content:"This is not added at this time", ephemeral:true})
    }
}
module.exports = new Cmd;