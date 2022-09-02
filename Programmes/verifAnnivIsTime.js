const fs = require("fs")
const mysql = require('mysql');

let db = new mysql.createPool({
    host: "bmniqqpepppmdkmrvbrr-mysql.services.clever-cloud.com",
    port:"3306",
    database: "bmniqqpepppmdkmrvbrr",
    user: "uq0wcrb3hufidsi9",
    password: "G32BT7u20JvcM0oDC98e"
});

function dateDuJour() {
    const date = new Date();
    var jour = date.getDate();
    var mois = date.getMonth()+1;
    if (jour < 10) jour = '0'+jour;
    if (mois < 10) mois = '0'+mois;
    return (jour+"/"+(mois));
}

module.exports = async bot => {
    
    bot.on("ready", async () => {
    
        bot.guilds.cache.forEach((guild) => {
        
            setInterval(() => {
        
                const date = new Date();

                let dateJour = dateDuJour();
                let heure = date.getHours();
                let minute = date.getMinutes();
                
                console.log(guild.id)

                if(heure === 5) {
                    if(minute === 22) {
                        db.query(`SELECT * FROM \'815602597674352690\' WHERE DateJourMois = \'${dateJour}\'`, async (err, req) => {

                            if(err) return console.log("erreur");
                            if(req.length > 0) {

                                let command = require(`./annivIsTime`)
                                command.run(bot, req)
                            }
                        })
                    }
                }
            }, 60000)
        });
    })

    console.log(`   - Evènement verifAnnivIsTime.js chargé avec succès`)
}
