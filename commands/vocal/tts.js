'use strict';
const Command = require("../../structure/Command.js"),
    Discord = require("discord.js"),
    sdk = require("microsoft-cognitiveservices-speech-sdk"),
    readline = require("readline"),
    fs = require("fs");
  var subscriptionKey = "Your subscription Key";
  var serviceRegion = "francecentral"; // e.g., "westus"
  const waiter = new Set();
class Tts extends Command {
    constructor() {
        super({
            name: 'tts',
            category: 'vocal',
            description: 'Parlez avec le bot',
            usage: 'tts <mot>',
            example: ['tts salut c\'est moi'],
            botPerms: ['CONNECT',"SPEAK","USE_VAD"]
        });
    }

    async run(client, message, args) {       
let startTime = Date.now(), secondTime,fin , debut, play = false;

 //Variable de config
 let rate = 0, pitch = 0, voicename = "fr-FR-DeniseNeural"
const [user] = await client.db.query(`SELECT * FROM userconfig WHERE userid = '${message.author.id}'`);
if(user.length < 1){
    await client.db.query(`INSERT INTO userconfig (userid) VALUES ('${message.author.id}')`)
rate = 0, pitch = 0, voicename = "fr-FR-DeniseNeural"

}else{
    rate = user[0].rate, pitch = user[0].pitch, voicename = user[0].voicename;

}
          let finalFile = `./data/${message.author.id}-${Date.now()}.wav`
function synthesizeSpeech() {
  let speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(finalFile);
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    const firstphrase = args.slice(1).join(" ");
    const phrase = firstphrase.replace(/(\S+?(?:[\t ]+\S+)*?)([\t ]*)(?:\1\2?){2,}/gm,"$1$2")

    synthesizer.speakSsmlAsync(
        `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="fr-FR"><voice name="${voicename}"><prosody rate="${rate}%" pitch="${pitch}%">${phrase}</prosody></voice></speak>`,
        result => {
            synthesizer.close();
            if (result) {
                // return result as stream
                        play = true;
                        secondTime = Date.now();
                return fs.createReadStream(finalFile);
                    
            }
        },
        error => {
            console.log(error);
            synthesizer.close();
            return false;
        });
}


if(args[1]){
    if( args.slice(1).join(" ").length <= 170){
      if (message.member.voice.channel) {
fs.readFile("./server.json", (err, data) => {
  if (err) throw err;
let currentFile = JSON.parse(data);
let rateLimit = currentFile.rate_limit;
if((rateLimit+args.slice(1).join(" ").length) >= 500000) return message.channel.send("> La limite de carractère à été atteinte")
if (client.timeoutsVoc.guild.has(message.guild.id) && client.timeoutsVoc.cmd.has(`tts-${message.guild.id}`)) {
        message.channel.send("> Le bot doit d'abord quitté le salon ou il est avant de vous rejoindre ou faire cette action !");
    } else {
client.timeoutsVoc.guild.add(message.guild.id);
client.timeoutsVoc.cmd.add(`tts-${message.guild.id}`)
if(message.member.voice.channel.type === "stage"){
    if(message.guild.me.permissions.has("ADMINISTRATOR") || message.member.voice.channel.manageable){
            synthesizeSpeech();
  }else{
    return message.channel.send({ embeds:[client.functions.EOR({title:"Global Voice Error",desc:"Le bot n'as pas les permissions suffisante pour parlé dans le salon de stage, donné lui la permission `Administrateur` ou bien ajouté le rôle du bot en tant que modérateur de conférence pour qu'il puisse parler", error: "yes"},message)]})
  }
}else {
    synthesizeSpeech();
}
    rateLimit = rateLimit+(args.slice(1).join(" ").length*2);
    fs.writeFile("./server.json",JSON.stringify({
    rate_limit: rateLimit
}), (err) => {
  if (err) throw err;
})
let a = setInterval(async()=>{
    if(play){
const chan = message.member.voice.channel;
 const connection = client.voc.joinVoiceChannel({
                        channelId: chan.id,
    guildId: chan.guild.id,
    adapterCreator: chan.guild.voiceAdapterCreator,
                    })  
 const player = client.voc.createAudioPlayer();
const resource = client.voc.createAudioResource(client.voc.createReadStream(finalFile), { inlineVolume: true });
resource.volume.setVolume(1.5);
player.play(resource);
connection.on(client.voc.VoiceConnectionStatus.Ready, () => {

    message.channel.send({ embeds:[client.functions.EOR({desc:"Le bot est connecté"},message)]})
if(chan.type === "stage"){
    if(message.guild.me.permissions.has("ADMINISTRATOR") || message.member.voice.channel.manageable){
  message.guild.me.voice.setSuppressed(false);
  PlayTts();
  }else{
    connection.destroy();
    return message.channel.send({ embeds:[client.functions.EOR({title:"Global Voice Error",desc:"Le bot n'as pas les permissions suffisante pour parlé dans le salon de stage, donné lui la permission `Administrateur` ou bien ajouté le rôle du bot en tant que modérateur de conférence pour qu'il puisse parler", error: "yes"},message)]})
  }
}else {
    PlayTts();
}
function PlayTts(){
connection.subscribe(player);
player.on("playing",() =>{
    debut = Date.now();
})
player.on('idle', () => {
    fin = Date.now();
    let bottalk = Number((fin - debut)/1000).toFixed(2)
    if(isNaN(bottalk)) bottalk = "Le bot n'as pas parlé"
            
   message.channel.send({ embeds: [{
        description: `Le bot à parlé \`${bottalk}\` secondes\nVoix généré en \`${Number((secondTime - startTime)/1000 ).toFixed(2)}\` secondes\nCommande excécuté en \`${Number((Date.now() - startTime)/1000 ).toFixed(2)}\` secondes`
    }]}) 
client.timeoutsVoc.cmd.delete(`tts-${message.guild.id}`)
        fs.unlink(finalFile, (err) => {
  if (err) {
    console.error(err)
    return
  }
  player.stop();
  connection.destroy();
  //file removed
})    
});
}
});

// Always remember to handle errors appropriately!
connection.on(client.voc.VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
    try {
        await Promise.race([
            client.voc.entersState(connection, client.voc.VoiceConnectionStatus.Signalling, 5e3),
            client.voc.entersState(connection, client.voc.VoiceConnectionStatus.Connecting, 5e3),
        ]);
        // Seems to be reconnecting to a new channel - ignore disconnect
    } catch (error) {
        // Seems to be a real disconnect which SHOULDN'T be recovered from
        connection.destroy();
    }
});    
        clearInterval(a);
    }
},200) 
    } 
});
            }else return message.channel.send("> Rejoignez un salon vocal")
        }else return  message.channel.send("> Ecrivez moins de 170 charactères")
    }else return message.channel.send("> Ecrivez un message")
}
}

module.exports = new Tts;
