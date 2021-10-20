'use strict';
const Command = require("../../structure/Command.js"),
    Discord = require("discord.js"),
    sdk = require("microsoft-cognitiveservices-speech-sdk"),
    readline = require("readline"),
    fs = require("fs");
  const waiter = new Set();
class Tts extends Command {
    constructor() {
        super({
            name: 'tts',
        });
    }

      async run(client, button) {
      button.reply({ content:"This is not added at this time", ephemeral:true})
    }
}

module.exports = new Tts;