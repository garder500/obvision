'use strict';
const Command = require("../../structure/Command.js");
const ytdl = require("ytdl-core");

class Play extends Command {
    constructor() {
        super({
            name: 'play',
            category: 'vocal',
            description: 'Joué de la musique en vocal',
            usage: 'play <Chanson>',
            example: ['play anamaguchi','play https://www.youtube.com/watch?v=Zpl_VaQnGO0'],
            botPerms: ['CONNECT',"SPEAK","USE_VAD"]
        });
    }

    async run(client, message, args) {       
    let EOR = client.functions.EOR;
 if(!message.member.voice.channel) return message.channel.send({ embeds:[ EOR({ desc: "Vous devez rejoindre un salon vocal",error: "yes"},message)]})
if(!args[1])  return message.channel.send({ embeds:[ EOR({ desc: "Vous devez écrire l'url Youtube, ou le titre de la musique/vidéo",error: "yes"},message)]})
     require("node-fetch")(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&key=AIzaSyAJZuyf3mZ4KzDVTmNfr-SGK498GcJxeMU&q=${encodeURIComponent(args.slice(1).join(" "))}`,{
        }).then(r =>r.json()).then(js =>{
            if(js.items.length < 1) return message.channel.send({ embeds: [EOR({ desc: "Aucune chanson n'as été trouvé pour ce titre",error: "yes"},message)]}) 
client.timeoutsVoc.guild.add(message.guild.id);
const trackAudio = ytdl("https://www.youtube.com/watch?v="+js.items[0].id.videoId, { filter: "audioonly", quality: "highestaudio"})
const chan = message.member.voice.channel;
 const connection = client.voc.joinVoiceChannel({
                        channelId: chan.id,
    guildId: chan.guild.id,
    adapterCreator: chan.guild.voiceAdapterCreator,
                    })
client.timeoutsVoc.guild.add(message.guild.id);
 const player = client.voc.createAudioPlayer();
setVoiceTrack(trackAudio);
ReplyWithCurrentTrack(js.items[0].id.videoId)
function setVoiceTrack(currentTrack){
    const resource = client.voc.createAudioResource(currentTrack, { inlineVolume: true });
    resource.volume.setVolume(1.5);
    player.play(resource);
}
connection.on(client.voc.VoiceConnectionStatus.Ready, () => {
    message.channel.send({ embeds:[EOR({desc:"Le bot est connecté"},message)]})
if(chan.type === "stage"){
    if(message.guild.me.permissions.has("ADMINISTRATOR") || message.member.voice.channel.manageable){
  message.guild.me.voice.setSuppressed(false);
  PlayTts();
  }else{
    connection.destroy();
    return message.channel.send({ embeds:[EOR({title:"Global Voice Error",desc:"Le bot n'as pas les permissions suffisante pour parlé dans le salon de stage, donné lui la permission `Administrateur` ou bien ajouté le rôle du bot en tant que modérateur de conférence pour qu'il puisse parler", error: "yes"},message)]})
  }
}else {
    PlayTts();
}
function PlayTts(){
connection.subscribe(player);
player.on("playing",() =>{
    client.timeoutsVoc.cmd.add(`play-${message.guild.id}`)
    message.channel.send({ embeds: [EOR({ desc: "La musique est en train de joué"},message)]})
})
player.on('idle', () => {
   message.channel.send({ embeds: [EOR({ desc: "Musique terminé"},message)]}) 
client.timeoutsVoc.cmd.delete(`play-${message.guild.id}`)
      
  player.stop();
  connection.destroy()
  if(client.timeoutsVoc.guild.has(message.guild.id)) client.timeoutsVoc.guild.delete(message.guild.id);
    if(client.timeoutsVoc.cmd.has(`tts-${message.guild.id}`)) client.timeoutsVoc.cmd.delete(`tts-${message.guild.id}`)
    if(client.timeoutsVoc.cmd.has(`play-${message.guild.id}`)) client.timeoutsVoc.cmd.delete(`play-${message.guild.id}`)
  //Song stopped  
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
function ReplyWithCurrentTrack(id){
require("node-fetch")(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${encodeURIComponent(id)}&key=AIzaSyAJZuyf3mZ4KzDVTmNfr-SGK498GcJxeMU`,{
        }).then(r =>r.json()).then(async(js) =>{
let track = js.items[0].snippet;
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
    },embeds:[{
    color: "#FF0000",
    title: track.title,
    url: "https://www.youtube.com/watch?v="+track.id,
    author: {
        name: track.channelTitle,
    },
    description: track.description.substr(0,3900),
    image: {
        url: track.thumbnails.high.url,
    },
    timestamp: new Date(track.publishedAt),
}] })
})
}
 })
}
}

module.exports = new Play;