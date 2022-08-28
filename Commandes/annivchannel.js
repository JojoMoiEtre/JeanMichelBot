const Discord = require("discord.js")
const config = require("../config")
const mysql = require('mysql');

module.exports = {

    name: "annivchannel",
    description: "Permet de choisir le salon ou il y aura les annonces d'anniversaires *(La possibilité de le modifier arrive dans une prochaine mise à jour)*",
    detail: "",
    argument: " <IDchannel>",
    permission: "Administrateur",
    perms: Discord.PermissionFlagsBits.Administrator,
    category: "Administration",
    dm: false,

    async run (bot, message, args) {

        if(!args[0] || args.length > 1) return message.reply("Tu dois l'ID du salon !");
   
        let db = new mysql.createPool({
            host: "bmniqqpepppmdkmrvbrr-mysql.services.clever-cloud.com",
            port:"3306",
            database: "bmniqqpepppmdkmrvbrr",
            user: "uq0wcrb3hufidsi9",
            password: "G32BT7u20JvcM0oDC98e"
        });

        db.getConnection(function(err, connection) {
            
            if (err) throw err;
          
            connection.query(`CREATE TABLE IF NOT EXISTS \`${message.guild.id}\` (ID VARCHAR(255), DateJourMois VARCHAR(255), DateFull VARCHAR(255), Channell VARCHAR(255), PRIMARY KEY(ID, DateJourMois, DateFull, Channell))`, async (err) => {
                
                if(err) {
                    
                    connection.release()
                    connection.destroy()
                    return err;
                }
            })

            setTimeout(() => {
                connection.query(`SELECT * FROM \`${message.guild.id}\` WHERE ID = ${bot.user.id}`, async (err, req) => {

                    connection.release()

                    if(err) {

                        connection.destroy()
                        return message.reply("Une erreur de connection avec la BDD est survenue !");
                    }

                    if(req.length < 1) {

                        let sql = `INSERT INTO \`${message.guild.id}\` (ID, DateJourMois, DateFull, Channell) VALUES (${bot.user.id}, '14/11', '14/11/2020', ${args})`
                        connection.query(sql, function(err) {

                            if(err) {

                                connection.destroy()
                                return message.reply("Une erreur de connection avec la BDD est survenue !");
                            }
                            else {
                                
                                connection.destroy()
                                return message.reply("Salon d'annonces pour les anniversaires choisis !");
                            }
                        })
                    }
                    else {

                        connection.destroy()
                        return message.reply("Le salon d'annonces pour les anniversaires est deja validé ! *(La possibilité de le modifier arrive dans une prochaine mise à jour)*");
                    }
                })
            }, 1000);
        });  
    }
}