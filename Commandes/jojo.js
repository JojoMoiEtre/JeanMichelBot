const Discord = require("discord.js");
const config = require("../config")

module.exports = {

    name: "jojo",
    description: "Tout savoir sur mon superbe créateur",
    detail: "",
    argument: "",
    permission: "Aucune",
    category: "Tout savoir sur...",
    dm: false,

    async run(bot, message, args) {

        if(args.length > 0) return message.reply(`Une erreur est survenue ! \nUtilise \`${config.prefix}help\` si besoin `);

        let id = '321029072606068736';
        let user = bot.users.cache.get(id);

        if(!user) return message.reply("Une erreur est survenue !");

        let embed = new Discord.EmbedBuilder()
            .setColor('#1BD69A')
            .setTitle("Profil - " + user.username)
            .setDescription("Tout savoir sur ce ~~BG~~ déchet")
            .addFields([
                {
                    name: `Nom`,
                    value: user.username,
                    inline: true
                },
                {
                    name: `SOUS-nom`,
                    value: `Déchet vivant (même pas recyclable)`,
                    inline: true
                },
                {
                    name: `Description`,
                    value: `Il est l'intelligence et la beaugossitude incarné...\nNon MDR j’déconne ! T'as cru que j’allais complimenter ce chien de la casse ? Ce gars c’est le plus gros flemmard de tous les temps, il passe toutes ses putains de journées à se toucher les couilles devant son PC. En plus t’as vu sa tronche ? Impossible de pécho avec une gueule pareille !`,
                    inline: false
                }
            ])
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .setTimestamp();

        message.channel.send({embeds: [embed]});
    }
}
