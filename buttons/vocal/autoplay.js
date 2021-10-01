'use strict';

const Button = require("../../structure/Button.js");

class Autoplay extends Button {
    constructor() {
        super({
            name: 'autoplay',
        });
    }

    async run(client, button,user) {
if(user.id === button.user.id){
    let EOR = client.functions.EOR;
    const connection = client.voc.getVoiceConnection(button.guild.id)
     if(connection){
        let message = button.message
       let msg = {
        embeds:[message.embeds[0]],
        components:message.components
       }
       if(client.guildVoc.has(button.guild.id)){
       let player = client.guildVoc.get(button.guild.id)
       if(player.autoplay){
        client.guildVoc.delete(button.guild.id)
        client.guildVoc.set(button.guild.id,{
            queue:player.queue,
            currentTrack:player.currentTrack,
            autoplay:false
        })
         msg.components[0].components[2] =  {
      type:"BUTTON",
      customId: "autoplay-"+ user.id,
      label: "Auto-play",
      style: "SECONDARY"
    }
                button.update(msg)
       }else{
         client.guildVoc.delete(button.guild.id)
        client.guildVoc.set(button.guild.id,{
            queue:player.queue,
            currentTrack:player.currentTrack,
            autoplay:true
        })
        msg.components[0].components[2] =  {
      type:"BUTTON",
      customId: "autoplay-"+ user.id,
      label: "Auto-play",
      style: "SUCCESS"
    }
        button.update(msg)
       }
   }else return button.reply({ embeds: [EOR({ desc:"Je ne joue pas de musique", error:"yes" },button)], ephemeral:true})
     }else{
    button.reply({ embeds: [EOR({ desc:"Je ne joue pas de musique", error:"yes" },button)], ephemeral:true})
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

module.exports = new Autoplay;