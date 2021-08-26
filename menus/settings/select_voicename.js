'use strict';

const Menu = require("../../structure/Menu.js");

class Select_voicename extends Menu {
    constructor() {
        super({
            name: 'select_voicename',
        });
    }

    async run(client, button, user) {
    let userID = user.id;
 if(button.member.user.id === userID){
        let voicename = button.values[0];
        const [user] = await client.db.query(`SELECT * FROM userconfig WHERE userid = '${userID}'`);
       if(user.length < 1){
    await client.db.query(`INSERT INTO userconfig (userid,voicename) VALUES ('${userID}','${voicename}')`)
}else{
     await client.db.query(`UPDATE userconfig SET voicename = "${voicename}" WHERE userid = '${userID}'`)
    }
client.api.interactions(button.id, button.token).callback.post({data: {
    type: 4,
    data:{
        flags: 64,
        content: "Voix modifié avec succés"
    }  
}})
       }else{
        client.api.interactions(button.id, button.token).callback.post({data: {
    type: 4,
    data:{
        flags: 64,
        content: "Vous n'avez pas envoyé cette commande"
    }  
}})
       }    }
}

module.exports = new Select_voicename;