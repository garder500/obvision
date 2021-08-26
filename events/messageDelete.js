'use strict';

module.exports = (client, message) => {
	    if (!message.channel.guild) {
        return ;
    }



	       client.channels.cache.get(message.channel.id).messages.fetch({
	    	limit: 10,
	    	after: message.id
	    }).then(msg =>{
	    	msg.map(m=>{
	    		if(m.reference){
	    			if(m.reference.messageID === message.id){
	    				if(m.author.id === client.user.id){
	    					m.delete();
	    				}
	    			}
	    		}
	    	})
	    })
         /*
       Les lignes ci-dessous seront logger
       */
};