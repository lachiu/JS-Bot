const fs = require('fs');
const Discord = require('discord.js');
const printing_log = require('./functions/general/printing_log.js');
const dotenv = require('dotenv');
dotenv.config();
const { dir, botname, language, prefix, qtypolls } = require('./json/general/settings.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const eventFolders = fs.readdirSync('./events');
for (const folder of eventFolders) {
	const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of eventFiles) {
		const event = require(`./events/${folder}/${file}`);
		if (event.once) {
			bot.once(event.name, (...args) => event.execute(...args, bot));
		}
		else {
			bot.on(event.name, (...args) => event.execute(...args, bot));
		}
	}
}
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		bot.commands.set(command.name, command);
	}
}

bot.login(process.env.TOKEN);
