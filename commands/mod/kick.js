'use strict';

const Command = require("../../structure/Command.js");

class Kick extends Command {
    constructor() {
        super({
            name: 'kick',
            category: 'mod',
            description: 'Kick un utilisateur mentionné en lui mettant une raison.',
            usage: 'kick <ID|@user> [raison]',
            example: ['kick @garder500#8260 trop perturbateur','kick @garder500#8260'],
            botPerms: ["KICK_MEMBERS"],
            perms: "KICK_MEMBERS"
        });
    }

    async run(client, message, args) {
        if(!args[1]) return message.reply("> Vous devez précisé l'utilisateur à kick !",{failIfNotExists: false})
            let userID = message.guild.members.cache.find(u => u.id === args[1] ) || message.mentions.members.first()
        if(!userID) return message.reply("> L'utilisateur est introuvable !",{failIfNotExists: false})
        let option = { };
    if(args[2]) option.reason =  args.slice(2).join(" ")
        message.guild.member(userID.id).kick(userID,option)
        message.channel.send({
             embeds:[{
                    author:{
                            name: message.author.username,
                            icon_url: message.author.displayAvatarURL()
                        },
                        title: "Un utilisateur à été kick",
                        description:`Utilisateur : ${userID.user.username}\nRaison : ${args[2] ? args.slice(2).join(" ") : "Non défini"}`,
                footer: {
                    icon_url: client.user.displayAvatarURL()
                     },                   
                 }]
        })
      
       
    }
}

module.exports = new Kick;