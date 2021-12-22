const { Client } = require("discord.js");
const commandHandler = require("./utils/command-handler");

module.exports = () => {

if(!process.env.DISCORD_BOT_TOKEN || !process.env.GIPHY_TOKEN) {
    console.error("🚨 Couldn't find environment variable");
}

// Create a new client instance
const client = new Client({ intents : [ "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES" ] });


// Kick off services, start message listener
client.on("messageCreate", commandHandler);

// Login to Discord with your client's token
client.login(process.env.DISCORD_BOT_TOKEN);
}