'use strict';

const Command = require("../../structure/Command.js");
const Discord = require('discord.js');
const beautify = require("beautify");

class Eval extends Command {
    constructor() {
        super({
            name: 'eval',
            category: 'dev',
            description: 'Cette commande permet d\'évaluer un code',
            usage: 'ping',
            example: ['eval message.channel.send("hey")'],
            aliases: ['e'],
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
  allowedMentions : {
                            repliedUser: false
                        },
  components:[{
    type: "ACTION_ROW",
    components:[{
      type:"BUTTON",
      customId: "delete",
      emoji: "🗑️",
      style: "DANGER"
    }]
  }],
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
               
try {
(async() =>{
let evaluer = await eval(code);
let evaled = evaluer
 evaled = require("util").inspect(evaled);
let result, embeds = [];
    embeds.push({
        title: "✅ Réponse :",
        color: 0x20d166,
        timestamp: new Date(),
        description: `\`\`\`js\n${evaled.substr(0,3950)}\n\`\`\``,
        footer: {
            text: client.user.username,
            icon_url: client.user.displayAvatarURL()
        }
    })
result = evaled.length
if(code.length > 1000){
  code = code.substr(0,990) + "..."
}
let finalFooter = [{
          name: "Longueur de l'evaluation:",
          value: `Résulat : ${result}`,
          inline: false,
            },
        {
          name:"Type :" ,
          value: `${typeof(evaluer)}`, 
          inline: false,
        }
        ];
embeds[0].title = "✅ Réponse :"

   embeds[embeds.length - 1].fields = finalFooter;
embeds[embeds.length - 1].footer = {
            text: client.user.username,
            icon_url: client.user.displayAvatarURL()
        }
        
message.reply({
    failIfNotExists: false,
  allowedMentions : {
                            repliedUser: false
                        },
  components:[{
    type: "ACTION_ROW",
    components:[{
      type:"BUTTON",
      customId: "delete",
      emoji: "🗑️",
      style: "DANGER"
    }]
  }],
         embeds: embeds
})
})();
} catch (e) {


message.reply({
    failIfNotExists: false,
  allowedMentions : {
                            repliedUser: false
                        },
  components:[{
    type: "ACTION_ROW",
    components:[{
      type:"BUTTON",
      customId: "delete",
      emoji: "🗑️",
      style: "DANGER"
    }]
  }],
         embeds: [{
        title: "<a:error:773202660211163166> Erreur",
        color: 0xe71619,
        timestamp: new Date(),
        description: `\`\`\`js\n${e.stack.substr(0,1900)}\`\`\``,
        footer: {
            text: client.user.username,
            icon_url: client.user.displayAvatarURL()
        }
    }]
})

    }
}
}
module.exports = new Eval;