'use strict';

const test = require('tape')
const detector = require('../index')

test('Test sorting', function (t) {
 	
 	let hand = [
		{rank: '3', type: 'C'},
		{rank: 'A', type: 'Q'},
		{rank: '10', type: 'Q'},
		]

	let sorted = detector.sortbyRank(hand)
	t.equal('A', sorted[0].rank, 'Sorting OK')
	t.equal('10', sorted[1].rank, 'Ten is sorted correctly')

	t.end()
})