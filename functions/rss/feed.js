const fs = require('fs');
const got = require('got');
const parser = require('fast-xml-parser');
const Discord = require('discord.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = (new JSDOM('...')).window;

const { imagedir, rsschannel } = require('../../json/general/settings.json');
const { feeds } = require('../../json/rss/feeds.json');

module.exports = async function(bot) {
	let x, len, tmp_channel;
	for (x = 0, len = feeds.length; x < len; x++) {
		tmp_channel = feeds[x].channel || rsschannel;
		const channel = bot.channels.cache.get(tmp_channel);
		const buffer = await got(feeds[x].feed, {
			responseType: 'buffer',
			resolveBodyOnly: true,
			timeout: 5000,
			retry: 5,
		});
		const feed = await parser.parse(buffer.toString());
		let y;
		const items = feed.rss.channel.item;
		// Enclosure tags werken niet.
		// console.log(items);
		for (y = 0; y < items.length; y++) {
			if (feeds[x].latest < new Date(items[y].pubDate).getTime()) {
				const item = items[y];
				const embed = new Discord.MessageEmbed()
					.setColor(feeds[x].color)
					.setTitle(item.title)
					.setURL(item.link)
					.setAuthor(feeds[x].name, '', feeds[x].url)
					.setDescription(item.description.slice(9, item.description.length - 10))
					.attachFiles([`${ imagedir }${ feeds[x].logo }`])
					.setThumbnail(`attachment://${ feeds[x].logo }`)
					// .setImage(image)
					.setTimestamp()
					.setFooter(feeds[x].description);
				feeds[x].latest = new Date(item.pubDate).getTime().toString();
				const object = { 'feeds' : feeds };
				const data = JSON.stringify(object, null, 4);
				await fs.writeFile('./json/rss/feeds.json', data, (err) => {
					if (err) throw err;
				});
				await channel.send(embed);
			}
		}
	}

	/* for (const item of feed.rss.channel.item) {

	} */
};
