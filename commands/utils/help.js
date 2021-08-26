'use strict';

const Command = require("../../structure/Command.js");

class Help extends Command {
    constructor() {
        super({
            name: 'help',
            category: 'utils',
            description: 'Y a un truc',
            usage: 'help [commande]',
            example: ['help', 'help ping'],
            aliases: ['h', 'aide']
        });
    }

    async run(client, message, args) {
        if (!args[1]) {
let cat= [];
client.commands.map((c)=> {
if(c.category !== "dev"){
    if(!cat.includes(c.category)){
    cat.push(c.category)
    }
}
})

let category = [];
cat.map(cate => category.push({
                            name: `❱ ${cate}`,
                            value: client.commands.filter((command) => command.category === cate).map((command) => `\`${command.name}\``).join(' • '),
                            inline: false,
                        })
)
            await message.reply({
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
                    color: client.colors.default,
                    title: `Commandes de ${client.user.username}`,
                    thumbnail: {
                        url: 'https://i.ibb.co/8KYCKJd/info.png'
                    },
                    description: `Faite ${message.guild.prefix}help [Nom commande] pour plus d'informations!`,
                    fields: category,
                    footer: {
                        text: client.footer
                    },

                }]
            })
        } else if (args[1]) {
            const command = client.commands.find(cmd => cmd.aliases.includes(args[1])) || client.commands.get(args[1]);
            if (!command) return message.channel.send(`Cette commande est invalide`);
            const fr = client.langs.fr.help[command.name]
            let send = "";
        if(fr){
            if(command.description) command.description = fr.desc;
            if(command.example) command.example = fr.example;
            if(command.usage) command.usage = fr.usage;
        }
            command.example.forEach(use => {
                send += message.guild.prefix + use + '\n'
            })
            await message.reply({
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
                    color: client.colors.default,
                    author: {
                        name: `Help : Commande ` + args[1],
                        icon_url: message.author.displayAvatarURL()
                    },
                    description: ` <> sont des arguments requis\nEt [] sont des arguments optionnels`,
                    footer: {
                        icon_url: client.user.displayAvatarURL(),
                        text: client.user.username
                    },
                    fields: [
                        {
                            name: "Description",
                            value: !command.description ? 'Pas de description' : command.description,
                        },
                        {
                            name: "Utilisation",
                            value: !command.usage ? "Pas d'utilisation" : message.guild.prefix + command.usage,
                        },
                        {
                            name: "Exemples",
                            value: !command.example ? `Pas d'exemple` : send,
                        },
                        {
                            name: "Aliases",
                            value: command.aliases.length < 1 ? `Pas d'alias` : command.aliases.join(", "),
                        },
                        {
                            name: "Permissions requises",
                            value: command.perms === "everyone" ? `Aucune permissions requises` : command.perms,
                        },{
                            name: "Permissions requises au bot",
                            value: command.botPerms.length < 1 ? `Aucune permissions requises` : command.botPerms.join(" • ")
                        }]
                }]
            })
        }
    }
}

module.exports = new Help;