const Discord = require("discord.js")
const config = require("../config")
const fs = require ('fs')

module.exports = {

    name: "erreur",
    description: "erreur",
    detail: "",
    argument: "",
    permission: "erreur",
    category: "erreur",
    dm: true,

    async run(bot, message, args) {

        if(args.length > 0) return;

        message.delete()

        message.author.send({
            files: [
                `./ressources/dmChelou.txt`
            ]
        })
    }
}