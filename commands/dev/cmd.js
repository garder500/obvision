'use strict';

const Command = require("../../structure/Command.js");
const Discord = require('discord.js');
const beautify = require("beautify");
const { exec } = require('child_process');

class Cmd extends Command {
    constructor() {
        super({
            name: 'cmd',
            category: 'dev',
            description: 'Cette commande permet d\'effectuer des commandes bash',
            usage: 'ping',
            example: ['eval message.channel.send("hey")'],
            perms: "owner"
            });
    }

  
    async run(client, message, args) {
      const garder = client.users.cache.get('243117191774470146')
      function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
     if(message.author.id !== garder.id) return message.reply({
    failIfNotExists: false,
  components:[{
    type: "ACTION_ROW",
    components:[{
      type:"BUTTON",
      customId: "delete",
      emoji: "🗑️",
      style: "DANGER"
    }]
  }],
  allowedMentions : {
    repliedUser: false
  },
         embeds: [{
             title: "<a:error:773202660211163166> Erreur",
             color: 0xe71619,
             timestamp: new Date(),
             description: `Seul \`${garder.tag}\` est autoriser a executer cette commande`,
             footer: {
                 text: client.user.username,
                 icon_url: client.user.displayAvatarURL()
             }
         }]
     })
      
if(!args[1]) return message.reply({
failIfNotExists: false,
  components:[{
    type: "ACTION_ROW",
    components:[{
      type:"BUTTON",
      customId: "delete",
      emoji: "🗑️",
      style: "DANGER"
    }]
  }],
  allowedMentions : {
    repliedUser: false
  },
  embeds: [{
      title: "<a:error:773202660211163166> Mauvaise utilisation",
      color: 0xf36636,
      timestamp: new Date(),
      description: "Veuillez indiquer un code a évaluer\n`$eval <code>`",
      footer: {
          text: client.user.username,
          icon_url: client.user.displayAvatarURL()
      }
  }]
})
let code = args.slice(1).join(" ");
try{    
exec(code, (error, stdout, stderr) => {
  if(code.length >= 1000){
  code = code.substr(0,990) + "..."
}
  if (error) {
message.reply({
  failIfNotExists: false,
  components:[{
    type: "ACTION_ROW",
    components:[{
      type:"BUTTON",
      customId: "delete",
      emoji: "🗑️",
      style: "DANGER"
    }]
  }],
  allowedMentions : {
    repliedUser: false
  },
    embeds: [{
        title: "<a:error:773202660211163166> Erreur",
        color: 0xe71619,
        timestamp: new Date(),
        description: `\`\`\`cmd\n${error}\`\`\``,
        footer: {
            text: client.user.username,
            icon_url: client.user.displayAvatarURL()
        }
    }]
})    
return;
  }
  let result = stdout
  if(result.length > 3900){
    result = result.substr(0,3900) + "...";
  }
    let result2 = stderr
  if(result2.length > 1000){
    result2 = result.substr(0,900) + "...";
  }

  message.reply({
    failIfNotExists: false,
  components:[{
    type: "ACTION_ROW",
    components:[{
      type:"BUTTON",
      customId: "delete",
      emoji: "🗑️",
      style: "DANGER"
    }]
  }],
  allowedMentions : {
    repliedUser: false
  },
    embeds: [{
        title: "<a:valid:773202778763427864> Réponse :",
        color: 0x20d166,
        timestamp: new Date(),
        description: `\`\`\`cmd\n${result}\n\`\`\``,
        fields: [{
          name: "Stderr :",
          value: `\`\`\`cmd\nStdout : ${result2}\n\`\`\``,
          inline: false,
        },
        {
          name:"Commande" ,
          value: `\`\`\`cmd\n${code}\`\`\``, 
          inline: false,
        }
        ],
        footer: {
            text: client.user.username,
            icon_url: client.user.displayAvatarURL()
        }
    }]
})
});      
}catch(e){
  message.reply({
    failIfNotExists: false,
  components:[{
    type: "ACTION_ROW",
    components:[{
      type:"BUTTON",
      customId: "delete",
      emoji: "🗑️",
      style: "DANGER"
    }]
  }],
  allowedMentions : {
    repliedUser: false
  },
    embed: [{
        title: "<a:error:773202660211163166> Erreur",
        color: 0xe71619,
        timestamp: new Date(),
        description: `\`\`\`js\n${e.stack}\`\`\``,
        footer: {
            text: client.user.username,
            icon_url: client.user.displayAvatarURL()
        }
    }]
})
} 
}
}
module.exports = new Cmd;