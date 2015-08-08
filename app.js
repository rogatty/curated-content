'use strict';

var jsonfile = require('jsonfile'),
	request = require('request'),
	diff = require('./lib/diff'),
	apiUrl = 'http://community.wikia.com/wikia.php?controller=CuratedContent&method=getCuratedContentQuality',
	dataDir = 'data/',
	saveFile = function (fileName, content) {
		jsonfile.writeFile(dataDir + fileName + '.json', content, function (err) {
			if (err) {
				console.error('There was error when writing to file', err);
			}
		});
	};

try {
	//require('./setEnv')();
} catch (e) {}

request(apiUrl, function (error, response, body) {
	var curatedContentQuality,
		curatedContentQualityPerWiki,
		currentState,
		previousState,
		difference,
		now = new Date(),
		nowString = '' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();

	if (!error && response.statusCode == 200) {
		previousState = jsonfile.readFileSync(dataDir + 'current.json', {
			throws: false
		});

		curatedContentQuality = JSON.parse(body);
		curatedContentQualityPerWiki = curatedContentQuality.curatedContentQualityPerWiki;

		if (curatedContentQualityPerWiki) {
			currentState = Object.keys(curatedContentQualityPerWiki);
		}

		if (previousState && currentState) {
			difference = diff(previousState, currentState);
			if (difference.added.length || difference.removed.length) {
				saveFile(nowString, difference);
			}
		}

		if (currentState) {
			saveFile('current', currentState);
		}
	} else {
		console.error('Error when trying to connect to ' + apiUrl, error, response);
	}
});


