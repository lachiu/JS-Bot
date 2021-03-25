const fs = require('fs');
const parser = require('feedparser');
const fetch = require('node-fetch');
const Discord = require('discord.js');

const { imagedir, rsschannel } = require('../../json/general/settings.json');
const { feeds } = require('../../json/rss/feeds.json');

module.exports = function(bot) {
	let x, len, tmp_channel;
	for (x = 0, len = feeds.length - 1; x < len; x++) {
		console.log(x);
		console.log(len);
		tmp_channel = feeds[x].channel || rsschannel;
		const channel = bot.channels.cache.get(tmp_channel);
		const feedparser = new parser();
		const req = fetch(feeds[x].feed);
		req.then(function(res) {
			if (res.status !== 200) {
				throw new Error('Bad status code');
			}
			else {
				// The response `body` -- res.body -- is a stream
				res.body.pipe(feedparser);
			}
		}, function(err) {
			// handle any request errors
			console.log(err);
		});

		feedparser.on('error', function(error) {
			// always handle errors
			console.log(error);
		});

		feedparser.on('readable', function() {
			// This is where the action is!
			const stream = this; // `this` is `feedparser`, which is a stream
			const meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
			let item;
			console.log(x);
			while (item = stream.read()) {
				console.log(x);
				if (feeds[x].latest < new Date(item.pubDate).getTime()) {
					const embed = new Discord.MessageEmbed()
						.setColor(feeds[x].color)
						.setTitle(item.title)
						.setURL(item.link)
						.setAuthor(feeds[x].name, '', feeds[x].url)
						.setDescription(item.description)
						.attachFiles([`${ imagedir }${ feeds[x].logo }`])
						.setThumbnail(`attachment://${ feeds[x].logo }`)
						.setImage(item.enclosures[0].url)
						.setTimestamp()
						.setFooter(feeds[x].description);
					feeds[x].latest = new Date(item.pubDate).getTime().toString();
					const object = { 'feeds' : feeds };
					const data = JSON.stringify(object, null, 4);
					fs.writeFile('./json/rss/feeds.json', data, (err) => {
						if (err) throw err;
					});
					channel.send(embed);
				}
			}
		});
	}
};
