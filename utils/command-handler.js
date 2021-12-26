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

        //Invalid command path handler
        if (!fileExists) {
            const commandFiles =  await fs.promises.readdir(path.join(__dirname, "../commands/"));
            const commandList = commandFiles.map(fileName => "• !" + fileName.replace('.js', ''))
            message.reply(`Oops! INVALID COMMAND: !${commandName} \n------------------\n Available list of commands are:\n ${commandList}`)
            commandListhelper()
            return false;
        }

        const commandFunction = require(commandPath)

        commandFunction(message, args);

    } catch (error) {
        console.log(error);
    }
}