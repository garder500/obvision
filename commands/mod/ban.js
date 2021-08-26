'use strict';

const Command = require("../../structure/Command.js");

class Ban extends Command {
    constructor() {
        super({
            name: 'ban',
            category: 'mod',
            description: 'Banni un utilisateur mentionné en lui mettant une raison.\nDescriptif du temps : `y` = Année, `d` = Jour,  `h`= Heure, `m` = Minute, `s` = seconde',
            usage: 'ban <ID|@user> [raison]',
            example: ['ban @garder500#8260', 'ban @garder500#8260 Trop perturbateur'],
            botPerms: ["BAN_MEMBERS"],
            perms: "BAN_MEMBERS"
        });
    }

    async run(client, message, args) {
        if(!args[1]) return message.reply("> Vous devez précisé l'utilisateur à bannir !",{ failIfNotExists: false})
            let userID = message.guild.members.cache.find(u => u.id === args[1] ) || message.mentions.members.first() || client.users.cache.get(args[1]) || await client.users.fetch(args[1])
        if(!userID) return message.reply("> L'utilisateur est introuvable !",{failIfNotExists: false})
        let option = { days: 7};
            if(args[2]) option.reason =  args.slice(2).join(" ")
                if(userID.user) userID = userID.user;
        message.guild.members.ban(userID,option)
              message.channel.send({
             embeds:[{
                    author:{
                            name: message.author.username,
                            icon_url: message.author.displayAvatarURL()
                        },
                        title: "Un utilisateur à été banni",
                        description:`Utilisateur : ${userID.username}\nRaison : ${args[2] ? args.slice(2).join(" ") : "Non défini"}`,
                footer: {
                    icon_url: client.user.displayAvatarURL()
                     },                   
                 }]
        })
    }
}

module.exports = new Ban;