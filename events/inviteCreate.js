'use strict';

module.exports = (client, invite) => {
    if (!invite.guild) {
        return ;
    }
     client.guilds.cache.forEach(guild => {
    if(guild.me.permissions.has("MANAGE_GUILD")){
    guild.invites.fetch().then(invites => client.guildInvites.set(guild.id, invites)).catch(err => {});
      }  
  });
    /*
           Les lignes ci-dessous seront logger
    */     
};
