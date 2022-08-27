const Discord = require("discord.js")
const fs = require('fs')
const config = require("../config.js")

module.exports = async (bot, message) => {

    if (message.author.bot) return;

    let blaguetest = false

    let blagueSuite= ["", " ", "!", " !", "?", " ?", "...", " ...", "-_-", " -_-"];
    let directoryName = "Blagues"
    let fileNames = fs.readdirSync(directoryName)

    fileNames.every((file) => {

        blague = file.substr(0, file.length - 3)

        for(i = 0; i < blagueSuite.length; i++) {

            if(message.content === blague + blagueSuite[i]) {

                blaguetest = true

                let command = require(`../Blagues/${blague}`)
                command.run(bot, message)

                return false;
            }
        }

        return true;
    });

    if(blaguetest) return

    if(config.blague123Soleil === true) config.blague123Soleil = false;
    
    if(!message.content.startsWith(config.prefix)) return;

    let messageArray = message.content.split(" ")
    let commandName = messageArray[0].slice(config.prefix.length)
    let args = messageArray.slice(1)

    if(message.content === config.prefix + "commandeTarLesFous") {

        let commandChelou = require(`../CommandesCaché/commandeTarLesFous`)
        commandChelou.run(bot, message, args)
        return;
    }

    fs.access(`./Commandes/${commandName}.js`, fs.constants.F_OK, (err) => {

        if (err) return message.reply(`Cette commande n'existe pas !\nUtilise \`${config.prefix}help\` si besoin `);

        else {
            let command = require(`../Commandes/${commandName}`)
            command.run(bot, message, args, command)
        }
    });
}