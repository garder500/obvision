'use strict';

const Command = require("../../structure/Command.js");

class Suggest extends Command {
    constructor() {
        super({
            name: 'suggest',
            category: 'Suggestion',
            description: 'Vous permez de réagir à une suggestion en la refusant ou l\'acceptant en ajoutant un commentaire',
            usage: 'suggest <accept | reject> <Message ID> [commentaire]',
            example: ['suggest accept 859912153241878529','suggest reject 859912153241878529 Suggestion inutile'],
            aliases: ['sugg']
        });
    }

    async run(client, message, args) {
   let EOR = client.functions.EOR;
        if(message.member.permissions.has("MANAGE_MESSAGES")){
        if(!args[1]) return message.channel.send({ embeds: [EOR({ desc: "> Vous devez spécifier l'action reject ou accept\nExemple : `&suggest accept 859912153241878529`", error: "yes"},message)] })
        if(!["accept","reject"].includes(args[1])) return message.channel.send({ embeds: [EOR({ desc: "> Vous devez spécifier l'action `reject` ou `accept` UNIQUEMENT\nExemple : `&suggest accept 859912153241878529`", error: "yes"},message)] })
        if(!args[2]) return message.channel.send({ embeds: [EOR({ desc: "> Vous devez spécifier l'action `reject` ou `accept` UNIQUEMENT\nExemple : `&suggest accept 859912153241878529`", error: "yes"},message)] })
    const [suggestChannel] = await client.db.query(`SELECT * FROM suggestion WHERE guildid = '${message.guild.id}'`);
        if(suggestChannel.length < 1) return message.channel.send({ embeds: [EOR({ desc: "> Vous n'avez pas défini de salon de suggestions", error: "yes"},message)] })  
        client.guilds.cache.get(message.guild.id).channels.cache.get(suggestChannel[0].channelid).messages.fetch(args[2]).then((msg)=>{
        if(msg.author.id !== client.user.id) return message.channel.send({ embeds: [EOR({ desc: "> Ce n'est pas un message du robot", error: "yes"},message)] })
        let reason = args.slice(3).join(" ");
        if (!reason) reason = "Pas de commentaire spécifié.";
        let status = args[1] === "accept" ? "Suggestion accepté" : "Suggestion refusé";
        let color = args[1] === "accept" ? "0x008000" : "0xf00020";        
            let embed = msg.embeds[0];
            embed.color = color;
            embed.fields[0] = {
                name: `➔ Statut de la suggestion `,
                value: status,
            }
            if (!embed.fields[1]) {
                embed.fields.push({
                    name: `➔ Commentaire`,
                    value: reason,
                })
            } else {
                embed.fields[1] = {
                    name: `➔ Commentaire`,
                    value: reason,
                }
            }
                msg.edit({ embeds: [embed] })
                message.channel.send({ embeds: [EOR({ desc: "Réponse à la suggestion : \n[Lien vers la suggestion](" + msg.url + ")", error: "no"},message)] })
    }).catch((e) =>{
            return message.channel.send({ embeds: [EOR({ desc: "> Cette suggestion n'existe pas", error: "yes"},message)] })
          })
    }else return message.channel.send({ embeds: [EOR({ desc: "> Vous n'avez pas la permission néscessaire pour effectué cette action", error: "yes"},message)] })
    }
}

module.exports = new Suggest;