'use strict';

var request = require('request');

function sendDifference(diff) {
	var msg = {
		text: 'Here is update for Curated Content',
		attachments: []
	};

	if (diff.added.length) {
		msg.attachments.push({
			color: 'good',
			fallback: 'New wikis started using Curated Content',
			fields: [{
				title: 'Wikis that started using Curated Content',
				value: diff.added.join("\n")
			}]
		});
	}

	if (diff.removed.length) {
		msg.attachments.push({
			color: 'danger',
			fallback: 'Some wikis stopped using Curated Content',
			fields: [{
				title: 'Wikis that stopped using Curated Content',
				value: diff.removed.join("\n")
			}]
		});
	}

	sendMessage(msg);
}

function sendMessage(msg) {
	// Use for testing
	//msg.channel = '@igor';

	console.log('Sending message to Slack:', JSON.stringify(msg));

	request.post({
		url: process.env['SLACK_WEBHOOK_URL'],
		json: true,
		body: msg
	}, function (error, response, body) {
		if (error) {
			console.error('Error when trying to send the message to Slack', error);
		}
		console.log('Message sent to Slack which responded with: ', body);
	});
}

module.exports = {
	sendDifference: sendDifference
};
