// Require these modules
const Discord = require('discord.js');
const dotenv = require('dotenv');

// loads the .env
dotenv.config();

// create a new Discord client
const bot = new Discord.Client();

// once the bot is loaded it does this
bot.once('ready', () => {
	console.log('Ready!');
});

// the bot logs in now and starts doing it's thing
bot.login(process.env.TOKEN);
