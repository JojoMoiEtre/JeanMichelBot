const Discord = require('discord.js')
const blague123Soleil = require('../config.js')

module.exports = {

    name: "hein",
    description: "Deux",

    async run (bot, message) {

        if(Math.floor(Math.random() * Math.floor(3)) === 1) {
            blague123Soleil.blague123Soleil = true
            message.channel.send(`Deux`);
        }
    }
}