'use strict';
const Command = require("../../structure/Command.js");
const ytdl = require("ytdl-core");
const scrapper = require("youtube-scrapper")
const { stream } = require('play-dl');

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
if(!args[1]) return message.channel.send({ embeds:[ EOR({ desc: "Vous devez écrire l'url Youtube, ou le titre de la musique/vidéo",error: "yes"},message)]})
if(client.timeoutsVoc.guild.has(message.guild.id)) return message.channel.send({ embeds:[ EOR({ desc: "Le bot est déja en train de joué, veuillez réitérer cette commande quand il aura fini",error: "yes"},message)]})
    // require("node-fetch")(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&key=AIzaSyAJZuyf3mZ4KzDVTmNfr-SGK498GcJxeMU&q=${encodeURIComponent(args.slice(1).join(" "))}`,{ }).then(r =>r.json())
 scrapper.search(args.slice(1).join(" ")).then(async(js) =>{
            if(js.videos.length < 1) return message.channel.send({ embeds: [EOR({ desc: "Aucune chanson n'as été trouvé pour ce titre",error: "yes"},message)]}) 
const info = await ytdl.getInfo("https://www.youtube.com/watch?v="+js.videos[0].id)

client.timeoutsVoc.guild.add(message.guild.id);
async function getAudioFromId(id){
   return stream("https://www.youtube.com/watch?v="+id)
}
const trackAudio = await getAudioFromId(js.videos[0].id)
const chan = message.member.voice.channel;
 const connection = client.voc.getVoiceConnection(message.guild.id) || client.voc.joinVoiceChannel({
                        channelId: chan.id,
    guildId: chan.guild.id,
    adapterCreator: chan.guild.voiceAdapterCreator,
                    })
client.timeoutsVoc.guild.add(message.guild.id);

 const player = client.voc.createAudioPlayer();
setVoiceTrack(trackAudio);
displayTrack(js.videos[0].id,info) 

function setVoiceTrack(currentTrack){
const resource = client.voc.createAudioResource(currentTrack.stream, { 
    inputType : currentTrack.type,
    inlineVolume: true });
    resource.volume.setVolume(1.5);
    player.play(resource);
}
connection.on(client.voc.VoiceConnectionStatus.Ready, () => {

    message.channel.send({ embeds:[EOR({desc:"Le bot est connecté"},message)]})
if(chan.type === "GUILD_STAGE_VOICE"){
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
if(!client.guildVoc.has(message.guild.id)){
    client.guildVoc.set(message.guild.id,{
        queue: new Map().set(js.videos[0].id,info),
        currentTrack:js.videos[0].id,
        autoplay:false
    })
    message.channel.send({ embeds: [EOR({ desc: "La musique est en train de joué"},message)]})
}else{
}
})
player.on("buffering",()=>{
   
})
player.on('idle', async() => {
   message.channel.send({ embeds: [EOR({ desc: "La musique est terminé"},message)]})    
client.timeoutsVoc.cmd.delete(`play-${message.guild.id}`)
  player.stop();
  if(client.guildVoc.has(message.guild.id)){
    const youtubePlayer = client.guildVoc.get(message.guild.id);
    if(youtubePlayer.autoplay){
        const trackId = youtubePlayer.queue.get(youtubePlayer.currentTrack).related_videos[0].id
        const trackInfo = await ytdl.getInfo("https://www.youtube.com/watch?v="+trackId)
        const audioTrack = await getAudioFromId(trackId)
        client.guildVoc.delete(message.guild.id)
        client.guildVoc.set(message.guild.id,{
        queue: new Map().set(trackId,trackInfo),
        currentTrack:trackId,
        autoplay:true
        })
        setVoiceTrack(audioTrack);
        displayTrack(trackId,trackInfo)
    }else{
        connection.destroy()
    }
  }
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
 function displayTrack(id,track){
let recommandations = track.related_videos
recommandations.forEach((m, e) => {
if(recommandations.filter(u => u.id === m.id).length > 1){
recommandations.splice(e,1)
    }
})
console.log(recommandations.length)
let playedAuto = false;
if(client.guildVoc.has(message.guild.id)){
    if(client.guildVoc.get(message.guild.id).autoplay){
        playedAuto = true
    }
}
message.reply({
failIfNotExists: false,
  components:[{
    type: "ACTION_ROW",
    components:[{
      type:"BUTTON",
      customId: "stop-"+ message.author.id+ "-"+id,
      emoji: "⏹️",
      style: "DANGER"
    },
    {
      type:"BUTTON",
      customId: "play_pause-"+ message.author.id,
      emoji: "⏸️",
      style: "SECONDARY"
    },
    {
      type:"BUTTON",
      customId: "autoplay-"+ message.author.id,
      label: "Auto-play",
      style: playedAuto ? "SUCCESS" : "SECONDARY"
    },{
      type:"BUTTON",
      customId: "nowplaying-"+ message.author.id,
      emoji: "⌛",
      style: "SECONDARY"
    }]
  },{
    type: "ACTION_ROW",
        components: [{
            type: "SELECT_MENU",
            customId: "play-"+ message.author.id,
            placeholder: "Jouer une autre chanson",
            options: recommandations.map(m =>{
                return {
                 value: m.id,
                 description: m.title.substr(0,99),
                 label: m.author.name.substr(0,99),
                 emoji: "➡️"
                }
            })
        }] 
    }],
  allowedMentions : {
        repliedUser: false
    },embeds:[{
    color: "#FF0000",
    title: track.videoDetails.title,
    url: "https://www.youtube.com/watch?v="+id,
    author: {
        url:track.videoDetails.ownerProfileUrl,
        name: track.videoDetails.ownerChannelName,
    },
    description: track.videoDetails.description?.substr(0,3000),
    fields:[{
          name: "Duration",
          value: track.videoDetails.lengthSeconds==="0" ? "Live" : client.functions.timetrade(Number(track.videoDetails.lengthSeconds*1000)),
          inline: true,
    },{
        name: "Like/Dislike",
        value: `👍 ${isNaN(track.videoDetails.likes) ? "0" : client.functions.convert(track.videoDetails.likes)}/👎 ${isNaN(track.videoDetails.dislikes) ? "0" : client.functions.convert(track.videoDetails.dislikes)}`,
        inline: true,  
    }],
    image: {
        url: track.videoDetails.thumbnails[track.videoDetails.thumbnails.length-1].url,
    },
    timestamp: new Date(track.videoDetails.publishDate),
}]
})

}
 })
}
}

module.exports = new Play;