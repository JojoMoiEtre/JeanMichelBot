const Discord = require("discord.js")

module.exports = async bot => {

    bot.user.setActivity(`la plèbe (${config.prefix}help)`, {type: 3}) 
    
    console.log(`\n> ${bot.user.tag} est en ligne !`)
}