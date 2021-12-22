const fetch = require("cross-fetch");
const Discord = require("discord.js");

module.exports = async (cmd, wordArr) => {
    const searchTerms = wordArr.join(" ");
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

        const giphyBranding = "https://boiling-fortress-52817.herokuapp.com/giphy.png"
        
        const embed = new Discord.MessageEmbed()
        .setTitle(giphy.searchTerm)
        .setImage(gifUrl)
        
        return embed
    } catch (error) {
        console.log(error)
    }
}