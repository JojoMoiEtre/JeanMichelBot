const fs = require("fs")

module.exports = async bot => {
    
    fs.readdirSync("./Blagues").filter(f => f.endsWith(".js")).forEach(async file => {
        
        let command = require(`../Blagues/${file}`)
        if(!command.name || typeof command.name !== "string") throw new TypeError(`La blague ${file.slice(0, file.length - 3)} n'a pas de nom !`)
        
        console.log(`   - Blague ${file} chargée avec succès`)
    })
}