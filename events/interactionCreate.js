'use strict';
module.exports = async(client,data) => {
 if(data.isMessageComponent()){
         if(data.isSelectMenu()){
             client.emit("menus",data)
        }else if(data.isButton()){
            client.emit('button',data)
        }
       }else if(data.isCommand()){
            client.emit('slashCommands',data)
        }
}