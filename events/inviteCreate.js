'use strict';

module.exports = (client, invite) => {
    if (!invite.guild) {
        return ;
    }
     client.guilds.cache.forEach(guild => {
    guild.invites.fetch().then(invites => client.guildInvites.set(guild.id, invites)).catch(err => console.log(err));
        });
    /*
           Les lignes ci-dessous seront logger
    */     
};
