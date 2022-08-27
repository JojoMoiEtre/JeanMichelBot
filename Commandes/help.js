const Discord = require("discord.js");
const config = require("../config")
const fs = require('fs')

module.exports = {

    name: "help",
    description: "Je te donne la liste des commandes disponibles ou toutes les infos sur une commande",
    detail: "",
    argument: " <commande>",
    permission: "Aucune",
    category: "Informations",
    dm: true,

    async run(bot, message, args) {

        if(args.length > 1) return message.reply(`Une erreur est survenue ! \nUtilise \`${config.prefix}help\` si besoin `);

        const command = message.user ? bot.commands.get(args._hosteidOptions.lenght !== 0 ? args._hosteidOptions[0].value : "") : bot.commands.get(args[0])

        if(args.length === 1 && !command) return message.reply(`Cette commande n'existe pas !\nUtilise \`${config.prefix}help\` si besoin `);

        if(!command) {

            const categories = [];
            const commandes = bot.commands;

            commandes.forEach((command) => {

                if(!categories.includes(command.category)) {

                    categories.push(command.category)
                }
            });

            let embed = new Discord.EmbedBuilder()
            .setColor("#1BD69A")
            .setTitle(this.category + " - " + this.name.charAt(0).toUpperCase() + this.name.slice(1))
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Voici la liste de toutes les commandes disponibles actuellement :\n*(Effectivement je n'en possède pas beaucoup... mais pour remédier à ce problème n'hésitez pas à ping <@321029072606068736> ~~Aka JojoLeDéchet~~ pour qu’il se bouge le cul)*`)
            .setTimestamp();

            categories.sort().forEach((cat, i) => {

                const tCommands = commandes.filter((cmd) => cmd.category === cat)

                embed.addFields([
                    {
                        name: cat,
                        value: tCommands.map((cmd) => "> `" + config.prefix + cmd.name + cmd.argument + "` ➔ " + cmd.description).join("\n"),
                        inline: false
                    }
                ])
            })

            message.reply({embeds: [embed]});
        }

        if(command) {

            let embed = new Discord.EmbedBuilder()
            .setColor("#1BD69A")
            .setTitle(this.category + " - " + command.name.charAt(0).toUpperCase() + command.name.slice(1))
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`**Nom :** ${command.name}\n**Description :** ${command.description}\n**Catégorie :** ${command.category}\n**Utilisation :** \`${config.prefix + command.name + command.argument}\` ${command.detail}`)
            .setTimestamp();

            message.reply({embeds: [embed]});
        }
    }
}