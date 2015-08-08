'use strict';

var jsonfile = require('jsonfile'),
	dataDir = 'data/';

function readFile(fileName) {
	return jsonfile.readFileSync(dataDir + fileName, {
		throws: false
	});
}

function saveFile(fileName, content) {
	jsonfile.writeFile(dataDir + fileName + '.json', content, function (err) {
		if (err) {
			console.error('There was error when writing to file', err);
		}
	});
}

module.exports = {
	readFile: readFile,
	saveFile: saveFile
};
