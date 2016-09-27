'use strict';

const test = require('tape')
const detector = require('../index')

const table = [ {rank: '2', type: 'C'}, {rank: '3', type: 'D'}, {rank: '5', type: 'T'}, {rank: 'K', type: 'T'} ];
const table2 = [ {rank: '2', type: 'C'}, {rank: '3', type: 'D'}, {rank: '5', type: 'T'}, {rank: '5', type: 'T'} ];

test('Test coppia', function (t) {

	let hand = [ {rank: 'J', type: 'C'}, {rank: 'K', type: 'C'}];

	let cards = table.concat(hand)

	t.ok(detector.hasCoppia(cards), 'Viene trovata la coppia')
	t.end()
})

test('Test tris', function (t) {

	let hand = [ {rank: 'K', type: 'C'}, {rank: 'K', type: 'C'}];

	let cards = table.concat(hand)

	t.ok(detector.hasTris(cards), 'Viene trovato il tris')
	t.end()
})

test('Test poker', function (t) {

	let hand = [ {rank: '5', type: 'C'}, {rank: '5', type: 'C'}];

	let cards = table2.concat(hand)

	t.ok(detector.hasPoker(cards), 'Viene trovato il poker')
	t.end()
})