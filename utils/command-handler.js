const fs = require('fs');
const path = require('path');

module.exports = async (message) => {
    try {
        if(!message.content.startsWith("!")){
            return false;
        }

        if(message.author.bot) {
            return false;
        }

        const [ cmd, ...args ] = message.content.split(" ");
        const commandName = cmd.substring(1, message.content.length);
        const commandPath = path.join(__dirname,`../commands/${commandName}.js`)

        const fileExists = fs.existsSync(commandPath);

        if (!fileExists) {
            console.log("invalid command", commandName, args)
            return false;
        }

        const commandFunction = require(commandPath)

        message.channel.send({embeds : [await commandFunction(commandName, args)]});

    } catch (error) {
        console.log(error);
    }
}