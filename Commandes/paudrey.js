const Discord = require("discord.js");
const config = require("../config")

module.exports = {

    name: "paudrey",
    description: "Tout savoir sur notre magnifique Paudrey \*(si présent sur le serveur)\*",
    detail: "",
    argument: "",
    permission: "Aucune",
    category: "Tout savoir sur...",
    dm: false,

    async run(bot, message, args) {

        if(args.length > 0) return message.reply(`Une erreur est survenue ! \nUtilise \`${config.prefix}help\` si besoin `);

        let id = '366298754866872331';
        let user = bot.users.cache.get(id);

        if(!user) return message.reply("L’utilisateur concerné n'est pas sur ce serveur !");

        let embed = new Discord.EmbedBuilder()
            .setColor('#1BD69A')
            .setTitle("Profil - " + user.username)
            .setDescription("Tout savoir sur notre magnifique Paudrey")
            .addFields([
                {
                    name: `Nom`,
                    value: user.username,
                    inline: true
                },
                {
                    name: `SOUS-nom`,
                    value: `Paudrey`,
                    inline: true
                },
                {
                    name: `Description`,
                    value: `Paudrey est le dictateur de ce serveur de merde. Pourquoi je dis ça ? Parce que monsieur abuse de ses pouvoirs (il mute les gens sans aucune raison juste pour faire chier son monde). Bon après je dit “dictateur” mais en réalité il se fait bully h24 par tout le monde…\nIl a deux objectifs dans la vie : casser les couilles et trouver la motivation (qu’il cherche depuis plusieurs années maintenant)`,
                    inline: false
                }
            ])
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .setTimestamp();

        message.channel.send({embeds: [embed]});
    }
}