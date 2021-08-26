'use strict';
const Command = require("../../structure/Command.js");

class Config extends Command {
    constructor() {
        super({
            name: 'config',
            category: 'utils',
            description: 'Configuré vos options',
            usage: 'config <option> <value>',
            example: ['config pitch 5'],
        });
    }

    async run(client, message, args) {       
let EOR = client.functions.EOR;

 //Variable de config
 let rate, pitch, voicename, neural;
const [user] = await client.db.query(`SELECT * FROM userconfig WHERE userid = '${message.author.id}'`);
if(args[1] === "pitch"){
    if(!args[2]) return message.channel.send("> Vous devez donné l'argument <number> Compris entre -100 et 100")
    if(isNaN(args[2]) || ((Number(args[2]) < -100 ||  Number(args[2]) > 100))) return message.channel.send("> Vous devez mettre une value comprise entre -100 et 100")
    pitch = parseInt(Number(args[2]));

if(user.length < 1){
    await client.db.query(`INSERT INTO userconfig (userid,pitch) VALUES ('${message.author.id}','${pitch}')`)
}else{
     await client.db.query(`UPDATE userconfig SET pitch = "${pitch}" WHERE userid = '${message.author.id}'`)
    }
        message.channel.send("> Pitch modifié avec succés")

} else
if(args[1] === "rate"){
        if(!args[2]) return message.channel.send("> Vous devez donné l'argument <number> Compris entre -100 et 100")
        if(isNaN(args[2]) || ((Number(args[2]) < -100 ||  Number(args[2]) > 100))) return message.channel.send("> Vous devez mettre une value comprise entre -100 et 100")
    rate = parseInt(Number(args[2]));
    if(user.length < 1){
    await client.db.query(`INSERT INTO userconfig (userid,rate) VALUES ('${message.author.id}','${rate}')`)
}else{
     await client.db.query(`UPDATE userconfig SET rate = "${rate}" WHERE userid = '${message.author.id}'`)
    }
    message.channel.send("> Rate modifié avec succés")
}
else
if(args[1] === "voicename"){
    message.reply({
  allowedMentions : {
        repliedUser: false
   },
  components:[{
    type: "ACTION_ROW",
        components: [{
            type: "SELECT_MENU",
            customId: "select_voicename-"+ message.author.id,
            placeholder: "Choissisez une voix",
            options: [{
                label: "Français",
                emoji: "🇫🇷",
                value: "fr-FR-DeniseNeural",
                description:"Voix de femme"
            },
            {
                label: "Français",
                emoji: "🇫🇷",
                value: "fr-FR-HenriNeural",
                description:"Voix d'homme"
            },
            {
                label: "Deutsch",
                emoji: "🇩🇪",
                value: "de-DE-KatjaNeural",
                description:"Frauenstimme"
            },
            {
                label: "Deutsch",
                emoji:"🇩🇪",
                value: "de-DE-ConradNeural",
                description:"Männerstimme"
            },
            {
                label: "English",
                emoji: "🇬🇧",
                value: "en-GB-MiaNeural",
                description:"Woman's voice"
            },
            {
                label: "English",
                emoji: "🇬🇧",
                value: "en-GB-RyanNeural",
                description:"Man's voice"
            },
            {
                label: "日本語",
                emoji: "🇯🇵",
                value: "ja-JP-NanamiNeural",
                description:"女性の声"
            },
            {
                label: "日本語",
                emoji: "🇯🇵",
                value: "ja-JP-KeitaNeural",
                description:"男性の声"
            },
            {
                label: "한국어",
                emoji: "🇰🇷",
                value: "ko-KR-SunHiNeural",
                description:"여자의 목소리"
            },
            {
                label: "한국어",
                emoji: "🇰🇷",
                value: "ko-KR-InJoonNeural",
                description:"남자의 목소리"
            },
            {
                label: "Русский",
                emoji: "🇷🇺",
                value: "ru-RU-SvetlanaNeural",
                description:"Женский голос"
            },
            {
                label: "Русский",
                emoji: "🇷🇺",
                value: "ru-RU-DmitryNeural",
                description:"Мужской голос"
            },
            ]           
        }]
    },{
    type: "ACTION_ROW",
    components:[{
      type:"BUTTON",
      customId: "_no",
      disabled: true,
      label: "ㅤ",
      style: "SECONDARY"
    },{
      type:"BUTTON",
      customId: "_no",
      disabled: true,
      label: "ㅤ",
      style: "SECONDARY"
    },{
      type:"BUTTON",
      customId: "delete",
      emoji: "🗑️",
      style: "DANGER"
    },{
      type:"BUTTON",
      customId: "_no",
      disabled: true,
      label: "ㅤ",
      style: "SECONDARY"
    },{
      type:"BUTTON",
      customId: "_no",
      disabled: true,
      label: "ㅤ",
      style: "SECONDARY"
    }]
  }],
    embeds:[ EOR({title: "Selecteur de voix",desc: "Sélectionnez la voix qui parlera pour vous si dessous"},message)],
    })
    /*
           
*/
} else 
    return message.channel.send("L'option ne peut être que `voicename`,`pitch`,`rate`")
}
}

module.exports = new Config;