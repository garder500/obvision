'use strict';

const Command = require("../../structure/Command.js");

class Leave extends Command {
    constructor() {
        super({
            name: 'leave',
            category: 'vocal',
            description: 'Fait quitté le bot du salon courant',
            usage: 'leave',
            example: ['leave','stop'],
            aliases: ['stop']
        });
    }

    async run(client, message) {
        let EOR = client.functions.EOR;
        function leave(){
            const connection = client.voc.getVoiceConnection(message.guild.id)
            if(connection){
            connection.destroy();
            if( client.timeoutsVoc.guild.has(message.guild.id)){
                client.timeoutsVoc.guild.delete(message.guild.id);
                if(client.timeoutsVoc.cmd.has(`tts-${message.guild.id}`)) client.timeoutsVoc.cmd.delete(`tts-${message.guild.id}`)
                if(client.timeoutsVoc.cmd.has(`play-${message.guild.id}`)) client.timeoutsVoc.cmd.delete(`play-${message.guild.id}`)
                if(client.timeoutsVoc.cmd.has(`record-${message.guild.id}`)) client.timeoutsVoc.cmd.delete(`record-${message.guild.id}`)
                if(client.timeoutsVoc.cmd.has(`vocmod-${message.guild.id}`)) client.timeoutsVoc.cmd.delete(`vocmod-${message.guild.id}`)
            }
            message.channel.send({ embeds: [EOR({ desc:"J'ai correctement quitté le vocal", error:"no" },message)]})
            }else{
                return message.channel.send({ embeds: [EOR({ desc:"Je ne suis connecté à aucun salons vocal", error:"yes" },message)]})
            }
        }
      if(message.member.voice.channel){
        try{
                leave();
        }catch(e){
            message.channel.send("Je ne suis pas dans ce channel vocal ou je ne suis pas connecté à un channel vocal")
        }
      }else{
        return message.channel.send("Vous devez être dans un channel vocal pour que je puisse le quitté")
      }
    }
}

module.exports = new Leave;