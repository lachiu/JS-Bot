module.exports = {
	name: 'purge',
	aliases: ['prune', 'delmsg'],
	description: 'Removes <x> messages.',
	guildOnly: true,
	cooldown: 5,
	log: 'moderation',
	args: true,
	usage: '<user>',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('That doesn\'t seem to be a valid number!');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('You need to input a number between 1 and 99.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('There was an error trying to remove the messages in this channel.');
		});
	},
};
