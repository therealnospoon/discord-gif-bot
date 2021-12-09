import express from "express";

import startDiscordBot from "./discord-bot.js";

const app = express();
app.get("/", { status: "healthy" });

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("🚀 App is ready and running on port", port));

startDiscordBot()