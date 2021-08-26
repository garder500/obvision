'use strict';
const {blue, green} = require('colors');
module.exports = async(client) => {

    console.log(`Logged in as ${blue(`${client.user.tag}`)}`);
    await client.user.setStatus("idle");
    await client.user.setActivity('Obvision is Starting...');
    console.log(`${green('[Bot]')} Playing: ${blue('Obvision is Starting...')}`);


    const activities = [`Obvision | &help`,'Obvision'];
    setInterval(async () => {
            await client.user.setActivity(activities[Math.floor(Math.random() * activities.length)]);
            }, 120000);
 client.guilds.cache.forEach(guild => {
    guild.invites.fetch().then(invites => client.guildInvites.set(guild.id, invites)).catch(err => console.log(err));
        });
     client.on("interactionCreate", async data => {
        if(data.isMessageComponent()){
         if(data.isSelectMenu()){
             client.emit("menus",data)
        }else if(data.isButton()){
            client.emit('button',data)
        }
       }else if(data.isCommand()){
            client.emit('slashCommands',data)
        }
    })
     client.functions.EOR = function EOR(e,message){
            let embed = {
                 author: {
                    name: message.author.tag,
                    icon_url: message.author.avatarURL()
                },
                color: "#5e5afc",
                timestamp: new Date(),
                footer: {
                    text: "Global Bot",
                    icon_url: client.user.avatarURL(),
                }
            }
            if(e.error){
            if(e.error === "yes"){
               embed.color = "0xf00020"
            }else if(e.error === "no"){
                embed.color = "0x008000"

            }
        }
            if(e.fields) embed.fields = e.fields;
            if(e.title) embed.title = e.title
            if(e.desc) embed.description = e.desc;
            return embed;
        }
        
     client.functions.getLastDay = function getLastDay(year,month){
       return new Date(year, month, 0).getDate();
    };

client.functions.getDateFromTimestamp= function getDateFromTimestamp (timestamp) {
  let date = new Date(timestamp);
  return `${date.getFullYear()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${(`0${date.getDate()}`).slice(-2)}`;
}
   


};
