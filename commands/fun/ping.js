module.exports = {
	name: 'ping',
	description: 'Pong!',
	guildOnly: true,
	cooldown: 5,
	log: 'normal',
	args: false,
	usage: '',
	enabled: true,
	execute(message) {
		message.channel.send('Pong.');
	},
};
