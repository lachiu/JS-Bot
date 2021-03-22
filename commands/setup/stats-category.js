module.exports = {
	name: 'stats-category',
	description: 'Ping!',
	guildOnly: true,
	cooldown: 5,
	log: 'moderation',
	args: true,
	usage: '',
	enabled: true,
	execute(message, args) {
		message.channel.send('Pong.');
	},
};
