const printing_log = require('../../functions/general/printing_log.js');
// const { feeds } = require('../../json/rss/feeds.json');
const feed = require('../../functions/rss/feed.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(bot) {
		bot.user.setActivity('you.', { type: 'WATCHING' });
		// setInterval(feed(bot), 5000);
		feed(bot);
		printing_log('Ready', 'normal');
	},
};
