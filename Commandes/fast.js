const Discord = require("discord.js")
const config = require("../config")

function randomString(len, charSet) {

    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZaàbcçdeêëéèfghijklmnopqrstuùvwxyz0123456789&"#\'{([-|\_\\)]°+=}$\*?,.;/:!';

    let randomString = '';
    for (let i = 0; i < len; i++) {

        let randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1) + ' ';
    }
    return randomString;
}

function msToTime(s) {

    function pad(n, z) {

        z = z || 2;
        return ('00' + n).slice(-z);
    }

    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;

    return pad(secs) + '.' + pad(ms, 3);
}

module.exports = {

    name: "fast",
    description: "C'est un jeu où vous devez retaper la chaîne de caractères choisie par mes soins le plus rapidement possible",
    detail: "\n*` Niveau **1**` : 15 lettres minuscules"
            +"\n`• Niveau **2**` : 15 lettres minuscules ou majuscules"
            +"\n`• Niveau **3**` : 15 lettres minuscules (avec ou sans accent), majuscules ou caractères numériques"
            +"\n`• Niveau **4**` : 15 lettres minuscules (avec ou sans accent), majuscules, caractères numériques ou spéciaux"
            +"\n`• Niveau **5**` : 25 lettres minuscules (avec ou sans accent), majuscules, caractères numériques ou spéciaux"
            +"\n`• Niveau* **\***` : Si t'es vraiment chaud"
            +"\n`• Niveau* **\*\***` : Si t'es vraiment BEAUCOUP trop chaud",
    argument: " <niveau>",
    permission: "Aucune",
    category: "Jeux",
    dm: true,

    constructor() {

        this.fastSansEspace = "";
        this.inGame = false;
        this.time = 60000;
        this.urlGif;
    },

    async run (bot, message, niv) {

        if(niv.length > 1 || niv.length === 0) return message.reply(`Tu dois préciser le niveau de difficulté de la partie !\nUtilise \`${config.prefix}help fast\` si besoin `);

        let fast = 0;

        if (niv[0] === '1') {

            this.urlGif = 'https://c.tenor.com/epZXXAnYUakAAAAC/faceroll-keyboard.gif';
            fast = randomString(15, 'abcdefghijklmnopqrstuvwxyz');
        }

        else if (niv[0] === '2') { 

            this.urlGif = 'https://media1.tenor.com/images/9d8563eac0fa88227b20dc6bb66ee34b/tenor.gif?itemid=12753210';
            fast = randomString(15, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
        }

        else if (niv[0] === '3') {

            this.urlGif = 'https://media1.tenor.com/images/a48b14931c37e6f64fb8b1c2647ee09a/tenor.gif?itemid=17962887';
            fast = randomString(15, 'ABCDEFGHIJKLMNOPQRSTUVWXYZaàbcçdeêëéèfghijklmnopqrstuùvwxyz0123456789');
        }

        else if (niv[0] === '4') { 
            
            this.urlGif = 'https://www.welovebuzz.com/wp-content/uploads/2018/01/typing.gif';
            fast = randomString(15);
        }

        else if (niv[0] === '5') {

            this.urlGif = 'https://c.tenor.com/gpXma8Yd4UEAAAAd/kl7-typing.gif';
            fast = randomString(25);
        }

        else if (niv[0] === '*') {

            this.urlGif = 'https://media1.tenor.com/images/841aeb9f113999616d097b414c539dfd/tenor.gif?itemid=5368357';
            fast = randomString(45);
        }

        else if (niv[0] === '**') {

            this.urlGif = 'https://i.pinimg.com/originals/40/f4/a5/40f4a53b243411e246d7af7e24160e51.gif';
            fast = randomString(60);
        }

        else return message.reply("Niveau de difficulté inexistant !\n" + this.detail);

        if(this.inGame) return message.reply("Une partie est déjà en cours !");

        this.inGame = true;

        let embed = new Discord.EmbedBuilder()
            .setColor('#1BD69A')
            .setTitle("Fast")
            .addFields([
                {
                    name: `Chaine à recopier`,
                    value: `${fast}\n\n(Les espaces ne sont pas à recopier, ils sont juste là pour éviter le copier-coller)`,
                    inline: false
                }
            ])
            .setImage(this.urlGif)
            .setTimestamp();

        let hrTime = process.hrtime();
        this.time = hrTime[0] * 1000 + hrTime[1] / 1000000;

        this.fastSansEspace = fast.toString().replace(/ /g,"")

        message.channel.send({embeds: [embed]});

        const msg_filter = (m) => m.content === this.fastSansEspace;
        message.channel.awaitMessages({ filter: msg_filter, max: 1, time: 60000, errors: ['time'] })
            .then((collected) => {

                let hrTime = process.hrtime();
                let mili1 = hrTime[0] * 1000 + hrTime[1] / 1000000;
                this.time = mili1 - this.time;

                message.reply(`Bien joué ${collected.first().author}, tu as réussi en ${msToTime(this.time)} secondes ! :tada:`);

                this.inGame = false;
                return;
            })
            .catch(collected => {

                message.reply('Temps écoulé !');

                this.inGame = false;
                return;
            });
    }
}