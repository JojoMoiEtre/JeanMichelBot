const Discord = require('discord.js')
const blague123Soleil = require('../config.js')

module.exports = {

    name: "troi",
    description: "Soleil",

    async run (bot, message) {

        if(blague123Soleil.blague123Soleil === true) {
            message.channel.send(`Soleil`);
            setTimeout(() => {
                message.channel.send(`🤡`);
            }, 1000);
            blague123Soleil.blague123Soleil = false;
        }
        else return;
    }
}