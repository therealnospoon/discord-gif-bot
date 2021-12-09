const fetch = require("node-fetch");
// Require the necessary discord.js classes
const { Client } = require("discord.js");
const Discord = require("discord.js");

module.exports = () => {

if(!process.env.DISCORD_BOT_TOKEN || !process.env.GIPHY_TOKEN) {
    console.error("🚨 Couldn't find environment variable");
}

// Create a new client instance
const client = new Client({ intents : [ "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES" ] });


// Kick off services, start message listener
client.on("messageCreate", (message) => {
    if(message.author.bot) {
        return false;
    }

    const commands = {
        "gif": async (msg) => {
            const searchTerms = msg.split(" ").slice(1, msg.length).join(" ");
            const giphy = {
                baseURL: "https://api.giphy.com/v1/gifs/translate",
                apiKey: process.env.GIPHY_TOKEN,
                tag: "",
                type: "",
                rating: "g",
                searchTerm: searchTerms
            };
            let giphyURL = encodeURI(
                giphy.baseURL +
                    giphy.type +
                    "?api_key=" +
                    giphy.apiKey +
                    "&tag=" +
                    giphy.tag +
                    "&rating=" +
                    giphy.rating +
                    "&s=" +
                    giphy.searchTerm
            );
        
            try {
                const response = await fetch(giphyURL)
                const gifResult = await response;
                const gifJSON = await gifResult.json();
                const gifUrl = await gifJSON.data.images.original.url;
                const embed = new Discord.MessageEmbed()
                .setTitle(giphy.searchTerm)
                .setTimestamp()
                .setImage(gifUrl)
                .setFooter("Powered by Giphy")

                message.channel.send({embeds : [embed]})
            } catch (error) {
                console.log(error)
                message.channel.send("Sorry, no gif found")
            }
        }
    }
    
    for(const key in commands) {
        if(message.content.startsWith(key)) {
            commands[key](message.content);
        }
    }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_BOT_TOKEN);
}