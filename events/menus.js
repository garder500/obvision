'use_strict'
module.exports = async(client, button) => {
	let info = button.customId.split("-");
    let user = client.users.cache.get(info[1]);
 	const menu = client.menus.get(info[0]);    
    if (!menu) {
        return ;
    }
	try {
        menu.run(client, button,user)
    } catch (err) {
       client.emit('error',err);
    }
};