const Discord = require("discord.js");
const config = require("../config")

module.exports = {

    name: "roll",
    description: "Je choisis une valeur entre 0 et le nombre que tu as indiqué",
    detail: "",
    argument: " <nombre>",
    permission: "Aucune",
    category: "Utile",
    dm: true,

    async run(bot, message, args) {

        if(args != args * 1 || args.length > 1) return message.reply("Tu dois **inscrire un nombre** !\n\`Exemple : <roll 7\`");

        if(args < 1) return message.reply("Le nombre choisi doit être **strictement supérieur à 0** !\n\`Exemple : <roll 7\`");
        
        await message.reply(`Roll : \`${Math.floor(Math.random() * Math.floor(Number(args))) + 1}\``)
    }
}