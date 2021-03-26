const printing_log = require('../../functions/general/printing_log.js');
const feed = require('../../functions/rss/feed.js');
const feed_nieuws = require('../../functions/rss/feed-nieuws.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(bot) {
		bot.user.setActivity('you.', { type: 'WATCHING' });
		// feed(bot);
		// setInterval(() => feed(bot), 600000);
		feed_nieuws(bot);
		printing_log('Ready', 'normal');
	},
};
