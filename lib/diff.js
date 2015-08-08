'use strict';

/**
 * Copy pasted from http://stackoverflow.com/a/3476612/1050577
 *
 * @param o
 * @param n
 * @returns {*}
 */

function diff (o, n) {
	// deal with empty lists
	if (o == undefined) o = [];
	if (n == undefined) n = [];

	// sort both arrays (or this won't work)
	o.sort();
	n.sort();

	// don't compare if either list is empty
	if (o.length == 0 || n.length == 0) return {
		added: n,
		removed: o
	};

	// declare temporary variables
	var op = 0;
	var np = 0;
	var a = [];
	var r = [];

	// compare arrays and add to add or remove lists
	while (op < o.length && np < n.length) {
		if (o[op] < n[np]) {
			// push to diff?
			r.push(o[op]);
			op++;
		}
		else if (o[op] > n[np]) {
			// push to diff?
			a.push(n[np]);
			np++;
		}
		else {
			op++;
			np++;
		}
	}

	// add remaining items
	if (np < n.length)
		a = a.concat(n.slice(np, n.length));
	if (op < o.length)
		r = r.concat(o.slice(op, o.length));

	return {
		added: a,
		removed: r
	};
}

module.exports = diff;
