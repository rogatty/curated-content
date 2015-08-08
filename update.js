'use strict';

var request = require('request'),
	diff = require('./lib/diff'),
	file = require('./lib/file'),
	slack = require('./lib/slack'),
	apiUrl = 'http://community.wikia.com/wikia.php?controller=CuratedContent&method=getWikisWithCuratedContent';


try {
	require('./setEnv')();
} catch (e) {
	// You still have a chance to succeed
}

if (!process.env['SLACK_WEBHOOK_URL']) {
	throw 'You know nothing';
}

request(apiUrl, function (error, response, body) {
	var jsonResponse,
		idsList,
		id,
		currentState = [],
		previousState,
		difference,
		now = new Date(),
		nowString = '' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();

	if (!error && response.statusCode == 200) {
		previousState = file.readFile('current.json');

		jsonResponse = JSON.parse(body) || {};
		idsList = jsonResponse.ids_list || {};

		for (id in idsList) {
			if (idsList.hasOwnProperty(id)) {
				currentState.push(idsList[id].u);
			}
		}

		if (previousState && currentState) {
			difference = diff(previousState, currentState);
			if (difference.added.length || difference.removed.length) {
				file.saveFile(nowString, difference);
				slack.sendDifference(difference);
			} else {
				console.log('Nothing new');
			}
		}

		if (currentState.length) {
			file.saveFile('current', currentState);
		} else {
			console.error('No current state');
		}
	} else {
		console.error('Error when trying to connect to ' + apiUrl, error, response);
	}
});


