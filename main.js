const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadAnniv = require("./Programmes/verifAnnivIsTime")
const loadBlagues = require("./Loaders/loadBlagues")
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
const config = require("./config")

bot.commands = new Discord.Collection()

console.log(`\n> Chargement des blagues :`)
loadBlagues(bot)
console.log(`\n> Chargement des commandes :`)
loadCommands(bot)
console.log(`\n> Chargement des évènements :`)
loadEvents(bot)
loadAnniv(bot)

bot.login(process.env.TOKEN);