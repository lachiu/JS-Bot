module.exports = {
	name: 'role',
	description: 'Give or take the given role.',
	guildOnly: true,
	cooldown: 5,
	log: 'moderation',
	args: true,
	usage: '<user> <role>',
	execute(message, args) {
		message.channel.send('Role command is working!');
	},
};
