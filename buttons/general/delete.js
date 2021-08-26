'use strict';

const Button = require("../../structure/Button.js");

class Delete extends Button {
    constructor() {
        super({
            name: 'delete',
        });
    }

    async run(client, button) {
             client.channels.cache.get(button.channelId).messages.fetch(button.message.id).then(msg=>{
            if(!msg.reference){
            msg.delete();
    client.api.interactions(button.id, button.token).callback.post({data: {
    type: 4,
    data: {
    flags: 64,
    content: "Le message à été supprimé"
    },
}})
            }else{
                client.channels.cache.get(msg.reference.channelId).messages.fetch(msg.reference.messageId).then(m=>{
            if(m.author.id === button.member.user.id){
                msg.delete();
    client.api.interactions(button.id, button.token).callback.post({data: {
    type: 4,
    data: {
    flags: 64,
    content: "Le message à été supprimé"
    },
}})
                }else{
                    client.api.interactions(button.id, button.token).callback.post({data: {
    type: 4,
    data: {
    flags: 64,
    content: "Vous n'êtes pas l'auteur de cette commande."
    },
}})
                }
                }).catch(e =>{
                        msg.delete();
    client.api.interactions(button.id, button.token).callback.post({data: {
    type: 4,
    data: {
    flags: 64,
    content: "Le message à été supprimé car l'auteur est introuvable"
    },
}})
})
            }
          
        })
    }
}

module.exports = new Delete;