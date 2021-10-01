'use strict';

module.exports = (client, oldState, newState) => {
     if(newState.member.id === client.user.id){
          if(!newState.connection){
          if(client.guildVoc.has(newState.guild.id)) client.guildVoc.delete(newState.guild.id)
          if(client.timeoutsVoc.guild.has(newState.guild.id)){
                client.timeoutsVoc.guild.delete(newState.guild.id);
                if(client.timeoutsVoc.cmd.has(`tts-${newState.guild.id}`)) client.timeoutsVoc.cmd.delete(`tts-${newState.guild.id}`)
                if(client.timeoutsVoc.cmd.has(`play-${newState.guild.id}`)) client.timeoutsVoc.cmd.delete(`play-${newState.guild.id}`)
               }
          }
     }
         /*
       Les lignes ci-dessous seront logger
       */
};