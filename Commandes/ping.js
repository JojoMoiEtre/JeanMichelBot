const Discord = require("discord.js")
const config = require("../config")

module.exports = {

    name: "ping",
    description: "Je te donne le temps qui s'écoule entre le moment où tu postes ton message et celui où je le reçois",
    detail: "",
    argument: "",
    permission: "Aucune",
    category: "Utile",
    dm: true,

    async run(bot, message, args) {

        if(args.length > 0) return message.reply(`Une erreur est survenue ! \nUtilise \`${config.prefix}help\` si besoin `);

        await message.reply(`Ping : \`${bot.ws.ping} ms\``)
    }
}