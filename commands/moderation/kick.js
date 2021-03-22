const printing_log = require('../../functions/general/printing_log.js');

module.exports = {
	name: 'kick',
	description: 'Kick the user from the server.',
	guildOnly: true,
	cooldown: 5,
	log: 'moderation',
	args: true,
	usage: '<user>',
	enabled: true,
	execute(message, args) {
		const taggedUser = message.mentions.users.first();

		if (!message.mentions.users.size) {
			return message.reply('You need to tag a user in order to kick them!');
		}

		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
		printing_log(`${ message.author.username } tried to kick ${ taggedUser.username }`, 'moderation');
	},
};
