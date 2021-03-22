module.exports = {
	name: 'beep',
	description: 'Boop!',
	guildOnly: true,
	cooldown: 5,
	log: 'normal',
	args: false,
	usage: '',
	enabled: true,
	execute(message) {
		message.channel.send('Boop!');
	},
};
