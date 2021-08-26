'use strict';

const Command = require("../../structure/Command.js");

class setting extends Command {
    constructor() {
        super({
            name: 'setting',
            category: 'Configuration',
            description: 'Vous permez de configuré le bot',
            usage: 'setting',
            example: ['setting'],
            perms: 'ADMINISTRATOR',
            aliases: ["settings"]
            });
    }

    async run(client, message) {

        let EOR = client.functions.EOR,delete_button = {
    type: "ACTION_ROW",
    components:[{
      type:"BUTTON",
      customId: "delete",
      emoji: "🗑️",
      style: "DANGER"
    },{
      type:"BUTTON",
      customId: "setting_home",
      emoji: "🏠",
      style: "PRIMARY"
    }]
};
let default_message = {
  allowedMentions : {
        repliedUser: false
   },
   failIfNotExists: false,
  components:[{
    type: "ACTION_ROW",
        components: [{
            type: "SELECT_MENU",
            customId: "config_admin_settings",
            placeholder: "Choissisez une catégorie",
            options: [{
                label: "Suggestion",
                value: "suggestion",
                description:"Configuration du systeme de suggestions"
            },
            {
                label: "Soutien",
                value: "support_inv",
                description:"Système auto-role avec invite dans le status"
            },
            {
                label: "Prefix",
                value: "prefix",
                description:"Vous permet de modifié le prefix"
            }
            ]           
        }]
    },delete_button],
    embeds:[ EOR({title: "Sélécteur de catégorie",desc: "Selectionné une catégorie"},message)],
    }
message.reply(default_message).then(async(msg)=>{
    const filter = (interaction) => interaction.user.id === message.author.id && interaction.message.id === msg.id;
const collector = await message.channel.createMessageComponentCollector({filter, time:require("ms")("1h") });
collector.on('collect', i => {
    if(i.customId === "config_admin_settings"){
        if(i.values[0] === "suggestion"){
       i.update({
    components:[{
    type: "ACTION_ROW",
        components: [{
            type: "SELECT_MENU",
            customId: "config_suggestion",
            placeholder: "Que souhaitez vous modifié ?",
            options: [{
                label: "Channel",
                value: "channel_sugg",
                description:"Le salon ou vont les suggestions"
            },
            {
                label: "Embed",
                value: "embed_sugg",
                description:"Modifié l'embed créer par le bot"
            },
            {
                label: "Supprime",
                value: "del_sugg",
                description:"Supprimé le channel"
            },
            ]           
        }]
    },delete_button],
    embeds:[ EOR({title: "Suggestion Config",desc: "Choissisez ce que vous souhaitez modifié sur le channel de suggestions"},message)],
   })
   }else if(i.values[0] === "prefix"){
        i.reply({ content: `Cette feature n'est pas encore disponible !`,ephemeral: true})
    }else if(i.values[0] === "support_inv"){
        i.update({
    components:[{
    type: "ACTION_ROW",
        components: [{
            type: "SELECT_MENU",
            customId: "role_support_inv",
            placeholder: "Choissisez une catégorie",
            options:[{
                label: "Rôle",
                value: "support_role_inv",
                description:"Configuré quel rôle sera attribué aux membres"
            },
            {
                label: "Supprime",
                value: "del_support_inv",
                description:"Désactive le système"
            },]           
        }]
    },delete_button],
    embeds:[ EOR({title: "Config Soutien",desc: "Choissisez ce que vous souhaitez effectué sur la catégorie de Soutien\n Ce système va donné le rôle configuré lorsque l'un de vos membre met une invitation pour votre serveur !"},message)],
   })
    } 
    }else if(i.customId === "config_suggestion"){
        if(i.values[0] === "channel_sugg"){
            let channels_cat = message.guild.channels.cache.filter(m => m.type === "GUILD_CATEGORY").map(c => JSON.parse(JSON.stringify({
                label: c.name.substr(0,25),
                value: c.id,
            })))
            for(let i =0;i<channels_cat.length;i++){
               let count = client.channels.cache.filter(c => c.parentId === channels_cat[i].value && c.type=== "GUILD_TEXT")
                if(count.size < 1){
            delete channels_cat[i];
                }
            }
           let counter = message.guild.channels.cache.filter(m => m.parentId === null && m.type=== "GUILD_TEXT")
           if(counter.size > 0) channels_cat.push({
                label: "Non catégorisé",
                emoji: "📌",
                value: "null",
            })
            i.update({
    components:[{
    type: "ACTION_ROW",
        components: [{
            type: "SELECT_MENU",
            customId: "channel_sugg",
            placeholder: "Choissisez une catégorie",
            options: channels_cat           
        }]
    },delete_button],
    embeds:[ EOR({title: "Suggestion Config",desc: "Choissisez la catégorie ou ce trouve votre channel de suggestion"},message)],
   })
        }else if(i.values[0] === "embed_sugg"){
            i.reply({ content: `Cette feature n'est pas encore disponible !`,ephemeral: true})
        }else if(i.values[0] === "del_sugg"){
            (async()=>{
        const [guild] = await client.db.query(`SELECT * FROM suggestion WHERE guildid = '${message.guild.id}'`);
        if(guild.length < 1){
    await i.reply({ content: `Vous n'aviez aucun channel configuré, rien n'as été fait`, ephemeral:true})
            }else{
     await client.db.query(`DELETE FROM suggestion WHERE guildid = '${message.guild.id}'`).then(res => console.log(res)).catch(e => console.log(e))
     await i.reply({ content: `Le channel ${client.channels.cache.get(guild[0].channelid).name} qui était le channel de configuration à été supprimé du systeme avec succès`, ephemeral:true})
    }
})();
        }
    }else if(i.customId === "channel_sugg"){
        let channels_cat = message.guild.channels.cache.filter(m => m.parentId === i.values[0] && m.type === "GUILD_TEXT")
        if(i.values[0] === "null"){
            channels_cat= message.guild.channels.cache.filter(m => m.parentId === null && m.type === "GUILD_TEXT")
        }
        channels_cat = channels_cat.map(c =>JSON.parse(JSON.stringify({
                label: c.name.substr(0,25),
                value: c.id,
            })))
        let channels_list = [];
        if(channels_cat.length > 25){
              channels_list.push({
    type: "ACTION_ROW",
        components: [{
            type: "SELECT_MENU",
            customId: "channel_sugg_final",
            placeholder: "Choissisez un channel",
            options: channels_cat.slice(0,25)        
        }]
    })
     channels_list.push({
    type: "ACTION_ROW",
        components: [{
            type: "SELECT_MENU",
            customId: "channel_sugg_final",
            placeholder: "Choissisez un channel",
            options: channels_cat.slice(25,50)        
        }]
    })
              if(channels_cat.length > 75){
channels_list.push({
    type: "ACTION_ROW",
        components: [{
            type: "SELECT_MENU",
            customId: "channel_sugg_final",
            placeholder: "Choissisez un channel",
            options: channels_cat.slice(50,75)        
        }]
    })
channels_list.push({
    type: "ACTION_ROW",
        components: [{
            type: "SELECT_MENU",
            customId: "channel_sugg_final",
            placeholder: "Choissisez un channel",
            options: channels_cat.slice(75,100)        
        }]
    })  
              }else if(channels_cat.length > 50 && channels_cat.length <= 75){
                  channels_list.push({
    type: "ACTION_ROW",
        components: [{
            type: "SELECT_MENU",
            customId: "channel_sugg_final",
            placeholder: "Choissisez un channel",
            options: channels_cat.slice(50,75)        
        }]
    })
              }
          }else{
           channels_list = [{
    type: "ACTION_ROW",
        components: [{
            type: "SELECT_MENU",
            customId: "channel_sugg_final",
            placeholder: "Choissisez un channel",
            options: channels_cat           
        }]
    }] 
          }

            channels_list.push(delete_button);   
            i.update({
    components:channels_list,
    embeds:[ EOR({title: "Suggestion Config",desc: "Choissisez le channel ou les gens pourront y mettre leurs suggestions"},message)],
   })
    }else if(i.customId === "channel_sugg_final"){
        (async()=>{
        const [guild] = await client.db.query(`SELECT * FROM suggestion WHERE guildid = '${message.guild.id}'`);
        if(guild.length < 1){
    await client.db.query(`INSERT INTO suggestion (channelid,guildid) VALUES ('${i.values[0]}','${message.guild.id}')`).then(res => console.log(res)).catch(e => console.log(e))
            }else{
     await client.db.query(`UPDATE suggestion SET channelid = "${i.values[0]}" WHERE guildid = '${message.guild.id}'`).then(res => console.log(res)).catch(e => console.log(e))
    }
    await i.reply({ content: `Le channel ${client.channels.cache.get(i.values[0]).name} à bien été configuré comme channel de suggestion`, ephemeral:true})
})();
    }else if(i.customId === "role_support_inv"){
        if(i.values[0] === "support_role_inv"){
                  (async()=>{
        if(!message.guild.me.permissions.has("ADMINISTRATOR") || (!message.guild.me.permissions.has("MANAGE_GUILD") && !message.guild.me.permissions.has("MANAGE_ROLES"))) return i.reply({ embeds:[EOR({title:"Global Error", desc: "Le robot à besoin des permissions Administrateur où Gérer le serveur et Gérer les roles, autrement le système n'est pas possible", error: "yes"},message)], ephemeral: true})
        await i.update({
    components:[delete_button],
    embeds:[ EOR({title: "Config Soutien",desc: "Mentionné le rôle qui sera utilisé pour être auto attribué par le bot lorsqu'un membre met un lien d'invitation de votre serveur dans le status"},message)],
   });
        const [guild] = await client.db.query(`SELECT * FROM support WHERE guildid = '${message.guild.id}'`);
        const filterMessage = m => m.author.id === message.author.id;
// Errors: ['time'] treats ending because of the time limit as an error
let collectedMessage = await message.channel.awaitMessages({ filterMessage, max: 1, time: require("ms")("30m"), errors: ['time'] })
 if(!collectedMessage) return message.channel.send({ embeds:[EOR({title:"Global Error", desc: "Revenez au menu d'acceuil une erreur c'est produite", error: "yes"},message)]})
  if(collectedMessage.first().mentions.roles.size > 0){
    if(collectedMessage.first().mentions.roles.first().managed) return message.channel.send({ embeds:[EOR({title:"Global Error", desc: "Revenez au menu d'acceuil et recommencé, vous avez entré un rôle non attribuable", error: "yes"},message)]})
    let current_role = collectedMessage.first().mentions.roles.first().id;
     if(guild.length < 1){
    await client.db.query(`INSERT INTO support (role,guildid) VALUES ('${current_role}','${message.guild.id}')`).then(res => console.log(res)).catch(e => console.log(e))
            }else{
     await client.db.query(`UPDATE support SET role = "${current_role}" WHERE guildid = '${message.guild.id}'`).then(res => console.log(res)).catch(e => console.log(e))
    }
    message.channel.send({ embeds:[EOR({title:"Config Soutien",desc:`Le role ${collectedMessage.first().mentions.roles.first().name} à été configuré comme rôle d'InviteSupport`},message)]})
  }else return message.channel.send({ embeds:[EOR({title:"Global Error", desc: "Revenez au menu d'acceuil et recommencé, vous n'avez pas mentionné de rôle", error: "yes"},message)]})

})();
}else if(i.values[0] === "del_support_inv"){
     (async()=>{
        const [role] = await client.db.query(`SELECT * FROM support WHERE guildid = '${message.guild.id}'`);
        if(role.length < 1){
    await i.reply({ content: `Vous n'aviez aucun roles configuré, rien n'as été fait`, ephemeral:true})
            }else{
     await client.db.query(`DELETE FROM support WHERE guildid = '${message.guild.id}'`).then(res => console.log(res)).catch(e => console.log(e))
     await i.reply({ content: `Le role ${message.guild.roles.cache.get(role[0].role).name} qui était le role donné aux gens possédant l'invitation du serveur à été supprimé du système`, ephemeral:true})
    }
})();
}
    }else if(i.customId === "setting_home"){
        default_message.allowedMentions === "";
        i.update(default_message)
    }else return;
   
});
collector.on('end', collected => {
    return;
    });
});


    }
}

module.exports = new setting;