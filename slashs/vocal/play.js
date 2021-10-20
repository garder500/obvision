'use strict';
const Command = require("../../structure/Command.js");
const ytdl = require("ytdl-core");
const scrapper = require("youtube-scrapper")
const { stream } = require('play-dl');

class Play extends Command {
    constructor() {
        super({
            name: 'play',
        });
    }

     async run(client, button) {
      button.reply({ content:"This is not added at this time", ephemeral:true})
    }
}

module.exports = new Play;