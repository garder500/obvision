'use strict';

const Button = require("../../structure/Button.js");

class Stop extends Button {
    constructor() {
        super({
            name: 'stop',
        });
    }

    async run(client, button,user) {
if(user.id === button.user.id){
            let EOR = client.functions.EOR;
     if(button.member.voice.channel){
        try{
            const connection = client.voc.getVoiceConnection(button.guild.id)
            if(connection){
            connection.destroy();
            if(client.guildVoc.has(button.guild.id)) client.guildVoc.delete(button.guild.id)
            if(client.timeoutsVoc.guild.has(button.guild.id)){
                client.timeoutsVoc.guild.delete(button.guild.id);
                if(client.timeoutsVoc.cmd.has(`tts-${button.guild.id}`)) client.timeoutsVoc.cmd.delete(`tts-${message.guild.id}`)
                if(client.timeoutsVoc.cmd.has(`play-${button.guild.id}`)) client.timeoutsVoc.cmd.delete(`play-${message.guild.id}`)
            }
            button.reply({ embeds: [EOR({ desc:"J'ai correctement quitté le vocal", error:"no" },button)]})
            }else{
                return button.reply({ embeds: [EOR({ desc:"Je ne suis connecté à aucun salons vocal", error:"yes" },button)],ephemeral: true})
            }
        }catch(e){
            button.reply({ content: "Je ne suis pas dans ce channel vocal ou je ne suis pas connecté à un channel vocal",ephemeral: true })
        }
      }else{
        return button.reply({ content:"Vous devez être dans un channel vocal pour que je puisse le quitté",ephemeral: true })
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

module.exports = new Stop;