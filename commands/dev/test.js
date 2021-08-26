'use strict';

const Command = require("../../structure/Command.js");
const ytdl = require("ytdl-core");

class Test extends Command {
    constructor() {
        super({
            name: 'test',
            category: 'dev',
            description: 'A simple test commande',
            usage: 'test',
            example: 'test',
            perms: "owner",
        });
    }

    async run(client, message, args) {
    let EOR = client.functions.EOR;
    if(!args[1]) return message.channel.send("> Vous devez me fournir l'argument ytb ou file")
    if(args[1] ==="file"){
        if(!args[2]) return message.channel.send("> Vous devez me fournir le fichier que vous souhaitez voir pour que cela fonctionne")
    require("fs").readFile(args[2], (err,data) =>{
        if(err) return message.reply(`\`\`\`js\n${err.stack}\n\`\`\``);
        let file = String(data).split("\n");
        if(args[3] && args[3] && Number(args[3]) > 0 && Number(args[4]) > Number(args[3])){
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
    },embeds:[{description: "```" + args[2].split(".")[2] + "\n" + String(file.slice(Number(args[2]-1),Number(args[3])).join("\n")).substr(0,3900) + "\n```"}]})
        }else{
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
    },embeds:[{ description:"```" + args[2].split(".")[2] + "\n"+ String(data).substr(0,3900) + "\n```"}] })
        }
     })
    }else if(args[1] === "ytb"){
    if(!message.member.voice.channel) return message.channel.send({ embeds:[ EOR({ desc: "Vous devez rejoindre un salon vocal",error: "yes"},message)]})
    require("node-fetch")(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&maxResults=50&key=AIzaSyAgpPns8AwUjlXc63jXw7T4bQ9bRoCy7As&q=${encodeURIComponent(args.slice(2).join(" "))}`,{
        }).then(r =>r.json()).then(js =>{
            if(js.items.length < 1) return message.channel.send({ embeds: [EOR({ desc: "Aucune chanson n'as été trouvé pour ce titre",error: "yes"},message)]}) 
require("node-fetch")(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyAgpPns8AwUjlXc63jXw7T4bQ9bRoCy7As&maxResults=50&playlistId=${encodeURIComponent(js.items[0].id.playlistId)}`,{
        }).then(res =>res.json()).then(json =>{
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
    },embeds:[{ description:"```js\n"+ String(require("util").inspect(eval(json.items))).substr(0,3900) + "\n```"}] })
            })
        })
    }
    }
}

module.exports = new Test;