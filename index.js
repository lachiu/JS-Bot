// Require these modules
// const fs = require('fs');
const Discord = require('discord.js');
const dotenv = require('dotenv');
// loads the .env
dotenv.config();
const settings = require('./json/general/settings.json');
// toString()

function printing_log(input, level) {
	// Grabbing datetime
	const d = new Date();
	// 22-02-2021 04:51:28 | Griffier: Ik open het bestand stemmingen.json
	const day = d.getDate(), month = d.getMonth() + 1, year = d.getFullYear(), hours = d.getHours(), minutes = d.getMinutes(), seconds = d.getSeconds();
	const time = [day, month, year, hours, minutes, seconds];
	time.forEach(addZero);

	function addZero(value, index) {
		if (value < 10) {
			const n = '0' + value.toString();
			time[index] = n;
		}
	}

	let punctuation;
	if (level == 'normal') {
		punctuation = '.';
	}
	else if (level == 'danger') {
		punctuation = '!!!';
	}
	else {
		punctuation = '???';
	}

	const date_time = time[0] + '-' + time[1] + '-' + time[2] + ' ' + time[3] + ':' + time[4] + ':' + time[5];
	const bot_name = settings.botname;
	return console.log(date_time + ' | ' + bot_name + ': ' + input + punctuation);
}

// create a new Discord client
const bot = new Discord.Client();

// once the bot is loaded it does this
bot.once('ready', () => {
	printing_log('Ready', 'normal');
});

// the bot logs in now and starts doing it's thing
bot.login(process.env.TOKEN);
