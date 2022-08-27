const Discord = require("discord.js")
const config = require("../config")

module.exports = async bot => {

    bot.user.setActivity(`la plèbe (${config.prefix}help)`, {type: 3}) 
    
    console.log(`\n> ${bot.user.tag} est en ligne !`)
}