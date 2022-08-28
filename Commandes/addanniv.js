const Discord = require("discord.js")
const config = require("../config")
const mysql = require('mysql');

module.exports = {

    name: "addanniv",
    description: "Je note ta date de naissance pour pouvoir te rappeler à quel point tu es vieux le moment venu ^^",
    detail: "",
    argument: " <JJ/MM/AAAA>",
    permission: "Aucune",
    category: "Utile",
    dm: false,

    async run (bot, message, args) {

        if(!args[0] || args.length > 1) return message.reply("Tu dois inscrire ta date de naissance sous la forme : **JJ/MM/AAAA**\n\`Exemple : <addanniv 14/11/2020\`");

        let dateAnnivFull = args[0].split("")
        let dateAnniv = args[0].split("/")
        let date = new Date()       

        if(dateAnnivFull[2] !== "/" || dateAnnivFull[5] !== "/" || dateAnniv[0] > 31 || dateAnniv[0] < 1 || dateAnniv[1] > 12 || dateAnniv[1] < 1 || dateAnniv[2] < 1900 || dateAnniv[2] > date.getFullYear()) return message.reply("Tu dois inscrire ta date de naissance (valide c'est mieux) sous la forme : **JJ/MM/AAAA**\n\`Exemple : <addanniv 14/11/2020\`");

        let db = new mysql.createPool({
            host: "bmniqqpepppmdkmrvbrr-mysql.services.clever-cloud.com",
            port:"3306",
            database: "bmniqqpepppmdkmrvbrr",
            user: "uq0wcrb3hufidsi9",
            password: "G32BT7u20JvcM0oDC98e"
        });

        db.getConnection(function(err, connection) {
            
            if (err) throw err;

            setTimeout(() => {
                connection.query(`SELECT * FROM \`${message.guild.id}\` WHERE ID = ${message.author.id}`, async (err, req) => {

                    connection.release()

                    if(err) {

                        connection.destroy()
                        return message.reply("Le salon d’annonces n’a pas été indiqué !\n\`<annivchannel <IDchannel>` pour choisir le salon");
                    }

                    if(req.length < 1) {
            
                        connection.query(`SELECT * FROM \`${message.guild.id}\` WHERE ID = ${bot.user.id}`, async (err, req) => {

                            if(err) {

                                connection.destroy()
                                return err;
                            }

                            if(req.length > 0) {

                                let sql = `INSERT INTO \`${message.guild.id}\` (ID, DateJourMois, DateFull, Channell) VALUES (${message.author.id}, '${dateAnniv[0]}/${dateAnniv[1]}', '${dateAnniv[0]}/${dateAnniv[1]}/${dateAnniv[2]}', '${req[0].Channell}')`
                                    connection.query(sql, function(err) {
                            
                                    if(err) {
                                        
                                        connection.destroy()
                                        return message.reply("Une erreur de connection avec la BDD est survenue !");
                                    }

                                    else {

                                        connection.destroy()
                                        return message.reply("Ton anniversaire a bien été enregistré !");
                                    }
                                })
                            }
                        })

                        
                    }

                    else {

                        connection.destroy()
                        return message.reply("Tu as déjà enregistré ta date d’anniversaire !");
                    }
                })
            }, 1000);
        })
    }
}