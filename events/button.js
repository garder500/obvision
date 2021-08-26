'use strict';

module.exports = async(client, button) => {
   let info = button.customId.split("-");
    let user = client.users.cache.get(info[1]);
    if(info[0] !== "delete" && info.length < 2){
        return;
    }

    const buttons = client.buttons.get(info[0]);   
    if (!buttons) {
        return ;
    }


    try {
        buttons.run(client, button,user)
    } catch (err) {
       client.emit('error',err);
    }
      /*
       Les lignes ci-dessous seront logger
       */   
};