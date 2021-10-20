'use strict';

const Command = require("../../structure/Command.js");
const { loadavg, cpus, totalmem } = require('os');

class Stats extends Command {
    constructor() {
        super({
            name: 'stats',
        });
    }

    async run(client, button) {
      button.reply({ content:"This is not added at this time", ephemeral:true})
    }
}

module.exports = new Stats;