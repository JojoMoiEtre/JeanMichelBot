const Discord = require('discord.js')
const config = require('../config')

function dateDuJour() {
    const date = new Date();
    var jour = date.getDate();
    var mois = date.getMonth()+1;
    if (jour < 10) jour = '0'+jour;
    if (mois < 10) mois = '0'+mois;
    return (jour+"/"+(mois));
}

module.exports = {

    name: "annivistime",

    async run (bot, message) {

        let date = dateDuJour()
        let personne = "<@"+message[0].ID+">"

        if(message.length === 1) {

            if(personne === (`<@${config.botID}>`)) {
                personne = personne + " (ui c mwa :eyes:)"
            }

            let annonce_solo = [
                "Hey @everyone ! Aujourd'hui est un jour spécial ! Pourquoi ? Parce que c’est l’anniversaire de " + personne + " :partying_face: :tada: \n*(C’est le moment parfait pour lui dire que c’est déjà un fossile ^^)*",
                "Tiens tiens tiens... Mon petit doigt me dit qu’aujourd’hui est un jour important @everyone, mais j’ai beau y réfléchir je vois pas pourquoi :thinking:\n...\nAh si ! J’suis con ! C’est " + personne + " qui vient de vieillir",
                "Coucou @everyone :wave:\nC’est juste pour vous dire qu’on est le **" + date + "** et que comme par hasard le **" + date + "** " + personne + " prend 1 an ||*(C'est bien fait la vie quand même)*||\nDu coup voilà un parallélépipède rectangle de terre argileuse :bricks:\n*(C’est un cadeau original et ça peut toujours être utile)*"
            ];

            let index_solo = Math.floor(Math.random() * (annonce_solo.length))

            bot.channels.cache.get(config.channelAnniv).send(annonce_solo[index_solo])
        }

        if(message.length > 1) {

            for(var i = 1 ; i < message.length ; i++) {

                if(i === message.length-1) personne = personne + " et <@"+message[i].ID+">";

                else personne = personne + ", <@"+message[i].ID+">";
                
                if(personne === (`<@${config.botID}>`)) personne = personne + "Ui c mwa :eyes:"
            }

            let annonce_multi = [
                "Hey @everyone ! Aujourd'hui est un jour spécial ! Pourquoi ? Parce que c’est l’anniversaire de " + personne + " :partying_face: :tada: \n*(C’est le moment parfait pour leur dire que ce sont déjà des fossiles ^^)*",
                "Tiens tiens tiens... Mon petit doigt me dit qu’aujourd’hui est un jour important @everyone, mais j’ai beau y réfléchir je vois pas pourquoi :thinking:\n...\nAh si ! J’suis con ! C’est " + personne + ", ils ont encore vieilli ces bons gens",
                "Coucou @everyone :wave:\nC’est juste pour vous dire qu’on est le **" + date + "** et que comme par hasard le **" + date + "** " + personne + " prennent 1 an ||*(Ils cassent les couilles à être plusieur)*||\nDu coup voilà un parallélépipède rectangle de terre argileuse à vous partager :bricks:\n*(C’est un cadeau original et ça peut toujours être utile)*"
            ];

            let index_multi = Math.floor(Math.random() * (annonce_multi.length))

            bot.channels.cache.get(config.channelAnniv).send(annonce_multi[index_multi])
        }
    }
}