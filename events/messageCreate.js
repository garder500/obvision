'use strict';
const { Util } = require("discord.js"),
        fetch = require("node-fetch");

module.exports = async(client, message) => {
    if (!message.channel.guild) {
        return ;
    }
    const EOR = client.functions.EOR;
const [guildSuggest] = await client.db.query(`SELECT * FROM suggestion WHERE guildid = '${message.guild.id}'`);
if(guildSuggest.length >= 1){
    if(message.guild.id === guildSuggest[0].guildid){
        if(message.channel.id === guildSuggest[0].channelid){
            if(!message.author.bot){       
             message.delete();
            message.channel.send({ embeds:[{description: "> Envoie en cours" } ]}).then(async(msg) =>{
                   await msg.react("✅")
                   await msg.react("❌")
                   await msg.edit({
                    embeds:[{
                author: {
                    name: message.author.username + ' | ID : ' + message.author.id,
                    icon_url: message.author.avatarURL()
                },
                color: 0xff7f00,
                title: "📌 ➔ Une nouvelle suggestion est disponible !",
                description: message.content,
                fields: [{
                    name: `➔ Statut de la suggestion `,
                    value: "En attente :eyes:",
                }],
                timestamp: new Date(),
                footer: {
                    text: "ID du message : " + msg.id,
                    icon_url: client.user.avatarURL(),
                }
            }]
                })
                })
            }
        }
    }
}
    const data = message.content;
    message.guild.prefix = client.prefix;
    const args = data.slice(message.guild.prefix.length).trim().split(/ +/g);
    
    if (!data.startsWith(message.guild.prefix)) {
        return;
    }

    const command = client.commands.find(cmd => cmd.aliases.includes(args[0])) || client.commands.get(args[0]);
    if (!command) {
        return ;
    }
    if(command.botNotAllowed && message.author.bot) {
        return;
    }
    if(command.perms === "owner") {
        if(!client.config.owners.includes(message.author.id)) {
            return message.channel.send('You don\'t have required permission to use that command!');
        }
    }else if(command.perms === "CONFIGURED_ROLE"){
        return message.channel.send({ embeds: [EOR({title: "Global Error",desc: "Vous n'avez pas la permission requise configuré par l'un des administrateur"},message)] })
    }else
     if(command.perms !== 'everyone') {
        if(!message.member.permissions.has(command.perms)) {
            return message.channel.send('You don\'t have required permission to use that command!');
        }
    }
     if(command.botPerms !== []) {
      let perms = []
         for(let i = 0;i < command.botPerms.length; i++) {
             if(!message.guild.members.cache.get(client.user.id).permissions.has(command.botPerms[i])) {
                
                perms.push(`\`${command.botPerms[i]}\``);
             }
         }
         if(perms.length >= 1){
            return message.channel.send(`I don\'t have required permission to execute that command!\nMissing Permission: ${perms.join("\n")}`);
         }
     }

    try {
        command.run(client, message, args)
    } catch (err) {
       client.emit('error',err);
    }
};
