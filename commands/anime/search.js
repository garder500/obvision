'use strict';

const Command = require("../../structure/Command.js");
const fetch = require("node-fetch");

class searchAnime extends Command {
    constructor() {
        super({
            name: 'search',
            category: 'anime',
            description: 'Use for search some random anime on Neko-Sama',
            usage: 'search <anime name>',
            example: ['search Full metal alchemist']
            });
    }

    async run(client, message, args) {
        if(!args[1]) {
            message.reply({
    failIfNotExists: false,
  allowedMentions : {
        repliedUser: false
   },content : "> Faite search <anime name>" });
        } else {
            let anime = args.slice(1).join(" ");
           fetch("https://neko-sama.fr/animes-search-vostfr.json").then(res => res.json()).then(json =>{
            let search = json.filter(a => a.title.toLowerCase().includes(anime.toLowerCase()) || a.title_english.toLowerCase().includes(anime.toLowerCase()) || a.others.toLowerCase().includes(anime.toLowerCase()) )
            if(search.length < 1) return message.reply({    failIfNotExists: false, content:"> Aucun n'as été trouvé pour ce terme"})
                let list = [];
                let list2 = [];
            if(search.length <= 10){
                for(let i = 0;i<search.length;i++){
                    list.push({title: search[i].title, id: search[i].id })
                    list2.push(`**${search[i].id}** | __${search[i].title}__`)
                }
            }else{
                  for(let i = 0;i<10;i++){
                    list.push({title: search[i].title, id: search[i].id })
                    list2.push(`**${search[i].id}** | __${search[i].title}__`)
                }
            }
              const filter = (m) => m.author.id === message.author.id;

            message.reply({
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
                embeds:[{
                title: "Liste des animé trouvé",
                color: client.colors.default,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.displayAvatarURL(),
                    text: "Anime Searcher"
                },
                thumbnail: {
                    url: client.user.displayAvatarURL()
                },
                description: `Pour obtenir des information sur l'animé, entré l'**ID**:\n
                **ID**\u0627\u0627\u0627| __Nom animé__ \n${list2.join("\n")}`
            }]
            });

            (async()=>{
            let collected = await message.channel.awaitMessages({filter, max: 1, time: require("ms")("1h"), errors: ['time'] }).catch((e) => { console.log(e)});
            if (!collected || !collected.first()) return message.reply({ failIfNotExists: false,content: "> Vous n'avez pas entré d'ID refaite la commande"})
            const ID = Number(collected.first().content);
            if(isNaN(ID)) return message.reply({ failIfNotExists: false,content:"> ID de forme invalide refaite la commande`\n Forme désiré : `4855`"})
            let finalAnime = search.find(sID => sID.id === ID);
            if(!finalAnime) return message.reply({failIfNotExists: false,content: "> ID invalide refaite la commande"})
            message.reply({
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
                embeds:[{
                title: finalAnime.title,
                color: client.colors.default,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.displayAvatarURL(),
                    text: "Anime Searcher"
                },
                thumbnail: {
                    url: client.user.displayAvatarURL()
                },
                fields:[{
                    name: "Nom Anglais",
                    value: finalAnime.title_english? finalAnime.title_english: "Non défini",
                    inline:false
                },
                {
                    name: "Nom en Romanji",
                    value: finalAnime.title_romanji? finalAnime.title_romanji: "Non défini",
                    inline:false
                },
                {
                    name: "Autre noms",
                    value: finalAnime.others?finalAnime.others: "Non défini",
                    inline:false
                },
                {
                    name: "Type",
                    value: finalAnime.type?finalAnime.type: "Non défini",
                    inline:false
                },
                {
                    name: "Lien vers l'animé",
                    value: `[Click moi dessus pour voir l'animé](https://neko-sama.fr/${finalAnime.url})`,
                    inline:false
                },
                 {
                    name: "Genres",
                    value: finalAnime.genres.join("\n")?finalAnime.genres.join("\n"): "Non défini",
                    inline:false
                },
                {
                    name: "Score",
                    value: finalAnime.score + "/5",
                    inline:true
                },
                {
                    name: "Date de sortie",
                    value: finalAnime.start_date_year?finalAnime.start_date_year: "Non défini",
                    inline:true
                },
                {
                    name: "Nombre d'épisodes",
                    value: finalAnime.nb_eps?finalAnime.nb_eps: "Non défini",
                    inline:true
                }],
                image:{
                    url: finalAnime.url_image
                }
            }]
            })
        })();
           })
        }
    }
}

module.exports = new searchAnime;