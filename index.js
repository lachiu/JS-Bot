const fs = require('fs');
const Discord = require('discord.js');
const printing_log = require('./functions/general/printing_log.js');
const dotenv = require('dotenv');
dotenv.config();
const { dir, botname, language, prefix, qtypolls } = require('./json/general/settings.json');

const bot = new Discord.Client();
const cooldowns = new Discord.Collection();
bot.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		bot.commands.set(command.name, command);
	}
}

bot.once('ready', () => {
	printing_log('Ready', 'normal');
});

bot.on('message', message => {
	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = bot.commands.get(commandName)
		|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	// Checks if the command is guildOnly and used in DM's
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	// Checks if the used command has a cooldown
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 5) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const tmptimeLeft = (expirationTime - now) / 1000;
			const timeLeft = tmptimeLeft.toFixed(1);
			let timeLeft_txt;

			if (timeLeft === 1) {
				timeLeft_txt = 'second';
			}
			else {
				timeLeft_txt = 'seconds';
			}

			return message.reply(`Please wait ${timeLeft} more ${timeLeft_txt} before reusing the \`${command.name}\` command.`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	// Checks if the used command needs and has args
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\`.`;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}


	printing_log(`${message.author.username} used the ${command.name} command`, 'normal');
});

bot.login(process.env.TOKEN);
