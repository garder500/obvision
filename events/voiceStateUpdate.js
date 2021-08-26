'use strict';

module.exports = (client, oldState, newState) => {
console.log({
        speaking : newState.speaking,
        selfDeaf : newState.selfDeaf,
        selfMute: newState.selfMute,
        serverDeaf : newState.serverDeaf,
        serverMute : newState.serverMute,
        timestamp : Date.now()   
    })
     if(newState.member.id === client.user.id){
          if(!newState.connection){
          if(client.timeoutsVoc.guild.has(newState.guild.id)){
                client.timeoutsVoc.guild.delete(newState.guild.id);
                if(client.timeoutsVoc.cmd.has(`tts-${newState.guild.id}`)) client.timeoutsVoc.cmd.delete(`tts-${newState.guild.id}`)
                if(client.timeoutsVoc.cmd.has(`play-${newState.guild.id}`)) client.timeoutsVoc.cmd.delete(`play-${newState.guild.id}`)
                if(client.timeoutsVoc.cmd.has(`record-${newState.guild.id}`)) client.timeoutsVoc.cmd.delete(`record-${newState.guild.id}`)
                if(client.timeoutsVoc.cmd.has(`vocmod-${newState.guild.id}`)) client.timeoutsVoc.cmd.delete(`vocmod-${newState.guild.id}`)
               }
          }
     }
         /*
       Les lignes ci-dessous seront logger
       */
};