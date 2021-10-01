'use strict';

const Menu = require("../../structure/Menu.js");
const ytdl = require("ytdl-core");
const scrapper = require("youtube-scrapper")
const { stream } = require('play-dl');
class Select_voicename extends Menu {
    constructor() {
        super({
            name: 'play',
        });
    }

    async run(client, button, user) {
            let EOR = client.functions.EOR;
    let userID = user.id;
if(!button.member.voice.channel) return button.channel.send({ embeds:[ EOR({ desc: "Vous devez rejoindre un salon vocal",error: "yes"},button)]})
 if(button.member.user.id === userID){
        let VideoId = button.values[0];
const info = await ytdl.getInfo("https://www.youtube.com/watch?v="+VideoId)

client.timeoutsVoc.guild.add(button.guild.id);
async function getAudioFromId(id){
   return stream("https://www.youtube.com/watch?v="+id)
}
const trackAudio = await getAudioFromId(VideoId)
const chan = button.member.voice.channel;
 const connection = client.voc.getVoiceConnection(button.guild.id) || client.voc.joinVoiceChannel({
                        channelId: chan.id,
    guildId: chan.guild.id,
    adapterCreator: chan.guild.voiceAdapterCreator,
                    })
 let player;
 if(connection._state.subscription){
    player = connection._state.subscription.player
 }else{
    player = client.voc.createAudioPlayer();
}
client.timeoutsVoc.guild.add(button.guild.id);
setVoiceTrack(trackAudio);
displayTrack(VideoId,info)
function setVoiceTrack(currentTrack){
const resource = client.voc.createAudioResource(currentTrack.stream, { 
    inputType : currentTrack.type,
    inlineVolume: true });
    resource.volume.setVolume(1.5);
    if(connection._state?.subscription){
    player.play(resource);
    const youtubePlayer = client.guildVoc.get(button.guild.id);
    client.guildVoc.delete(button.guild.id)
    client.guildVoc.set(button.guild.id,{
        queue: new Map().set(VideoId,info),
        currentTrack:VideoId,
        autoplay:youtubePlayer.autoplay
    })
}else{
    player.play(resource);
    connection.subscribe(player);
}
   
}
connection.on(client.voc.VoiceConnectionStatus.Ready, () => {
    client.channels.cache.get(button.channelId).send({ embeds:[EOR({desc:"Le bot est connecté"},button)]})
if(chan.type === "GUILD_STAGE_VOICE"){
    if(button.guild.me.permissions.has("ADMINISTRATOR") || button.member.voice.channel.manageable){
  button.guild.me.voice.setSuppressed(false);
  PlayTts();
  }else{
    connection.destroy();
    return client.channels.cache.get(button.channelId).send({ embeds:[EOR({title:"Global Voice Error",desc:"Le bot n'as pas les permissions suffisante pour parlé dans le salon de stage, donné lui la permission `Administrateur` ou bien ajouté le rôle du bot en tant que modérateur de conférence pour qu'il puisse parler", error: "yes"},button)]})
  }
}else {
    PlayTts();
}

function PlayTts(){
player.on("playing",() =>{
    client.timeoutsVoc.cmd.add(`play-${button.guild.id}`)
if(!client.guildVoc.has(button.guild.id)){
    client.guildVoc.set(button.guild.id,{
        queue: new Map().set(VideoId,info),
        currentTrack:VideoId,
        autoplay:false
    })
    button.channel.send({ embeds: [EOR({ desc: "La musique est en train de joué"},button)]})
}
})
player.on("buffering",()=>{
   
})
player.on('idle', async() => {
   button.channel.send({ embeds: [EOR({ desc: "La musique est terminé"},button)]})    
client.timeoutsVoc.cmd.delete(`play-${button.guild.id}`)
  player.stop();
  if(client.guildVoc.has(button.guild.id)){
    const youtubePlayer = client.guildVoc.get(button.guild.id);
    if(youtubePlayer.autoplay){
          const trackId = youtubePlayer.queue.get(youtubePlayer.currentTrack).related_videos[0].id
        const trackInfo = await ytdl.getInfo("https://www.youtube.com/watch?v="+trackId)
        const audioTrack = await getAudioFromId(trackId)
        client.guildVoc.delete(button.guild.id)
        client.guildVoc.set(button.guild.id,{
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
  if(client.timeoutsVoc.guild.has(button.guild.id)) client.timeoutsVoc.guild.delete(button.guild.id);
    if(client.timeoutsVoc.cmd.has(`tts-${button.guild.id}`)) client.timeoutsVoc.cmd.delete(`tts-${button.guild.id}`)
    if(client.timeoutsVoc.cmd.has(`play-${button.guild.id}`)) client.timeoutsVoc.cmd.delete(`play-${button.guild.id}`)
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
if(client.guildVoc.has(button.guild.id)){
    if(client.guildVoc.get(button.guild.id).autoplay){
        playedAuto =true
    }
}
let replyOptions ={
failIfNotExists: false,
  components:[{
    type: "ACTION_ROW",
    components:[{
      type:"BUTTON",
      customId: "stop-"+ userID,
      emoji: "⏹️",
      style: "DANGER"
    },{
      type:"BUTTON",
      customId: "play_pause-"+ userID,
      emoji: "⏸️",
      style: "SECONDARY"
    },
    {
      type:"BUTTON",
      customId: "autoplay-"+ userID,
      label: "Auto-play",
      style: playedAuto ? "SUCCESS" : "SECONDARY"
    },
    {
      type:"BUTTON",
      customId: "nowplaying-"+ userID,
      emoji: "⌛",
      style: "SECONDARY"
    }]
  },{
    type: "ACTION_ROW",
        components: [{
            type: "SELECT_MENU",
            customId: "play-"+ userID,
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
          value:track.videoDetails.lengthSeconds==="0" ? "Live" : client.functions.timetrade(Number(track.videoDetails.lengthSeconds*1000)),
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
}
button.reply(replyOptions).then(res => {}).catch(err =>{
    button.channel.send({
failIfNotExists: false,
  components:[{
    type: "ACTION_ROW",
    components:[{
      type:"BUTTON",
      customId: "stop-"+ userID,
      emoji: "⏹️",
      style: "DANGER"
    },{
      type:"BUTTON",
      customId: "play_pause-"+ userID,
      emoji: "⏸️",
      style: "SECONDARY"
    },
    {
      type:"BUTTON",
      customId: "autoplay-"+ userID,
      label: "Auto-play",
      style: playedAuto ? "SUCCESS" : "SECONDARY"
    },
    {
      type:"BUTTON",
      customId: "nowplaying-"+ userID,
      emoji: "⌛",
      style: "SECONDARY"
    }]
  },{
    type: "ACTION_ROW",
        components: [{
            type: "SELECT_MENU",
            customId: "play-"+ userID,
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
          value:track.videoDetails.lengthSeconds==="0" ? "Live" : client.functions.timetrade(Number(track.videoDetails.lengthSeconds*1000)),
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
})

}
       }else{
        client.api.interactions(button.id, button.token).callback.post({data: {
    type: 4,
    data:{
        flags: 64,
        content: "Vous n'avez pas le pouvoir d'effectuer cette action"
    }  
}})
       }    }
}

module.exports = new Select_voicename;