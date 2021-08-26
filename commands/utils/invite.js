'use strict';

const Command = require("../../structure/Command.js");

class Invite extends Command {
    constructor() {
        super({
            name: 'invite',
            category: 'utils',
            description: 'Obtenez l\'invitaiton du bot',
            usage: 'invite',
            example: ['invite']
        });
    }
    async run(client, message) {
         message.channel.send({
            embeds: [{
                color: 0x14a1c5,
                title: `Invite moi`,
                description: `> Pour m'invité avec toutes les permissions: [Clique ici](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)\n\n> Pour inviter avec les permissions que vous voulez: [Clique ici](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=-1&scope=bot)\n\n> Pour inviter sans aucune permissions: [Clique ici](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot)`,
                thumbnail: {
                    url: client.user.displayAvatarURL(),
                },
                footer: {
                    text: "Un renouveau pour les bots classiques !",
                    icon_url: client.user.displayAvatarURL({ format: 'png', dynamic: true,})
                },
            }]
        })
       
            
    }
}

module.exports = new Invite;