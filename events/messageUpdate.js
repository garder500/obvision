'use strict';

module.exports = (client, oldMessage, newMessage) => {
    if (!newMessage.channel.guild) {
        return ;
    }
 

 	const data = newMessage.content;
    newMessage.guild.prefix = client.prefix;
    const args = data.slice(newMessage.guild.prefix.length).trim().split(/ +/g);

 client.channels.cache.get(newMessage.channel.id).messages.fetch({
	    	limit: 10,
	    	after: newMessage.id
	    }).then(msg =>{
	    	msg.map(m=>{
	    		if(m.reference){
	    			if(m.reference.messageId === newMessage.id){
	    				if(m.author.id === client.user.id){
	    					m.delete();
if (!data.startsWith(newMessage.guild.prefix)) {
        return;
    }

    const command = client.commands.find(cmd => cmd.aliases.includes(args[0])) || client.commands.get(args[0]);
    if (!command) {
        return ;
    }
    if(command.botNotAllowed && newMessage.author.bot) {
        return;
    }
    if(command.perms === "owner") {
        if(!client.config.owners.includes(newMessage.author.id)) {
            return newMessage.channel.send('You don\'t have required permission to use that command!');
        }
    }
     else if(command.perms !== 'everyone') {
        if(!newMessage.member.permission.has(command.perms)) {
            return newMessage.channel.send('You don\'t have required permission to use that command!');
        }
    }
     if(command.botPerms !== []) {
         for(botPerm of command.botPerms) {
             if(!newMessage.guild.members.cache.get(client.user.id).hasPermission(botPerm)) {
                 let perms = []
                 for(perm of command.botPerms) {
                    perms.push(`\`${perm}\``);
                 }
                 return newMessage.channel.send(`I don\'t have required permission to execute that command!\nMissing Permission: ${perms.join("\n")}`);
             }
         }
     }

    try {
        command.run(client, newMessage, args)
    } catch (err) {
       client.emit('error',err);
    }
	    				}
	    			}
	    		}
	    	})
	    })
	    
     /*
       Les lignes ci-dessous seront logger
       */  
};