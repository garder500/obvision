'use strict';

const Button = require("../../structure/Button.js");

class Play extends Button {
    constructor() {
        super({
            name: 'play_pause',
        });
    }

    async run(client, button,user) {
if(user.id === button.user.id){
            let EOR = client.functions.EOR;
    const connection = client.voc.getVoiceConnection(button.guild.id)
     if(connection){
       let player= connection._state.subscription.player
       let message = button.message
       let msg = {
        embeds:[message.embeds[0]],
        components:message.components
       }
       if(player.unpause()){
     msg.components[0].components[1] =  {
      type:"BUTTON",
      customId: "play_pause-"+ user.id,
      emoji: "⏸️",
      style: "SECONDARY"
    }
            button.update(msg)
       }else{
        player.pause()
        msg.components[0].components[1] =  {
      type:"BUTTON",
      customId: "play_pause-"+ user.id,
      emoji: "▶️",
      style: "PRIMARY"
    }
        button.update(msg)
       }
     }else{
    button.reply({ embeds: [EOR({ desc:"Je ne joue pas de musique", error:"yes" },button)]})
     }
}else{
    client.api.interactions(button.id, button.token).callback.post({data: {
    type: 4,
    data: {
    flags: 64,
    content: "Vous n'avez pas le pouvoir d'effectuer cette action"
    },
    }})
}
    }
}

module.exports = new Play;