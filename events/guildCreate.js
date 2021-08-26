'use strict';

module.exports = (client, guild) => {
guild.fetchInvites().then(invites => client.guildInvites.set(guild.id, invites)).catch(err => {});
     /*
       Les lignes ci-dessous seront logger
       */    
};
