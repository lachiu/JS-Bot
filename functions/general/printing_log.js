const { botname } = require('../../json/general/settings.json');
const fs = require('fs');

module.exports = function(input, level) {
	const d = new Date();
	const day = d.getDate(), month = d.getMonth() + 1, year = d.getFullYear(), hours = d.getHours(), minutes = d.getMinutes(), seconds = d.getSeconds();
	const time = [day, month, year, hours, minutes, seconds];
	time.forEach(addZero);

	function addZero(value, index) {
		if (value < 10) {
			const n = '0' + value.toString();
			time[index] = n;
		}
	}

	const date_time = `${ time[0] }-${ time[1] }-${ time[2] } ${ time[3] }:${ time[4] }:${ time[5] }`;
	const prefix = `${ date_time } | ${ (level ? level : '').toUpperCase() } | ${ botname }: `;

	let punctuation;
	const dir = './logs';
	let file;
	if (level == 'normal') {
		punctuation = '.';
		file = '/log.txt';
	}
	else if (level == 'moderation') {
		punctuation = '.';
		file = '/mod-log.txt';
	}
	else if (level == 'danger') {
		punctuation = ' !!!';
		file = '/emergenncy-log.txt';
	}
	else {
		punctuation = ' ???';
		file = '/emergency-log.txt';
	}
	const sentence = prefix + input + punctuation;

	console.log(sentence);

	fs.writeFile(dir + file, sentence + '\n', { flag: 'a+' }, (err) => {
		if (err) throw err;
	});
	fs.writeFile(dir + '/console/daily-console.txt', sentence + '\n', { flag: 'a+' }, (err) => {
		if (err) throw err;
	});
};
