const Discord = require('discord.js')
const blague123Soleil = require('../config.js')

module.exports = {

    name: "ui",
    description: "stiti",

    async run (bot, message) {

        if(Math.floor(Math.random() * Math.floor(3)) === 1) {
            blague123Soleil.blague123Soleil = false;
            message.channel.send(`Stiti`);
        }
    }
}