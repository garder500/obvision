'use strict';

const Button = require("../../structure/Button.js");

class Nowplaying extends Button {
    constructor() {
        super({
            name: 'nowplaying',
        });
    }

    async run(client, button,user) {
    let EOR = client.functions.EOR;
    const connection = client.voc.getVoiceConnection(button.guild.id)
     if(connection){
       let player= connection._state.subscription.player
       if(client.guildVoc.has(button.guild.id)){
        let track = client.guildVoc.get(button.guild.id).queue.get(client.guildVoc.get(button.guild.id).queue.keys().next().value)
        let duration = track.videoDetails.lengthSeconds==="0" ? "Live" : client.functions.timetrade(Number(track.videoDetails.lengthSeconds*1000))
        let played = client.functions.timetrade(parseInt(player._state.playbackDuration/1000)*1000)
        button.reply({ embeds: [{
            title:track.videoDetails.title,
            fields:[{
        name: "Duration",
        value: `${played}/${duration}`,
        inline: false,  
        }]
        }],ephemeral: true})
       }else{
    button.reply({ embeds: [EOR({ desc:"Aucune musique en cours", error:"yes" },button)],ephemeral: true})
     }
     }else{
    button.reply({ embeds: [EOR({ desc:"Je ne joue pas de musique", error:"yes" },button)],ephemeral: true})
     }
    }
}

module.exports = new Nowplaying;