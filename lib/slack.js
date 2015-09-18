'use strict';

var request = require('request');

function sendDifference(diff, currentStateLength) {
	var msg = {
			text: '',
			attachments: []
		},
		balance = [],
		added = diff.added.join("\n"),
		removed = diff.removed.join("\n");

	if (diff.added.length) {
		balance.push('+' + diff.added.length);

		msg.attachments.push({
			color: 'good',
			fallback: 'Wikis that started using CC:' + "\n" + added,
			fields: [{
				title: 'Wikis that started using CC:',
				value: added
			}]
		});
	}

	if (diff.removed.length) {
		balance.push('-' + diff.removed.length);

		msg.attachments.push({
			color: 'danger',
			fallback: 'Wikis that stopped using CC:' + "\n" + removed,
			fields: [{
				title: 'Wikis that stopped using CC:',
				value: removed
			}]
		});
	}

	msg.text = balance.join(' ') + ', current number is ' + currentStateLength;

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
