const Discord = require("discord.js")
const config = require("../config")

module.exports = {

    name: "avatar",
    description: "Je t'envois ta photo de profil ou celle de l'utilisateur mentionné",
    detail: "",
    argument: " <@pseudo>",
    permission: "Aucune",
    category: "Utile",
    dm: false,

    async run (bot, message, args) {

        let member = message.mentions.users.first() || message.author

        if(member === message.author && args.length > 0) return message.reply(`Tu dois mentionner **une personne existante** pour obtenir son avatar...\n\`Exemple : <avatar @${bot.users.cache.get(`716339634296062002`).username}\``);

        let embed = new Discord.EmbedBuilder()
            .setTitle(`Avatar de ${member.tag}`)
            .setImage(member.displayAvatarURL({format: `png`, dynamic: true, size: 4096}))
            .setColor("#1BD69A")

        message.channel.send({embeds: [embed]});
    }
}