'use strict';

const Command = require("../../structure/Command.js");

class ReloadCommand extends Command {
    constructor() {
        super({
            name: 'reload',
            category: 'dev',
            description: 'reload files',
            usage: 'reload <-all/-c/-e> <file-name-without-.js/-c/-all/-e>',
            example: ['reload -c help','reload -c ping','reload -e message', 'reload -e ready', 'reload -all -c','reload -all -e','reload -all -all'],
            perms: "owner",
            aliases: ['rl']
        });
    }

    async run(client, message, args) {
        if(!args[1]) {
            message.reply("> No type specified!");
        } else if(args[1] === '-all') {
            if(!args[2]) {
                client.reloadAllCommands().then(res_c => {
                    client.reloadAllSlashCommands().then(res_s => {
                            client.reloadAllButtons().then(res_b => {
                                client.reloadAllMenus().then(res_m => {
                                    client.reloadAllEvents().then(res_e => {
                        message.reply({failIfNotExists: false,allowedMentions : {
                            repliedUser: false
                        },
                        content: `${res_c}\n${res_s}\n${res_b}\n${res_m}\n${res_e}`})
                                })
                            })
                        })
                    })
                })
            } else if(args[2] === "-c") {
                client.reloadAllCommands().then(res => {
                    message.reply({failIfNotExists: false,content: res,
                        allowedMentions : {
                            repliedUser: false
                        }})
                })
            } else if(args[2] === "-e") {
                client.reloadAllEvents().then(res => {
                    message.reply({failIfNotExists: false,content: res,
                        allowedMentions : {
                            repliedUser: false
                        }})
                })
            }
        }  else if(!args[2]) {
            message.reply("> No file specified!");
        } else {
            if(args[1] === '-c') {
                client.reloadCommand(args[2]).then(async res => {
                    await  message.reply({failIfNotExists: false,content: res,
                        allowedMentions : {
                            repliedUser: false
                        }});

                });
            } else if(args[1] === '-e') {
                client.reloadEvent(args[2]).then(async res => {
                    await message.reply({failIfNotExists: false,content: res,
                        allowedMentions : {
                            repliedUser: false
                        }})
;
                });
            }

        }
    }
}

module.exports = new ReloadCommand;