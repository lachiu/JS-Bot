const fs = require('fs');
const got = require('got');
const parser = require('fast-xml-parser');
const Discord = require('discord.js');
const { rsschannel } = require('../../json/general/settings.json');
const { feeds } = require('../../json/rss/feeds.json');

module.exports = async function(bot) {
	let x, len;
	const channel = bot.channels.cache.get(rsschannel);
	for (x = 0, len = feeds.length; x < len; x++) {
		const buffer = await got(feeds[x].feed, {
			responseType: 'buffer',
			resolveBodyOnly: true,
			timeout: 5000,
			retry: 5,
		});
		const feed = await parser.parse(buffer.toString());
		let y;
		const items = feed.rss.channel.item;
		for (y = 0; y < items.length; y++) {
			if (feeds[x].latest < new Date(items[y].pubDate).getTime()) {
				const item = items[y];
				const embed = new Discord.MessageEmbed()
					.setColor(feeds[x].color)
					.setTitle(item.title)
					.setURL(item.link)
					.setAuthor(feeds[x].name, '', 'https://standaard.be')
					.setDescription(item.description)
				// .setThumbnail(item.enclosure.GetAttribute('url'))
				/* .addFields(
	      { name: 'Regular field title', value: 'Some value here' },
	      { name: '\u200B', value: '\u200B' },
	      { name: 'Inline field title', value: 'Some value here', inline: true },
	      { name: 'Inline field title', value: 'Some value here', inline: true },
	      ) */
				// .addField('Inline field title', 'Some value here', true)
				// .setImage(feeds[x].logo)
					.setTimestamp()
				// .setFooter(feeds[x].name, 'https://i.imgur.com/wSTFkRM.png');
					.setFooter(feeds[x].name);
				feeds[x].latest = new Date(item.pubDate).getTime().toString();
				const object = { 'feeds' : feeds };
				const data = JSON.stringify(object, null, 4);
				// console.log(object);
				// console.log(data);
				// console.log(object.feeds);
				await fs.writeFile('./json/rss/feeds.json', data, (err) => {
					if (err) throw err;
				});
				await channel.send(embed);
				// console.log(item.enclosure);
				// await channel.send(`Title: ${ item.title }, url: ${ item.link }`);
				// break;
			}
		}
	}

	/* for (const item of feed.rss.channel.item) {

	} */
};
