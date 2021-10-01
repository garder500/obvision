'use strict';

const Command = require("../../structure/Command.js");

class Clear extends Command {
    constructor() {
        super({
            name: 'clear',
            category: 'mod',
            description: 'Supprimé autant de message que vous le voulez dans un salon',
            usage: 'clear <Nombre de message> [ID|@user|displayName|Name]',
            example: ['clear 150', 'clear 150 @garder500#8260'],
            aliases: ['delete'],
            botPerms: ["MANAGE_MESSAGES"],
            perms: "MANAGE_MESSAGES"
        });
    }

    async run(client, message, args) {
    if(!args[1]) return message.reply({
        failIfNotExists: false,
  components:[{
    type: "ACTION_ROW",
    components:[{
      type:"BUTTON",
      customID: "delete",
      emoji: "🗑️",
      style: "DANGER"
    }]
  }],
  allowedMentions : {
    repliedUser: false
  },content : "> Vous devez précisé le nombre de message à supprimé" })
        if(!isNaN(args[1])){
            if(Number(args[1]) < 1) return message.reply({
  components:[{
    type: "ACTION_ROW",
    components:[{
      type:"BUTTON",
      customID: "delete",
      emoji: "🗑️",
      style: "DANGER"
    }]
  }],
  allowedMentions : {
    repliedUser: false
  },content : "> Vous ne pouvez pas supprimé moins d'1 message" })
        let sup = Number(args[1]), del = 0, allMessageFetched = false, reste = Number(args[1]), total = 0, lastmsgid= message.id, second = Date.now(), deleter = 0, secondtotal = 0;
        function deleteMsg(max, before, author){
                            if(max === 0) return;
                let dateTime = new Date().getTime(), messages = [];
             message.channel.messages.fetch({
            limit: max,
            before: before
            }).then(msgs =>{
                if(msgs.length < max) allMessageFetched = true;
             lastmsgid = msgs.last().id;
                msgs.map(m =>{ 
                               if(sup === total) return;
            if(author === m.author.id){
                if(m.createdTimestamp >= (dateTime-1209600000)){
                     total++;  
                        messages.push(m);
                    }else{
                         total++; 
                        m.delete().then(()=>{

                            }).catch(e =>{

                            });  
                         }
                            
                    }  
       if(msgs.size < max && sup !== total) allMessageFetched = true;
                })        
                }).catch(()=>{})
        setTimeout(()=>{
                      message.channel.bulkDelete(messages,true)
        },500)
        }
        function deleteMsg2(max, before){
        let dateTime = new Date().getTime(), messages = [];
       message.channel.messages.fetch({
            limit: max,
            before: before
            }).then(msgs =>{ 
                lastmsgid = msgs.last().id;
                msgs.map(m =>{
                    reste--;
                if(sup === total) return;
                  if(m.createdTimestamp >= (dateTime-1209600000)){
                        total++;
                        messages.push(m);
                    }else{
                        total++;
                        m.delete().then(()=>{
                            }).catch(e =>{
                            });  
                         }
            if(msgs.size < max && sup !== total) allMessageFetched = true;
                })
            }).catch(()=>{}) 
                setTimeout(()=>{
                      message.channel.bulkDelete(messages, true)
        },500)
        }

           
          await message.channel.send(`Message en cours de suppression:  \`${sup}\``).then(msg => {
            message.delete().then(()=>{}).catch(()=>{}) ;
  
            secondtotal = Math.ceil(sup/1);
           if(args[2]){
            if(reste >= 10){
                del = 100;
            }else{
                del = 100;
            }
            let userID = message.guild.members.cache.find(u => u.id === args[2] || u.user.username.toLowerCase().includes(args.slice(2).join(" ").toLowerCase()) || u.displayName.toLowerCase().includes(args.slice(2).join(" ").toLowerCase())) || message.mentions.members.first()
            if(userID.id){
                deleteMsg(del, lastmsgid,userID.id)
            }else{
                deleteMsg2(del, lastmsgid)
            }
        }else{  
        if(reste >= 100){
                del = 100;
            }else{
                del = reste;
            }
                deleteMsg2(del, lastmsgid)
            }
    setTimeout(()=>{
        if(sup === total){
                msg.delete().then(()=>{
                   message.channel.send(`Message totaux supprimés \`${total}\`\n Supprimé en \`${Number(((Date.now()-second)-500)/1000).toFixed(2)}\` secondes`).then(deleteIt => setTimeout(() =>{ deleteIt.delete() },5000))
                }).catch(()=>{
                 message.channel.send(`Message totaux supprimés \`${total}\`\n Supprimé en \`${Number(((Date.now()-second)-500)/1000).toFixed(2)}\` secondes`).then(deleteIt => setTimeout(() =>{ deleteIt.delete() },5000))
                }) ;
                
        }

        if(sup !== total){
          let interval = setInterval(()=>{
        if(args[2]){
            if(reste >= 10){
                del = 100;
            }else{
                del = 100;
            }
            let userID = message.guild.members.cache.find(u => u.id === args[2] || u.user.username.toLowerCase().includes(args.slice(2).join(" ").toLowerCase()) || u.displayName.toLowerCase().includes(args.slice(2).join(" ").toLowerCase())) || message.mentions.members.first()
            if(userID.id){
                deleteMsg(del, lastmsgid,userID.id)
            }else{
                deleteMsg2(del, lastmsgid)
            }
        }else{  
        if(reste >= 100){
                del = 100;
            }else{
                del = reste;
            }
                deleteMsg2(del, lastmsgid)
            }
            if(sup === total || allMessageFetched){
                setTimeout(()=>{
                msg.delete().then(()=>{
                   message.channel.send(`Message totaux supprimés \`${total}\`\n Supprimé en \`${Number(((Date.now()-second)-500)/1000).toFixed(2)}\` secondes`).then(deleteIt => deleteIt.delete({ timeout: 5000}))
                }).catch(()=>{
                 message.channel.send(`Message totaux supprimés \`${total}\`\n Supprimé en \`${Number(((Date.now()-second)-500)/1000).toFixed(2)}\` secondes`).then(deleteIt => deleteIt.delete({ timeout: 5000}))  
                }) ;
                },500)
                   clearInterval(interval);  
                }
            },1000);  
        }
        },500)  
        });   
        }      
    }
}

module.exports = new Clear;