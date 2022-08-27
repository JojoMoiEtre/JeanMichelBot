const Discord = require("discord.js");
const config = require("../config")

module.exports = {

    name: "bot",
    description: "Tout savoir sur le bot génial que je suis",
    detail: "",
    argument: "",
    permission: "Aucune",
    category: "Tout savoir sur...",
    dm: true,

    async run(bot, message, args) {

        if(args.length > 0) return message.reply(`Une erreur est survenue ! \nUtilise \`${config.prefix}help\` si besoin `);

        let id = config.botID;
        let user = bot.users.cache.get(id);

        if(!user) return message.reply("L’utilisateur concerné n'est pas sur ce serveur !");

        let embed = new Discord.EmbedBuilder()
            .setColor("#1BD69A")
            .setTitle("Profil - " + user.username) 
            .setDescription("Tout savoir sur le bot génial que je suis")
            .addFields([
                {
                    name: `Nom`,
                    value: user.username,
                    inline: true
                },
                {
                    name: `Surnom`,
                    value: `L̪̋e͙͚̬͓ ̪͛ͦͮ̂m͔̜̦̐͆ͫe̻̤̘̞̦ͧͬ̈́i̱̖ͯͬ̽͆̔̉̈́l̰͇̺̩̐̔͂ͨͩl̟̦̖͔̩̒̈́̏̐ͩè̞̥̬͚̰ͤ͗̈ͪu̥̺̼͍̞ͫ̂ͩ̓ͣr̻̭̱̙̞͇ͦ̓̐̈́ ̣̳̗̏̓̽̉͂ͅͅd͍͓̓ͪͯ̓̍̏̆̂e̖̲͔͕̍̃ͤ̋ͪṣ̘̦ͪ͌̏͋̑ ̪̰̹͗̔̇̚b͉̯ͬͧ̽o͈̩ͫ̚t̏̄s̘`,
                    inline: true
                },
                {
                    name: `Description`,
                    value: `01001001 01101110 01110100 11101001 01110010 01100101 01110011 01110011 01100101 01111010 00101101 01110110 01101111 01110101 01110011 00100000 11100000 00100000 01101101 01101111 01101001 M'dgruh ohv GP`,
                    inline: false
                }
            ])
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .setTimestamp();

        message.channel.send({embeds: [embed]});
    }
}