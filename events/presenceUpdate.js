'use strict';

module.exports = (client, oldPresence, newPresence) => {
if(!newPresence.activities) return;
if(newPresence.activities.length >= 1){
const data = newPresence.activities[0].state;
let oldData = null;
if(oldPresence){
    if(oldPresence?.activities)
    if(oldPresence.activities.length >= 1){
    oldData = oldPresence.activities[0].state
    }
}
if(data !== null){
    if(data === oldData) return;
const args = data.split(" ");
for(let i = 0;i<args.length;i++){
   let testedInvite = args[i].replace(/[^a-z0-9\./:]/gi,'');
   let StockedInvite = client.guildInvites.get(newPresence.guild.id);
   if(StockedInvite){
    if(StockedInvite.size > 0){
StockedInvite.map(inv =>{
    if(testedInvite.includes(inv.code)){
      const guild = client.guilds.cache.get(inv.guild.id)
                if(guild){
                    const member = guild.members.cache.get(newPresence.userID);
                    if(member){

(async()=>{
 const [role] = await client.db.query(`SELECT * FROM support WHERE guildid = '${guild.id}'`);
        if(role.length < 1){
            return;
            }else{
                if(guild.roles.cache.get(role[0].role)){
                     if(member.roles.cache.has(role[0].role)){
                        return;
                    }else{
                        await member.roles.add(role[0].role)
                    }                    
                }else{
                        return;
                    }
                }
                    })();
                    }else{
                        return;
                    }
                }else{
                    return;
                }
        }else{
            const guild = client.guilds.cache.get(inv.guild.id)
                if(guild){
                    const member = guild.members.cache.get(newPresence.userID);
                    if(member){

(async()=>{
 const [role] = await client.db.query(`SELECT * FROM support WHERE guildid = '${guild.id}'`);
        if(role.length < 1){
            return;
            }else{
                if(guild.roles.cache.get(role[0].role)){
                     if(member.roles.cache.has(role[0].role)){
                        await member.roles.remove(role[0].role)
                    }else{
                       return; 
                    }                    
                }else{
                        return;
                    }
                }
                    })();
                    }else{
                        return;
                    }
                }else{
                    return;
                }
        }
   })
    }
}
        }
    }
}
         /*
       Les lignes ci-dessous seront logger
       */
};