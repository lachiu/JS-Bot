module.exports = {
	name: 'beep',
	description: 'Boop!',
	guildOnly: true,
	cooldown: 5,
	log: 'normal',
	args: false,
	usage: '',
	execute(message) {
		message.channel.send('Boop!');
	},
};
